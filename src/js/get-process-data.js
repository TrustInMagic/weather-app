export async function getWeatherFromLocation(
  location,
  type = 'forecast',
  days = '8'
) {
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

export async function processWeatherDataCurrentDay(data) {
  const awaitedData = await data;

  const condition = awaitedData.current.condition.text;
  const location = awaitedData.location.name;
  const dateTime = awaitedData.location.localtime;
  const tempC = awaitedData.current.temp_c;
  const feelsLikeC = awaitedData.current.feelslike_c;
  const humidity = awaitedData.current.humidity;
  const windSpeed = awaitedData.current.wind_kph;
  const chanceOfRain =
    awaitedData.forecast.forecastday[0].day.daily_chance_of_rain;
  const isDay = awaitedData.current.is_day;

  return [
    condition,
    location,
    dateTime,
    tempC,
    feelsLikeC,
    humidity,
    windSpeed,
    chanceOfRain,
    isDay,
  ];
}

export function processWeatherForecastSpecificDate(data, day) {
  // day = 0 is today; day = 1 is tomorrow, etc;
  const maxTempC = data.forecast.forecastday[day].day.maxtemp_c;
  const minTempC = data.forecast.forecastday[day].day.mintemp_c;
  const dayCondition = data.forecast.forecastday[day].day.condition.text;
  const dateTime = data.location.localtime;

  return [maxTempC, minTempC, dayCondition, dateTime];
}

export function processWeatherForecastHourly(data, day, hour) {
  const hourTempC = data.forecast.forecastday[day].hour[hour].temp_c;
  const hourCondition = data.forecast.forecastday[day].hour[hour].condition.text;
  const dateTime = data.location.localtime;
  const isDay = data.forecast.forecastday[day].hour[hour].is_day;

  // console.log(data)

  return [hourTempC, hourCondition, isDay, dateTime];
}

export async function getWeatherIcon(condition, isDay) {
  async function getWeatherConditionsAndIcons() {
    const response = await fetch('./assets/weather_conditions.json');
    const weatherConditions = await response.json();

    return weatherConditions;
  }

  const awaitedData = await getWeatherConditionsAndIcons();
  let iconCode;
  let iconSrc;

  for (let i = 0; i < awaitedData.length; i++) {
    if (condition === 'Clear' || condition === 'Sunny') {
      iconCode = 113
    } else if (awaitedData[i].day === condition) {
      iconCode = awaitedData[i].icon;
    }
  }

  if (isDay) {
    iconSrc = `./assets/weather/64x64/day/${iconCode}.png`;
  } else iconSrc = `./assets/weather/64x64/night/${iconCode}.png`;

  return iconSrc;
}
