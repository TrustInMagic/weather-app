/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
async function getWeatherFromLocation(location, type = 'forecast', days = '8') {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/${type}.json?key=b799deac1aed4f0b980145810232703&q=${location}&days=${days}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log(`OOPS ${error}`);
  }
}

async function getWeatherConditions() {
  const response = await fetch('./assets/weather_conditions.json');
  const weatherConditions = await response.json();

  return weatherConditions
}

async function processWeatherDataCurrentDay(data) {
  const awaitedData = await data;

  const condition = awaitedData.current.condition.text;
  const location = awaitedData.location.name;
  const dateHour = awaitedData.location.localtime;
  const tempC = awaitedData.current.temp_c;
  const feelsLikeC = awaitedData.current.feelslike_c;
  const humidity = awaitedData.current.humidity;
  const windSpeed = awaitedData.current.wind_kph;
  const chanceOfRain =
    awaitedData.forecast.forecastday[0].day.daily_chance_of_rain;
  const isDay = awaitedData.current.is_day;
}

function processWeatherForecastSpecificDate(data, day) {
  // day = 0 is today; day = 1 is tomorrow, etc;
  const maxTempC = data.forecast.forecastday[day].day.maxtemp_c;
  const minTempC = data.forecast.forecastday[day].day.mintemp_c;
  const dayCondition = data.forecast.forecastday[day].day.condition.text;

  return [maxTempC, minTempC, dayCondition];
}

function processWeatherForecastHourly(data, hour) {
  const hourTempC = data.forecast.forecastday[0].hour[hour];
  const hourCondition = data.forecast.forecastday[0].hour[hour].condition.text;
}

async function getWeatherIcon(data, condition, isDay) {
  const awaitedData = await data;
  let iconCode;
  let iconSrc;

  for (let i = 0; i < awaitedData.length; i++) {
    if (awaitedData[i].day === condition) {
      iconCode = awaitedData[i].icon;
    }
  }
// /home/tim/Coding/repos/weather-app/dist/assets/weather/64x64/night/113.png
  if (isDay) {
    iconSrc = `./assets/weather/64x64/day/${iconCode}.png`;
  } else iconSrc = `./assets/weather/64x64/night/${iconCode}.png`;

  const icon = new Image();
  icon.src = iconSrc

  return icon;
}


const bucharestData = getWeatherFromLocation('Bucharest');
processWeatherDataCurrentDay(bucharestData);

const weatherConditions = getWeatherConditions();

