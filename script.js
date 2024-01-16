let apiKey = 'c1e786c40c694deb9a3143022241601'
let mapsKey =`AIzaSyCahgn1sMr-thNtBUqlLbM4EZ3bjT-6CKg`
let cityName = document.getElementById('currentCityName')
let weatherImg = document.getElementById('weatherImage')
let temperature = document.getElementById('temperature')
let weatherState = document.getElementById('weatherState')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('windSpeed')
let cityInput = document.getElementById('cityNameInput')


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
    weatherImg.src = data.current.condition.icon
    cityName.innerHTML = data.location.name
    temperature.innerHTML = `${data.current.temp_c} <sup> &deg;C </sup>`
   weatherState.innerHTML = data.current.condition.text
    humidity.innerHTML = `${data.current.humidity}%`
    windSpeed.innerHTML = `${data.current.gust_kph} Km/h`
}


async function getLocationWeather () {
    if (navigator.geolocation){
        let result =  await fetch('https://ipinfo.io/197.54.7.187?token=a117ca4fe8503a')
        let data = await result.json()
        console.log(data)
        getWeather(data.city)
    }



}
getLocationWeather ()
