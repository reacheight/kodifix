import './Landing.css'
import { TypeAnimation } from 'react-type-animation'

const Landing = () => {
  const ctaButton = (
    <div className='ctaButton' onClick={() => document.getElementById('form').scrollIntoView()}>
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
            sequence={['волшебником', 2000, 'рыцарем', 2000, 'шпионом', 2000, 'ниндзя', 2000]}
            repeat={Infinity}
          />
        </span>
        и изучи
        <div>программирование на Python.</div>
      </div>
      <div className='subDescription'>
        <div>Погрузись в увлекательный мир, в котором сказочные герои оживут благодаря твоему коду!</div>
      </div>
      <div className='buttonUnderDescription'>
        {ctaButton}
      </div>
    </div>
  )
}

export default Landing