const statApp = () => {
    document.querySelector('.cta-button-container__cta-button').addEventListener('click', () => {
        document.querySelector('.application-form').scrollIntoView()
    })

    new Typewriter('#typewriter-effect-desktop', {
        strings: ['волшебником', 'рыцарем', 'шпионом', 'ниндзя'],
        delay: 50,
        deleteSpeed: 50,
        autoStart: true,
        loop: true,
    });

    new Typewriter('#typewriter-effect-mobile', {
        strings: ['волшебником', 'рыцарем', 'шпионом', 'ниндзя'],
        delay: 50,
        deleteSpeed: 50,
        autoStart: true,
        loop: true,
    });
}

statApp();

