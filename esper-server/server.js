const esper = require('esper.js')
esper.plugin('lang-python')

const express = require('express')
const ws = require('ws')

const port = 9000
const app = express()
app.use(express.json())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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
    
      const finish = [7, 9]
      const hero_start = [3, 0]
      const gems = [
        {
          x: 1,
          y: 4,
          taken: false,
        },
        {
          x: 2,
          y: 6,
          taken: false,
        },
        {
          x: 8,
          y: 3,
          taken: false,
        }
      ]
  
      var hero_current_pos = hero_start
  
      const updateHeroPos = (new_hero_pos) => {
        hero_current_pos = new_hero_pos
        var collectedGem = null

        gems.forEach((gem, i) => {
          if (gem.x === new_hero_pos[0] && gem.y === new_hero_pos[1] && !gem.taken) {
            gems[i].taken = true
            collectedGem = gem
          }
        })

        setTimeout(() => {
          ws.send(JSON.stringify({
            event: 'updateHero',
            hero: {
              x: new_hero_pos[0],
              y: new_hero_pos[1]
            }
          }))

          if (collectedGem)
            ws.send(JSON.stringify({
              event: 'gemCollected'
            }))
        }, currentTimeout)
        currentTimeout += eventsTimeDiffMS;
      }
  
      const objectMethodCalled = (methodName) => {
        let callExpression = engine.evaluator.lastASTNodeProcessed.parent.parent
        let start = callExpression.loc.start
        let end = callExpression.loc.end
        console.log(`${methodName} called. Start: line ${start.line}, col ${start.column}; End: line ${end.line}, col ${end.column}.`)
      }
  
      const hero = {
        moveUp: function () {
          var new_hero_pos = [...hero_current_pos]
          new_hero_pos[0] -= 1
          updateHeroPos(new_hero_pos)

          objectMethodCalled('moveUp')
        },
  
        moveDown: function () {
          var new_hero_pos = [...hero_current_pos]
          new_hero_pos[0] += 1
          updateHeroPos(new_hero_pos)
          
          objectMethodCalled('moveDown')
        },
  
        moveRight: function () {
          var new_hero_pos = [...hero_current_pos]
          new_hero_pos[1] += 1
          updateHeroPos(new_hero_pos)
  
          objectMethodCalled('moveRight')
        },
  
        moveLeft: function () {
          var new_hero_pos = [...hero_current_pos]
          new_hero_pos[1] -= 1
          updateHeroPos(new_hero_pos)
  
          objectMethodCalled('moveLeft')
        }
      };
      engine.addGlobal('hero', hero);
  
      engine.load(message.code);
  
      engine.runSync()

      let finishEvent = (hero_current_pos[0] == finish[0] && hero_current_pos[1] == finish[1]) ? 'success' : 'failure'
      setTimeout(() => ws.send(JSON.stringify({ event: finishEvent })), currentTimeout)
    }
  });
});


app.get('/level/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    height: 10,
    width: 10,
    hero: { x: 3, y: 0 },
    finish: { x: 7, y: 9 },
    gems: [
      { x: 1, y: 4 },
      { x: 2, y: 6 },
      { x: 8, y: 3 }
    ]
  }))
})

server.listen(port, () => console.log(`Server started on ${port}`))