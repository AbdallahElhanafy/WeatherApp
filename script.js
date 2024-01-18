
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
    $('#mainBox').animate({opacity:100}, 1000)
}


async function getUserLocation () {

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getUserWeather);
        }
}

async function getUserWeather(position){
    let result =  await fetch(`http://api.positionstack.com/v1/reverse?access_key=${mapApiKey}&query= ${position.coords.latitude},${position.coords.longitude}&limit=1`)
    let data = await result.json()
     let userCity = data.data[0].region
   console.log(userCity)
    getWeather(userCity)

}
getUserLocation()
