
let mapApiKey = '77a8a99fd6d5734b5a0641aee451b318'
let apiKey = `c1e786c40c694deb9a3143022241601`

let cityName = document.getElementById('currentCityName')
let weatherImg = document.getElementById('weatherImage')
let temperature = document.getElementById('temperature')
let weatherState = document.getElementById('weatherState')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('windSpeed')
let cityInput = document.getElementById('cityNameInput')
let twoDaysWeather = document.getElementById('twoDaysWeather')
let placeHolder = document.getElementById('placeHolder')
cityInput.value = ``


let cityQuery =``
cityInput.addEventListener('keyup', function () {
    if (cityInput.value.length >= 3){
        cityQuery = cityInput.value
        getWeather(cityQuery)
    }


})




async function getWeather (query){
 let response =
     await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=no&alerts=no`)
    let data = await response.json()
    console.log(data)
    weatherImg.src = data.current.condition.icon;
    cityName.innerHTML = data.location.name;
    if (data.location.name.length >= 10) {
        cityName.classList.add('fs-4')
    } else {
        cityName.classList.remove('fs-4')
    }
    temperature.innerHTML = `${data.current.temp_c} <sup> &deg;C </sup>`;
   weatherState.innerHTML = data.current.condition.text;
    humidity.innerHTML = `${data.current.humidity}%`;
    windSpeed.innerHTML = `${data.current.gust_kph} Km/h`;

    let weatherBox = ``
    for (let i =1; i<data.forecast.forecastday.length; i++) {
        weatherBox += `
        <div class="d-flex text-center justify-content-center align-items-center flex-column p-5">
        <img src='${data.forecast.forecastday[i].day.condition.icon}'>
        <h1 >${data.forecast.forecastday[i].day.avgtemp_c } <sup> &deg;C </sup></h1>
        <h5 class="fw-lighter" >${data.forecast.forecastday[i].day.condition.text}</h5>
        <h6 >${data.forecast.forecastday[i].date}</h6>
        
      
        </div>

        `

    }
    twoDaysWeather.innerHTML = weatherBox;
    placeHolder.classList.replace('opacity-100', 'opacity-0', (
        $('#mainBox').animate({opacity: 1}, 1000)
    ))


}


async function getUserLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserWeather, onDecline);
    }
}

function onDecline(error){
    if(error.code === error.PERMISSION_DENIED ){
        getWeather('Cairo')
    }
}


async function getUserWeather(position){
    let userCity = ``

    const url = `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${position.coords.latitude}%2C${position.coords.longitude}&language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8aed56df2dmshfd31ce55afc8d21p1d9e68jsn88b592b636e7',
            'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        userCity = result.results[0].region
    } catch (error) {
        console.error(error);
    }


    getWeather(userCity)



}
getUserLocation()