getWeatherIcon(weatherConditions, 'Sunny', 1)

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEtBQUssOENBQThDLFNBQVMsUUFBUSxLQUFLO0FBQy9HLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osd0JBQXdCLE1BQU07QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsU0FBUztBQUNyRCxJQUFJLCtDQUErQyxTQUFTOztBQUU1RDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRnJvbUxvY2F0aW9uKGxvY2F0aW9uLCB0eXBlID0gJ2ZvcmVjYXN0JywgZGF5cyA9ICc4Jykge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS8ke3R5cGV9Lmpzb24/a2V5PWI3OTlkZWFjMWFlZDRmMGI5ODAxNDU4MTAyMzI3MDMmcT0ke2xvY2F0aW9ufSZkYXlzPSR7ZGF5c31gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBPT1BTICR7ZXJyb3J9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckNvbmRpdGlvbnMoKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy4vYXNzZXRzL3dlYXRoZXJfY29uZGl0aW9ucy5qc29uJyk7XG4gIGNvbnN0IHdlYXRoZXJDb25kaXRpb25zID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gIHJldHVybiB3ZWF0aGVyQ29uZGl0aW9uc1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlckRhdGFDdXJyZW50RGF5KGRhdGEpIHtcbiAgY29uc3QgYXdhaXRlZERhdGEgPSBhd2FpdCBkYXRhO1xuXG4gIGNvbnN0IGNvbmRpdGlvbiA9IGF3YWl0ZWREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gIGNvbnN0IGxvY2F0aW9uID0gYXdhaXRlZERhdGEubG9jYXRpb24ubmFtZTtcbiAgY29uc3QgZGF0ZUhvdXIgPSBhd2FpdGVkRGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gIGNvbnN0IHRlbXBDID0gYXdhaXRlZERhdGEuY3VycmVudC50ZW1wX2M7XG4gIGNvbnN0IGZlZWxzTGlrZUMgPSBhd2FpdGVkRGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jO1xuICBjb25zdCBodW1pZGl0eSA9IGF3YWl0ZWREYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGF3YWl0ZWREYXRhLmN1cnJlbnQud2luZF9rcGg7XG4gIGNvbnN0IGNoYW5jZU9mUmFpbiA9XG4gICAgYXdhaXRlZERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICBjb25zdCBpc0RheSA9IGF3YWl0ZWREYXRhLmN1cnJlbnQuaXNfZGF5O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzV2VhdGhlckZvcmVjYXN0U3BlY2lmaWNEYXRlKGRhdGEsIGRheSkge1xuICAvLyBkYXkgPSAwIGlzIHRvZGF5OyBkYXkgPSAxIGlzIHRvbW9ycm93LCBldGM7XG4gIGNvbnN0IG1heFRlbXBDID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtkYXldLmRheS5tYXh0ZW1wX2M7XG4gIGNvbnN0IG1pblRlbXBDID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtkYXldLmRheS5taW50ZW1wX2M7XG4gIGNvbnN0IGRheUNvbmRpdGlvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbZGF5XS5kYXkuY29uZGl0aW9uLnRleHQ7XG5cbiAgcmV0dXJuIFttYXhUZW1wQywgbWluVGVtcEMsIGRheUNvbmRpdGlvbl07XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyRm9yZWNhc3RIb3VybHkoZGF0YSwgaG91cikge1xuICBjb25zdCBob3VyVGVtcEMgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaG91cl07XG4gIGNvbnN0IGhvdXJDb25kaXRpb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaG91cl0uY29uZGl0aW9uLnRleHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJJY29uKGRhdGEsIGNvbmRpdGlvbiwgaXNEYXkpIHtcbiAgY29uc3QgYXdhaXRlZERhdGEgPSBhd2FpdCBkYXRhO1xuICBsZXQgaWNvbkNvZGU7XG4gIGxldCBpY29uU3JjO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXdhaXRlZERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXdhaXRlZERhdGFbaV0uZGF5ID09PSBjb25kaXRpb24pIHtcbiAgICAgIGljb25Db2RlID0gYXdhaXRlZERhdGFbaV0uaWNvbjtcbiAgICB9XG4gIH1cbi8vIC9ob21lL3RpbS9Db2RpbmcvcmVwb3Mvd2VhdGhlci1hcHAvZGlzdC9hc3NldHMvd2VhdGhlci82NHg2NC9uaWdodC8xMTMucG5nXG4gIGlmIChpc0RheSkge1xuICAgIGljb25TcmMgPSBgLi9hc3NldHMvd2VhdGhlci82NHg2NC9kYXkvJHtpY29uQ29kZX0ucG5nYDtcbiAgfSBlbHNlIGljb25TcmMgPSBgLi9hc3NldHMvd2VhdGhlci82NHg2NC9uaWdodC8ke2ljb25Db2RlfS5wbmdgO1xuXG4gIGNvbnN0IGljb24gPSBuZXcgSW1hZ2UoKTtcbiAgaWNvbi5zcmMgPSBpY29uU3JjXG5cbiAgcmV0dXJuIGljb247XG59XG5cblxuY29uc3QgYnVjaGFyZXN0RGF0YSA9IGdldFdlYXRoZXJGcm9tTG9jYXRpb24oJ0J1Y2hhcmVzdCcpO1xucHJvY2Vzc1dlYXRoZXJEYXRhQ3VycmVudERheShidWNoYXJlc3REYXRhKTtcblxuY29uc3Qgd2VhdGhlckNvbmRpdGlvbnMgPSBnZXRXZWF0aGVyQ29uZGl0aW9ucygpO1xuXG5nZXRXZWF0aGVySWNvbih3ZWF0aGVyQ29uZGl0aW9ucywgJ1N1bm55JywgMSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==