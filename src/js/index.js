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
