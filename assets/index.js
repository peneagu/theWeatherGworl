 const timeEl = document.getElementById('time');
 const dateEl = document.getElementById('date');
 const currentWeatherItemsEl = document.getElementById('current-weather-item');
 const timezone = document.getElementById('time-zone');
 const stateEl = document.getElementById('state'); 
 const weatherForecastEl = document.getElementById('weather-forecast');
 const currentTempEl = document.getElementById('current-temp');

 
 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

 const API_KEY = `d7e73c5eacf23a869ff8e9e06e344cef`

 setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

 }, 1000);

 getWeatherData()
 function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
      console.log(success);

      let {latitude, longitude} = success.coords;

      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json ()).then(data => {
      
      console.log(data)
      showWeatherData(data);
      })
    })
 }

 function showWeatherData (data){
   let {Humidity, Low, Rain, Clouds, Wind_Speed, Sunrise, Sunset} = data.current;

   currentWeatherItemsEl.innerHTML = 
      `<div class="weather-item">
         <div>Humidity</div>
         <div>${Humidity}</div>
      </div>
      <div class="weather-item">
         <div>Low</div>
         <div>${Low}</div>
      </div>
      <div class="weather-item">
         <div>Rain</div>
         <div>${Rain}</div>
      </div>
      <div class="weather-item">
         <div>Clouds</div>
         <div>${Clouds}</div>
      </div>
      <div class="weather-item">
         <div>Wind_Speed</div>
         <div>${Wind_Speed}</div>
      </div>
      <div class="weather-item">
         <div>Sunrise</div>
         <div>${window.Comment(Sunrise * 1000).format('HH:mm a')}</div>
      </div>
      <div class="weather-item">
         <div>Sunset</div>
         <div>${window.Comment(Sunset * 1000).format('HH:mm a')}</div>
      </div>`;

let otherDayForecast = ''
data.daily.forEach((day, idx) => {
   if(idx == 0){

   }else{
      otherDayForecast += `
         <div class="weather-forecast-item">
            <div class="day">${window.moment(Sunset * 1000).format('ddd')}</div>
            <img src=" http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - 91&#176; F</div>
            <div class="temp">Day - 125&#176; F</div>  
         </div>
         `
   
   }
})

}