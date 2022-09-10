 const timeEl = document.getElementById('time');
 const dateEl = document.getElementById('date');
 const currentWeatheritemsEl = document.getElementById('current-weather-item');
 const timezone = document.getElementById('time-zone');
 const stateEl = document.getElementById('country'); const weatherForecastEl = document.getElementById('weather-forecast');
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


 function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res => res.json ()).then(data => {
         console.log(data)

        })
    })
 }

 function showWeatherData (data){
   let {High, Low, Rain, Clouds, Wind_Speed, Sunrise, Sunset} = data.current;

   currentWeatheritemsEl.innerHTML = 
   `    <div class="weather-item">
   <div>${High}</div>
   <div>103&#176</div>
</div>
<div class="weather-item">
   <div>${Low}</div>
   <div>85&#176</div>
</div>
<div class="weather-item">
   <div>${Rain}</div>
   <div>0.02%</div>
</div>
<div class="weather-item">
   <div>${Clouds}</div>
   <div>9%</div>
</div>
<div class="weather-item">
   <div>${Wind_Speed}</div>
   <div>5mph</div>
</div>
<div class="weather-item">
   <div>Sunrise</div>
   <div>${window.Comment(Sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
   <div>Sunset</div>
   <div>${window.Comment(Sunset * 1000).format('HH:mm a')}</div>
</div>




`;

 }