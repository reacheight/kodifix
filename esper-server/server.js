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
  [0]: {
    height: 2,
    width: 4,
    hero: { x: 0, y: 0 },
    finish: { x: 1, y: 3 },
  },
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
  [2]: {
    height: 15,
    width: 7,
    hero: { x: 12, y: 6 },
    finish: { x: 1, y: 2 },
    gems: [ { x: 5, y: 3 } ],
    linesGoal: 10,
  }
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
      var gemsCollected = 0
  
      const updateHeroPos = (newHeroPosition) => {
        currentHeroPosition = structuredClone(newHeroPosition)
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
        }
      };

      engine.addGlobal('hero', hero);
      engine.load(message.code);
  
      engine.runSync()

      let endEvent = {
        event: 'end',
        hasFinished: currentHeroPosition.x === level.finish.x && currentHeroPosition.y === level.finish.y,
        allGemsCollected: !level.gems || gemsCollected === level.gems.length,
        numberOfLinesSatisfy: !level.linesGoal || message.code.split(/\r\n|\r|\n/).length <= level.linesGoal
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