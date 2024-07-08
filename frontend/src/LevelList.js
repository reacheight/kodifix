import { Link } from 'react-router-dom'

const LevelList = () => {
  const levelCount = 4

  return (
    <div>
      <ul>
        {Array(levelCount).fill().map((_, i) => i + 1).map(levelId =>
          <li key={levelId}>
            <Link to={`/level/${levelId}`}>Уровень {levelId}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default LevelList