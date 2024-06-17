// weather api project

let inputEL = document.getElementById('city-input')
let searchCityEL = document.getElementById('js-search-city')
let cityNameEL = document.getElementById('js-city-name')
let countryNameEL = document.getElementById('js-country-name')
let weatherTypeEL = document.getElementById('js-weather-type')
let tempEL = document.getElementById('js-temp')
let mintempEL = document.getElementById('js-min-temp')
let maxtempEL = document.getElementById('js-max-temp')

let API_TOKEN = '941c91b023c9b9c5d112f78bd5473b5f';
// let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${"chennai"}&appid=${key}`;


const getSearchedWeather = async (cityName) => {
    if(!cityName) return
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_TOKEN}`

    try {
        const res = await fetch(url)
        if(!res){
            throw new error('city not found')
        }
        const data = await res.json()
    
        cityNameEL.innerHTML = data.name
        countryNameEL.innerHTML = data.sys.country
        weatherTypeEL.innerText = data.weather[0].description
        tempEL.innerText = (data.main.temp - 273.15).toFixed(2)
        mintempEL.innerHTML = (data.main.temp_min - 273.15).toFixed(2)
        maxtempEL.innerText = (data.main.temp_max - 273.15).toFixed(2)
    
        console.log(data)

    } catch (error) {
        console.log(error)
        console.log('Cannot fetch the weather of entered city name!')
    }
   
}

getSearchedWeather()

searchCityEL.addEventListener('click', () => {
    getSearchedWeather(inputEL.value)
    inputEL.value = ''
})


