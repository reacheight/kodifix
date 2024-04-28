const esper = require('esper.js')
esper.plugin('lang-python')

const express = require('express')
const ws = require('ws')

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

const levels = {
  [1]: {
    height: 2,
    width: 4,
    hero: { x: 0, y: 0 },
    finish: { x: 1, y: 3 },
    gems: [
      { x: 0, y: 2 }
    ]
  },
  [2]: {
    height: 1,
    width: 10,
    hero: { x: 0, y: 0 },
    finish: { x: 0, y: 9 },
    linesGoal: 2
  },
  [3]: {
    height: 10,
    width: 10,
    hero: { x: 3, y: 0 },
    finish: { x: 7, y: 9 },
    gems: [
      { x: 1, y: 4 },
      { x: 2, y: 6 },
      { x: 8, y: 3 }
    ],
    walls: [
      { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
      { x: 7, y: 4 }, { x: 8, y: 4 }
    ],
    enemies: [ { x: 9, y: 5, alive: true }]
  },
  [4]: {
    height: 15,
    width: 7,
    hero: { x: 12, y: 6 },
    finish: { x: 1, y: 2 },
    gems: [ { x: 5, y: 3 } ],
    linesGoal: 10,
  },
}

const calculateCodeLines = (userCode) => userCode
  .split(/\r\n|\r|\n/)
  .filter(s => !s.startsWith('#'))
  .filter(s => /\S/.test(s))
  .length

wsServer.on('connection', ws => {
  console.log('Connection opened')

  ws.on('message', data => {
    var message = JSON.parse(data)

    if (message.event === 'run') {
      const eventsTimeDiffMS = 150;
      var currentTimeout = 0;

      let engine = esper({
        language: 'python'
      });


      const level = structuredClone(levels[message.levelId])
      var currentHeroPosition = structuredClone(level.hero)
      var gemsCollected = 0

      let heroRanInWall = false
      let heroRanInEnemy = false
  
      const updateHeroPos = (newHeroPosition) => {
        currentHeroPosition = structuredClone(newHeroPosition)

        if (newHeroPosition.x >= level.height || newHeroPosition.y >= level.width || newHeroPosition.x < 0 || newHeroPosition.y < 0) {
          heroRanInWall = true
          return
        }

        if (level.walls && level.walls.some(w => w.x === newHeroPosition.x && w.y === newHeroPosition.y)) {
          heroRanInWall = true
          return
        }

        if (level.enemies && level.enemies.some(enemy => enemy.alive && enemy.x === newHeroPosition.x && enemy.y === newHeroPosition.y)) {
          heroRanInEnemy = true
          return
        }

        var collectedGem = null

        if (level.gems)
          level.gems.forEach((gem, i) => {
            if (gem.x === newHeroPosition.x && gem.y === newHeroPosition.y && !gem.taken) {
              level.gems[i].taken = true
              collectedGem = gem
              gemsCollected += 1
            }
          })

        setTimeout(() => {
          ws.send(JSON.stringify({
            event: 'updateHero',
            hero: newHeroPosition
          }))

          if (collectedGem)
            ws.send(JSON.stringify({
              event: 'gemCollected'
            }))
        }, currentTimeout)
        currentTimeout += eventsTimeDiffMS
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

      const runFireball = path => {
        for (const point of path) {
          if (point.x >= level.height || point.x < 0 || point.y >= level.width || point.y < 0)
            break

          if (level.walls && level.walls.some(wall => wall.x === point.x && wall.y === point.y))
            break

          setTimeout(() => createFireball(point), currentTimeout)
          currentTimeout += eventsTimeDiffMS
          setTimeout(() => clearFireball(point), currentTimeout)
          if (level.gems && level.gems.some(gem => !gem.taken && gem.x === point.x && gem.y === point.y))
            setTimeout(() => showGem(point), currentTimeout)

          if (level.enemies) {
            let hitEnemy = false
            level.enemies.forEach((enemy, i) => {
              if (enemy.x === point.x && enemy.y === point.y && enemy.alive) {
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
        moveUp: function () {
          var newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.x -= 1
          updateHeroPos(newHeroPos)

          objectMethodCalled('moveUp')
        },
  
        moveDown: function () {
          var newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.x += 1
          updateHeroPos(newHeroPos)
          
          objectMethodCalled('moveDown')
        },
  
        moveRight: function () {
          var newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.y += 1
          updateHeroPos(newHeroPos)
  
          objectMethodCalled('moveRight')
        },
  
        moveLeft: function () {
          var newHeroPos = structuredClone(currentHeroPosition)
          newHeroPos.y -= 1
          updateHeroPos(newHeroPos)
  
          objectMethodCalled('moveLeft')
        },

        shootUp: function () {
          let fireballPath = [{x: currentHeroPosition.x - 1, y: currentHeroPosition.y}, {x: currentHeroPosition.x - 2, y: currentHeroPosition.y}, {x: currentHeroPosition.x - 3, y: currentHeroPosition.y}]
          runFireball(fireballPath)
          objectMethodCalled('shootUp')
        },

        shootDown: function () {
          let fireballPath = [{x: currentHeroPosition.x + 1, y: currentHeroPosition.y}, {x: currentHeroPosition.x + 2, y: currentHeroPosition.y}, {x: currentHeroPosition.x + 3, y: currentHeroPosition.y}]
          runFireball(fireballPath)
          objectMethodCalled('shootDown')
        },

        shootRight: function () {
          let fireballPath = [{x: currentHeroPosition.x, y: currentHeroPosition.y + 1}, {x: currentHeroPosition.x, y: currentHeroPosition.y + 2}, {x: currentHeroPosition.x, y: currentHeroPosition.y + 3}]
          runFireball(fireballPath)
          objectMethodCalled('shootRight')
        },

        shootLeft: function () {
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
        hasFinished: currentHeroPosition.x === level.finish.x && currentHeroPosition.y === level.finish.y,
        allGemsCollected: !level.gems || gemsCollected === level.gems.length,
        numberOfLinesSatisfy: !level.linesGoal || calculateCodeLines(message.code) <= level.linesGoal,
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