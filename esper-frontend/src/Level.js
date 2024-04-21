import './Level.css'
import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Level = () => {
  const { id } = useParams()
  const [level, setLevel] = useState([])
  const [heroPosition, setHeroPosition] = useState({})
  const [finishPosition, setFinishPosition] = useState({})
  const [gemsCollected, setGemsCollected] = useState(0)
  const [levelInited, setLevelInited] = useState(false)

  const [gemsGoal, setGemsGoal] = useState(0)
  const [linesGoal, setLinesGoal] = useState(0)
  
  const [finishedGoalSatisfy, setFinishedGoalSatisfy] = useState(false)
  const [gemsGoalSatisfy, setGemsGoalSatisfy] = useState(false)
  const [linesGoalSatisfy, setLinesGoalSatisfy] = useState(false)

  const [userCode, setUserCode] = useState(`# пиши код ниже, чтобы управлять своим персонажем
# нажми Запуск, когда закончишь

hero.moveRight()`)
  const onUserCodeChange = useCallback((val, _) => setUserCode(val), [])

  const [isProgramRunning, setIsProgramRunning] = useState(false)
  const [isFirstRun, setIsFirstRun] = useState(true)

  const createLevelCell = char => <div className='levelCell'>{char}</div>
  const emptyLevelCell = createLevelCell()
  const heroLevelCell = createLevelCell('🧙‍♂️')
  const finishLevelCell = createLevelCell('🏁')
  const gemLevelCell = createLevelCell('💎')

  const initLevel = async () => {
    setLevelInited(false)

    let levelInitData = await fetch(`http://localhost:9000/level/${id}`).then(res => res.json())
    let newLevel = Array(levelInitData.height).fill().map(_ => Array(levelInitData.width).fill(emptyLevelCell))
    newLevel[levelInitData.hero.x][levelInitData.hero.y] = heroLevelCell
    newLevel[levelInitData.finish.x][levelInitData.finish.y] = finishLevelCell
    if (levelInitData.gems) {
      setGemsGoal(levelInitData.gems.length)
      levelInitData.gems.forEach(gem => newLevel[gem.x][gem.y] = gemLevelCell)
    }

    if (levelInitData.linesGoal) {
      setLinesGoal(levelInitData.linesGoal)
    }

    setGemsCollected(0)
    setHeroPosition(levelInitData.hero)
    setFinishPosition(levelInitData.finish)
    setLevel(newLevel)

    setFinishedGoalSatisfy(false)
    setGemsGoalSatisfy(false)
    setLinesGoalSatisfy(false)

    setLevelInited(true)
  }

  useEffect(() => { initLevel() }, [])

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket("ws://localhost:9000", {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN)
      console.log('WS connection openned')
  }, [readyState])

  const updateLevelPoint = (x, y, value) => {
    if (!level)
      return

    let newLevel = [...level]
    newLevel[x][y] = value
    setLevel(newLevel)
  }

  const updateHeroPosition = newPosition => {
    let prevPositionCell = (heroPosition.x === finishPosition.x && heroPosition.y == finishPosition.y) ? finishLevelCell : emptyLevelCell
    updateLevelPoint(heroPosition.x, heroPosition.y, prevPositionCell)

    updateLevelPoint(newPosition.x, newPosition.y, heroLevelCell)
    setHeroPosition(newPosition)
  }

  const collectGem = () => {
    setGemsCollected(gemsCollected + 1)
  }

  useEffect(() => {
    if (!lastJsonMessage)
      return

    if (lastJsonMessage.event === 'updateHero')
      updateHeroPosition(lastJsonMessage.hero)

    if (lastJsonMessage.event === 'gemCollected')
      collectGem()

    if (lastJsonMessage.event === 'end') {
      setFinishedGoalSatisfy(lastJsonMessage.hasFinished)
      setGemsGoalSatisfy(lastJsonMessage.allGemsCollected)
      setLinesGoalSatisfy(lastJsonMessage.numberOfLinesSatisfy)
      setIsProgramRunning(false)

      if (lastJsonMessage.heroRanInWall === true)
        setTimeout(() => alert('Герой врезался в стену!'), 0)
    }
  }, [lastJsonMessage])

  const onRun = async () => {
    if (isProgramRunning)
      return

    if (!isFirstRun)
      await initLevel()
    
    sendJsonMessage({
      event: 'run',
      levelId: id,
      code: userCode
    })
    setIsProgramRunning(true)
    setIsFirstRun(false)
  }

  return (
    <div className='level'>
      <div className='codeEditorContainer'>
        <CodeMirror
          value={userCode} onChange={onUserCodeChange}
          height='700px' width='600px'
          extensions={[python()]}
          basicSetup={{
            autocompletion: false
          }}

          className='codeEditor'
        />
        <button className='runButton' onClick={() => onRun()}>Запуск</button>
        <div className='instructions'>
          <div className='list'>
            <div className='instruction'>hero.moveUp() — пойти на одну клетку вверх</div>
            <div className='instruction'>hero.moveDown() — пойти на одну клетку вниз</div>
            <div className='instruction'>hero.moveRight() — пойти на одну клетку вправо</div>
            <div className='instruction'>hero.moveLeft() — пойти на одну клетку влево</div>
          </div>
        </div>
      </div>

      {levelInited &&
      <div className='playfield'>
        {level.map((line, i) => <li className='levelLine' key={i}>{line}</li>)}

        {gemsGoal !== 0 &&
          <div>
            💎 ⨯ {gemsCollected}
          </div>
        }
      </div>
      }

      <div className='goals'>
        <div className='header'>Цели</div>
        <div className='list'>
          {gemsGoal !== 0 &&
            <div className='goal'>
              <div>Соберите {gemsGoal} 💎</div>
              <div>{gemsGoalSatisfy ? '✅' : '❌'}</div>
            </div>
          }
          <div className='goal'>
            <div>Достигните финиша</div>
            <div>{finishedGoalSatisfy ? '✅' : '❌'}</div>
          </div>
          {linesGoal !== 0 &&
            <div className='goal'>
              <div>Используйте {linesGoal} или меньше строк кода</div>
              <div>{linesGoalSatisfy ? '✅' : '❌'}</div>
            </div>
          }
        </div>
        {(gemsGoalSatisfy && finishedGoalSatisfy && linesGoalSatisfy) &&
            <div>
              <a href={`/level/${Number(id) + 1}`}>Следующий уровень</a> ➡️
            </div>
          }
      </div>
    </div>
  )
}

export default Level