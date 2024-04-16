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
    height: 10,
    width: 10,
    hero: { x: 3, y: 0 },
    finish: { x: 7, y: 9 },
    gems: [
      { x: 1, y: 4 },
      { x: 2, y: 6 },
      { x: 8, y: 3 }
    ]
  },
}

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
  
      const updateHeroPos = (newHeroPosition) => {
        currentHeroPosition = structuredClone(newHeroPosition)
        var collectedGem = null

        level.gems.forEach((gem, i) => {
          if (gem.x === newHeroPosition.x && gem.y === newHeroPosition.y && !gem.taken) {
            level.gems[i].taken = true
            collectedGem = gem
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
  
      const objectMethodCalled = (methodName) => {
        let callExpression = engine.evaluator.lastASTNodeProcessed.parent.parent
        let start = callExpression.loc.start
        let end = callExpression.loc.end
        console.log(`${methodName} called. Start: line ${start.line}, col ${start.column}; End: line ${end.line}, col ${end.column}.`)
      }
  
      const hero = {
        moveUp: function () {
          var new_hero_pos = structuredClone(currentHeroPosition)
          new_hero_pos.x -= 1
          updateHeroPos(new_hero_pos)

          objectMethodCalled('moveUp')
        },
  
        moveDown: function () {
          var new_hero_pos = structuredClone(currentHeroPosition)
          new_hero_pos.x += 1
          updateHeroPos(new_hero_pos)
          
          objectMethodCalled('moveDown')
        },
  
        moveRight: function () {
          var new_hero_pos = structuredClone(currentHeroPosition)
          new_hero_pos.y += 1
          updateHeroPos(new_hero_pos)
  
          objectMethodCalled('moveRight')
        },
  
        moveLeft: function () {
          var new_hero_pos = structuredClone(currentHeroPosition)
          new_hero_pos.y -= 1
          updateHeroPos(new_hero_pos)
  
          objectMethodCalled('moveLeft')
        }
      };
      engine.addGlobal('hero', hero);
  
      engine.load(message.code);
  
      engine.runSync()

      let finishEvent = (currentHeroPosition.x == level.finish.x && currentHeroPosition.y == level.finish.y) ? 'success' : 'failure'
      setTimeout(() => ws.send(JSON.stringify({ event: finishEvent })), currentTimeout)
    }
  });
});

app.get('/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(levels[req.params.id]))
})

server.listen(port, () => console.log(`Server started on ${port}`))