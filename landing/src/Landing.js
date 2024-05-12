import './Landing.css'
import { TypeAnimation } from 'react-type-animation'

const Landing = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='logo'>kodifix</div>
      </div>
      <div className='description'>
        Становись{' '}
        <span className='purpleSpan'>
          <TypeAnimation
            sequence={['магом', 2000, 'рыцарем', 2000, 'шпионом', 2000, 'ведьмой', 2000, 'ниндзя', 2000]}
            repeat={Infinity}
          />
        </span>
        и изучай программирование на Python
      </div>
    </div>
  )
}

export default Landing