import './App.css'
import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

function App() {
  const initialLevel = Array(10).fill().map(_ => Array(10).fill(' # '))
  const [heroPosition, setHeroPosition] = useState([0, 0])
  const [finishPosition, setFinishPosition] = useState([0, 0])
  const [level, setLevel] = useState(initialLevel)
  const [levelInited, setLevelInited] = useState(false)
  const [gemsCollected, setGemsCollected] = useState(0)
  const [isFirstRun, setIsFirstRun] = useState(true)

  const updateLevelPoint = (x, y, value) => {
    if (!level)
      return

    let newLevel = [...level]
    newLevel[x][y] = value
    setLevel(newLevel)
  }

  const updateHeroPosition = (x, y) => {
    updateLevelPoint(x, y, ' h ')
    let prevPositionValue = (heroPosition[0] == finishPosition[0] && heroPosition[1] == finishPosition[1]) ? ' F ' : ' # '
    updateLevelPoint(heroPosition[0], heroPosition[1], prevPositionValue)
    setHeroPosition([x, y])
  }

  const updateFinishPosition = (x, y) => {
    updateLevelPoint(x, y, ' F ')
    updateLevelPoint(heroPosition[0], heroPosition[1], ' # ')
    setFinishPosition([x, y])
  }

  const setGems = gems => {
    gems.forEach(gemPoint => {
      updateLevelPoint(gemPoint[0], gemPoint[1], ' G ')
    })
  }

  const collectGem = () => {
    setGemsCollected(gemsCollected + 1)
  }

  const restart = () => {
    setLevelInited(false)
    setLevel(initialLevel)
    setGemsCollected(0)
    sendJsonMessage({
      event: 'levelInit'
    })
  }

  const [userCode, setUserCode] = useState('')

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket("ws://localhost:9000", {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WS connection openned')

      sendJsonMessage({
        event: 'levelInit'
      })
    }
  }, [readyState])

  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)

    if (lastJsonMessage && lastJsonMessage.event === 'levelInit') {
      updateFinishPosition(lastJsonMessage.finishX, lastJsonMessage.finishY)
      updateHeroPosition(lastJsonMessage.heroX, lastJsonMessage.heroY)
      setGems(lastJsonMessage.gems)
      setLevelInited(true)
    }

    if (lastJsonMessage && lastJsonMessage.event === 'updateHero')
      updateHeroPosition(lastJsonMessage.x, lastJsonMessage.y)


    if (lastJsonMessage && lastJsonMessage.event === 'gemCollected')
      collectGem()

    if (lastJsonMessage && lastJsonMessage.event === 'success')
      window.alert("Success! Hero reached the finish!")

    if (lastJsonMessage && lastJsonMessage.event === 'failure')
      window.alert("Failure! Hero didn't reach the finish!")
  }, [lastJsonMessage])

  const onRun = () => {
    if (!isFirstRun)
      restart()
    
    sendJsonMessage({
      event: 'run',
      code: userCode
    })
    setIsFirstRun(false)
  }

  return (
    <div className="App">
      <div>
        <textarea className='userCode' onChange={e => setUserCode(e.target.value)} />
        <button onClick={() => onRun()}>run</button>
        <button onClick={() => restart()}>restart</button>
      </div>

      {levelInited &&
      <div>
        <ul>
          {level.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </div>
      }

      <div>
        Gems collected: {gemsCollected}
      </div>
    </div>
  );
}

export default App;
