const esper = require('esper.js')
esper.plugin('lang-python')

const express = require('express')
const ws = require('ws')

const utils = require('./utils.js')

const port = 9000
const app = express()
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const server = require('http').createServer(app)
const wsServer = new ws.Server({ server })

const levels = require('./levels.js')

wsServer.on('connection', ws => {
  console.log('Connection opened')

  ws.on('message', data => {
    let message = JSON.parse(data)

    if (message.event === 'run') {
      const eventsTimeDiffMS = 150;
      let currentTimeout = 0;

      let engine = esper({
        language: 'python'
      });


      const level = structuredClone(levels[message.levelId])
      let currentHeroPosition = structuredClone(level.hero)
      let gemsCollected = 0

      let heroRanInWall = false
      let heroRanInEnemy = false
  
      const updateHeroPos = (newHeroPosition) => {
        while (!utils.arePointsEqual(newHeroPosition, currentHeroPosition)) {
          currentHeroPosition.x += Math.sign(newHeroPosition.x - currentHeroPosition.x)
          currentHeroPosition.y += Math.sign(newHeroPosition.y - currentHeroPosition.y)

          if (currentHeroPosition.x >= level.height || currentHeroPosition.y >= level.width || currentHeroPosition.x < 0 || currentHeroPosition.y < 0) {
            heroRanInWall = true
            return
          }
  
          if (level.walls && level.walls.some(wall => utils.arePointsEqual(wall, currentHeroPosition))) {
            heroRanInWall = true
            return
          }
  
          if (level.enemies && level.enemies.some(enemy => enemy.alive && utils.arePointsEqual(enemy, currentHeroPosition))) {
            heroRanInEnemy = true
            return
          }
  
          let collectedGem = null
  
          if (level.gems)
            level.gems.forEach((gem, i) => {
              if (utils.arePointsEqual(gem, currentHeroPosition) && !gem.taken) {
                level.gems[i].taken = true
                collectedGem = gem
                gemsCollected += 1
              }
            })
  
          let closureCurrentHeroPosition = structuredClone(currentHeroPosition)
          setTimeout(() => {
            ws.send(JSON.stringify({
              event: 'updateHero',
              hero: closureCurrentHeroPosition
            }))
  
            if (collectedGem)
              ws.send(JSON.stringify({
                event: 'gemCollected'
              }))
          }, currentTimeout)
          currentTimeout += eventsTimeDiffMS
        }
      }

      const createFireball = point => {
        ws.send(JSON.stringify({
          event: 'createFireball',
          fireball: point
        }))
      }

      const clearFireball = point => {
        ws.send(JSON.stringify({
          event: 'clearFireball',
          fireball: point
        }))
      }

      const showGem = point => {
        ws.send(JSON.stringify({
          event: 'showGem',
          gem: point
        }))
      }

      const runFireball = fireballPath => {
        for (const currentFireballPoint of fireballPath) {
          if (currentFireballPoint.x >= level.height || currentFireballPoint.x < 0 || currentFireballPoint.y >= level.width || currentFireballPoint.y < 0)
            break

          if (level.walls && level.walls.some(wall => utils.arePointsEqual(wall, currentFireballPoint)))
            break

          setTimeout(() => createFireball(currentFireballPoint), currentTimeout)
          currentTimeout += eventsTimeDiffMS
          setTimeout(() => clearFireball(currentFireballPoint), currentTimeout)
          if (level.gems && level.gems.some(gem => !gem.taken && utils.arePointsEqual(gem, currentFireballPoint)))
            setTimeout(() => showGem(currentFireballPoint), currentTimeout)

          if (level.enemies) {
            let hitEnemy = false
            level.enemies.forEach((enemy, i) => {
              if (utils.arePointsEqual(enemy, currentFireballPoint) && enemy.alive) {
                level.enemies[i].alive = false
                hitEnemy = true
                return
              }
            })

            if (hitEnemy)
              break
          }
        }
      }
  
      const objectMethodCalled = (methodName) => {
        let callExpression = engine.evaluator.lastASTNodeProcessed.parent.parent
        let start = callExpression.loc.start
        let end = callExpression.loc.end
        console.log(`${methodName} called. Start: line ${start.line}, col ${start.column}; End: line ${end.line}, col ${end.column}.`)
      }
  
      const hero = {
        moveUp(steps = 1) {
          let newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.x -= steps
          updateHeroPos(newHeroPos)

          objectMethodCalled('moveUp')
        },
  
        moveDown(steps = 1) {
          let newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.x += steps
          updateHeroPos(newHeroPos)
          
          objectMethodCalled('moveDown')
        },
  
        moveRight(steps = 1) {
          let newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.y += steps
          updateHeroPos(newHeroPos)
  
          objectMethodCalled('moveRight')
        },
  
        moveLeft(steps = 1) {
          let newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.y -= steps
          updateHeroPos(newHeroPos)
  
          objectMethodCalled('moveLeft')
        },

        shootUp() {
          let fireballPath = [{x: currentHeroPosition.x - 1, y: currentHeroPosition.y}, {x: currentHeroPosition.x - 2, y: currentHeroPosition.y}, {x: currentHeroPosition.x - 3, y: currentHeroPosition.y}]
          runFireball(fireballPath)
          objectMethodCalled('shootUp')
        },

        shootDown() {
          let fireballPath = [{x: currentHeroPosition.x + 1, y: currentHeroPosition.y}, {x: currentHeroPosition.x + 2, y: currentHeroPosition.y}, {x: currentHeroPosition.x + 3, y: currentHeroPosition.y}]
          runFireball(fireballPath)
          objectMethodCalled('shootDown')
        },

        shootRight() {
          let fireballPath = [{x: currentHeroPosition.x, y: currentHeroPosition.y + 1}, {x: currentHeroPosition.x, y: currentHeroPosition.y + 2}, {x: currentHeroPosition.x, y: currentHeroPosition.y + 3}]
          runFireball(fireballPath)
          objectMethodCalled('shootRight')
        },

        shootLeft() {
          let fireballPath = [{x: currentHeroPosition.x, y: currentHeroPosition.y - 1}, {x: currentHeroPosition.x, y: currentHeroPosition.y - 2}, {x: currentHeroPosition.x, y: currentHeroPosition.y - 3}]
          runFireball(fireballPath)
          objectMethodCalled('shootLeft')
        },
      };

      engine.addGlobal('hero', hero);
      engine.load(message.code);
  
      let steps = 0;
      let value = engine.evloop.next();
      while (!value.done && !heroRanInWall && !heroRanInEnemy) {
        value = engine.evloop.next();
        if ( value.value && value.value.then ) throw new Error('Can\'t deal with futures when running in sync mode');
        if ( ++steps > engine.options.executionLimit ) throw new Error('Execution Limit Reached');
      }

      let endEvent = {
        event: 'end',
        hasFinished: utils.arePointsEqual(level.finish, currentHeroPosition),
        allGemsCollected: !level.gems || gemsCollected === level.gems.length,
        numberOfLinesSatisfy: !level.linesGoal || utils.calculateCodeLines(message.code) <= level.linesGoal,
        heroRanInWall,
        heroRanInEnemy
      }
      setTimeout(() => ws.send(JSON.stringify(endEvent)), currentTimeout)
    }
  });
});

app.get('/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(levels[req.params.id]))
})

server.listen(port, () => console.log(`Server started on ${port}`))