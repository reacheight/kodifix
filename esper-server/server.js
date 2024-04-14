const esper = require('esper.js')
esper.plugin('lang-python')

const express = require('express')
const ws = require('ws')

const port = 9000
const app = express()
app.use(express.json())

const server = require('http').createServer(app)
const wsServer = new ws.Server({ server })

wsServer.on('connection', ws => {
  console.log('Connection opened')

  ws.on('message', data => {
    var message = JSON.parse(data)

    if (message.event === 'levelInit') {
      const finish = [7, 9]
      const hero_start = [3, 0]
      const gems = [[1, 4], [2, 6], [8, 3]]

      ws.send(JSON.stringify({
        event: 'levelInit',
        heroX: hero_start[0],
        heroY: hero_start[1],
        finishX: finish[0],
        finishY: finish[1],
        gems
      }))
    }

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
            x: new_hero_pos[0],
            y: new_hero_pos[1]
          }))

          if (collectedGem)
            ws.send(JSON.stringify({
              event: 'gemCollected',
              x: collectedGem.x,
              y: collectedGem.y
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

app.post('/run', (req, res) => {
  let userCode = req.body.code
  let engine = esper({
    language: 'python'
  });

  //#region level

  const level = Array(10).fill().map(_ => Array(5).fill(' '))

  const finish = [7, 4]
  level[finish[0]][finish[1]] = 'F'

  const hero_start = [5, 0]
  level[hero_start[0]][hero_start[1]] = 'H'

  var hero_current_pos = hero_start

  const updateHeroPos = (new_hero_pos) => {
      level[hero_current_pos[0]][hero_current_pos[1]] = ' '
      hero_current_pos = new_hero_pos
      level[hero_current_pos[0]][hero_current_pos[1]] = 'H'
  }

  //#endregion

  const objectMethodCalled = (methodName) => {
    let callExpression = engine.evaluator.lastASTNodeProcessed.parent.parent
    let start = callExpression.loc.start
    let end = callExpression.loc.end
    console.log(`${methodName} called. Start: line ${start.line}, col ${start.column}; End: line ${end.line}, col ${end.column}.`)
    console.log('current level state:')
    console.log(level)
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

  engine.load(userCode);

  engine.runSync()
  if (hero_current_pos[0] == finish[0] && hero_current_pos[1] == finish[1]) {
    res.send('Success!')
  } else {
    res.send('Fail!')
  }
})

server.listen(port, () => console.log(`Server started on ${port}`))