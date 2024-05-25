import './Landing.css'
import { TypeAnimation } from 'react-type-animation'

const Landing = () => {
  const ctaButton = (
    <div className='ctaButton'>
      Оставить заявку
    </div>
  )

  return (
    <div className='container'>
      <div className='header'>
        <div className='logo'>kodifix</div>
        {ctaButton}
      </div>
      <div className='description'>
        Стань{' '}
        <span className='highlight'>
          <TypeAnimation
            sequence={['магом', 2000, 'рыцарем', 2000, 'шпионом', 2000, 'ведьмой', 2000, 'ниндзя', 2000]}
            repeat={Infinity}
          />
        </span>
        и изучи
        <div>программирование на Python.</div>
      </div>
      <div className='buttonUnderDescription'>
        {ctaButton}
      </div>
    </div>
  )
}

export default Landing