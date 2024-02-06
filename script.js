const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', (e) => {
    const APIkey ='4a477636ab11b9efcd5b90ecb830e655'
    const city = document.querySelector('.search-box input').value;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fade-in')
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fade-in');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = './images/clear.png';
                break;

            case 'Rain':
                image.src = './images/rain.png';
                break;
            
            case 'Snow':
                image.src = './images/snow.png';
                break;

            case 'Clouds':
                image.src = './images/cloud.png';
                break;
                
            case 'Haze':
                image.src = './images/haze.png';
                break;      

            default: image.src = ''
        }
        console.log(json.main)
        temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C </span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fade-in');
        weatherDetails.classList.add('fade-in');
        container.style.height = '590px';
    
})
})