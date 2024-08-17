

import "./styles/main.css";



//get weather  data IIFE
const getWeather = (function () {
    let weatherData ="not yet fetched";
  
  
   const  fetchData = async (city) => {
    try{
      const response = await  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=3G6J4SDAEP2N7MK4LH69GUUVB&contentType=json`,
      //const response = await  fetch('./pseudo_webData.json',  //avoid maximizing tokens
      {mode: 'cors'}
      )
      console.log("response status:"+response.status)
      console.log("response received")
      //console.log(response)
      const data = await response.json();
      console.log("response processed")
      weatherData = data
      console.log(data)
  
  
      //displayWeather
      display.currentWeather();
  
  
    } catch (error){
        console.log(error)
    }
   }
  
  const completeData = () => weatherData
  const currentIcon =  () =>  weatherData.currentConditions.icon;
  
  const temp = () =>  `Temperature ${weatherData.currentConditions.temp}°C`
  const description = () =>  weatherData.currentConditions.conditions
  const feelsLike = () =>  `Feels Like: ${weatherData.currentConditions.feelslike}°C`
  const humidity = () =>  `Humidity: ${weatherData.currentConditions.humidity} %`
  const wind = () =>  `Wind: ${weatherData.currentConditions.windspeed} km/h `
  const resolvedAddress = () =>  `${weatherData.resolvedAddress}`
  
  const listenCityInput = () => {
  
  //for manual city input
  cityForm=document.querySelector('[data-city-form]')
  cityInput=document.querySelector('[data-city-input]')
  cityBTN=document.querySelector('[city-BTN]')
  cityForm.addEventListener("submit",e =>{
    e.preventDefault()
    const cityEntered = cityInput.value;
    cityInput.value="";
    getWeather.fetchData(cityEntered)
  })
  
  cityBTN.addEventListener("click",e =>{
    e.preventDefault()
    const cityEntered = cityInput.value;
    cityInput.value="";
    getWeather.fetchData(cityEntered)
  })
  
  }
  
  
  return {fetchData, 
          listenCityInput,
          currentIcon, 
          completeData, 
          temp,
          description,
          feelsLike,
          humidity,
          wind,
          resolvedAddress
        };
  
  }
  )();
  
  //generate display output IIFE
  const display = (function() {
  
    const gifDisplay = document.querySelector('[data-gif]');
    const getGIF = async (item) => {
      try{ 
      const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dkQobVzue3zvlSCGbEqwKvIV02M4I6g8&s=${item}`, 
      //const gifResponse = await fetch(`./pseudoGif.json`, //avoid maximizing tokens
      {mode: 'cors'}
      )
      console.log('gifResponse received')
      const gifData = await gifResponse.json()
      console.log('gifData processed')
      gifDisplay.src = gifData.data.images.original.url;
      } catch (err){
        console.log(err)
      }
    }
  
    //showDisplayBox
    const displayBox = document.querySelector("[data-displayBox]")
    const showDisplayBox = () =>  displayBox.classList.remove('hide')
  
  
    //currentCondition Display
    const cityDisplay = document.querySelector("[data-city]")
    const iconDisplay = document.querySelector("[data-icon]")
    const descDisplay = document.querySelector("[data-description]")
    const tempDisplay = document.querySelector("[data-temp]")
    const feelDisplay = document.querySelector("[data-feelsLike]")
    const humDisplay = document.querySelector("[data-humidity]")
    const windDisplay = document.querySelector("[data-wind]")
    
    const currentWeather = () => {
      display.showDisplayBox();
      cityDisplay.innerText = getWeather.resolvedAddress();
      descDisplay.innerText = getWeather.description();
      tempDisplay.innerText = getWeather.temp();
      feelDisplay.innerText = getWeather.feelsLike();
      humDisplay.innerText = getWeather.humidity();
      windDisplay.innerText = getWeather.wind();
      iconDisplay.src=`./iconSet/${getWeather.currentIcon()}.svg`
  
      //temporary
      display.getGIF(getWeather.description());
      
      console.log(getWeather.currentIcon())
      console.log(getWeather.temp())
      console.log(getWeather.description())
      console.log(getWeather.feelsLike())
      console.log(getWeather.humidity())
      console.log(getWeather.currentIcon())
    }
  
  
    return{getGIF, currentWeather, showDisplayBox}
  })();
  
  
  
  //for manual city input
  let cityForm=document.querySelector('[data-city-form]')
  let cityInput=document.querySelector('[data-city-input]')
  let cityBTN=document.querySelector('[city-BTN]')
  cityForm.addEventListener("submit",e =>{
    e.preventDefault()
    const cityEntered = cityInput.value;
    cityInput.value="";
    getWeather.fetchData(cityEntered)
  })
  
  cityBTN.addEventListener("click",e =>{
    e.preventDefault()
    const cityEntered = cityInput.value;
    cityInput.value="";
    getWeather.fetchData(cityEntered)
  })
  
  
  
  
  
  
  
  //get location for initial load
  async function  loadCurrentPosition(){
    if(navigator.geolocation){
      await navigator.geolocation.getCurrentPosition
    ((position) => {
    console.log(`${position.coords.latitude},${position.coords.longitude}`)
    getWeather.fetchData(`${position.coords.latitude},${position.coords.longitude}`)
    },
    (err) => {
    alert(err.message)
    })
    }else {
    alert ("Geolocation not supported by your browser")
    }
  }
  
  
  getWeather.listenCityInput()
  loadCurrentPosition()
  
  //getWeather.fetchData("asd") // for instant display debug
  
  
  