import './Level.css'
import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { python } from '@codemirror/lang-python';

const Level = ({ id }) => {
  const [level, setLevel] = useState([])
  const [heroPosition, setHeroPosition] = useState({})
  const [finishPosition, setFinishPosition] = useState({})
  const [gemsCollected, setGemsCollected] = useState(0)
  const [levelInited, setLevelInited] = useState(false)

  const [userCode, setUserCode] = useState('')
  const onUserCodeChange = useCallback((val, _) => setUserCode(val), [])

  const [isFirstRun, setIsFirstRun] = useState(true)

  const [gemsGoal, setGemsGoal] = useState(0)
  const [linesGoal, setLinesGoal] = useState(0)
  
  const [finishedGoalSatisfy, setFinishedGoalSatisfy] = useState(false)
  const [gemsGoalSatisfy, setGemsGoalSatisfy] = useState(false)
  const [linesGoalSatisfy, setLinesGoalSatisfy] = useState(false)

  const initLevel = async () => {
    setLevelInited(false)

    let levelInitData = await fetch(`http://localhost:9000/level/${id}`).then(res => res.json())

    let newLevel = Array(levelInitData.height).fill().map(_ => Array(levelInitData.width).fill(' # '))
    newLevel[levelInitData.hero.x][levelInitData.hero.y] = ' h '
    newLevel[levelInitData.finish.x][levelInitData.finish.y] = ' F '
    if (levelInitData.gems) {
      setGemsGoal(levelInitData.gems.length)
      levelInitData.gems.forEach(gem => newLevel[gem.x][gem.y] = ' G ')
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
    let prevPositionValue = (heroPosition.x === finishPosition.x && heroPosition.y == finishPosition.y) ? ' F ' : ' # '
    updateLevelPoint(heroPosition.x, heroPosition.y, prevPositionValue)

    updateLevelPoint(newPosition.x, newPosition.y, ' h ')
    setHeroPosition(newPosition)
  }

  const updateFinishPosition = newPosition => {
    updateLevelPoint(finishPosition.x, finishPosition.y, ' # ')

    updateLevelPoint(newPosition.x, newPosition.y, ' F ')
    setFinishPosition(newPosition)
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
    }
  }, [lastJsonMessage])

  const onRun = async () => {
    if (!isFirstRun)
      await initLevel()
    
    sendJsonMessage({
      event: 'run',
      levelId: id,
      code: userCode
    })
    setIsFirstRun(false)
  }

  return (
    <div className="level">
      <div>
        <CodeMirror
          value={userCode} onChange={onUserCodeChange}
          height='300px' width='300px'
          extensions={[python()]}
          basicSetup={{
            autocompletion: false
          }}

          className='codeEditor'
        />
        <button onClick={() => onRun()}>run</button>
        <button onClick={() => initLevel()}>restart</button>
      </div>

      {levelInited &&
      <div>
        <ul>
          {level.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </div>
      }

      {gemsGoal !== 0 &&
        <div>
          Gems collected: {gemsCollected}
        </div>
      }

      <div>
        Goals:
        <ul>
          {gemsGoal !== 0 &&
            <li>Collect {gemsGoal} gems {gemsGoalSatisfy && '✅'}</li>
          }
          <li>Reach the finish {finishedGoalSatisfy && '✅'}</li>
          {linesGoal !== 0 &&
            <li>Use {linesGoal} lines of code or less {linesGoalSatisfy && '✅'}</li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Level