import { handleWrongLocation } from '../handle-wrong-location';

export async function getWeatherFromLocation(
  location,
  type = 'forecast',
  days = '8'
) {
  let weatherData;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/${type}.json?key=b799deac1aed4f0b980145810232703&q=${location}&days=${days}`,
      { mode: 'cors' }
    );
    weatherData = await response.json();

    if (weatherData.error || !weatherData.location || !response.ok) {
      handleWrongLocation();
      throw new Error();
    }
  } catch (error) {
    console.log(`OOPS ${error}`);
    throw error;
  }

  return weatherData;
}

export async function processWeatherDataCurrentDay(data) {
  const awaitedData = await data;

  const condition = awaitedData.current.condition.text;
  const location = awaitedData.location.name;
  const dateTime = awaitedData.location.localtime;
  const tempC = awaitedData.current.temp_c;
  const tempCRounded = Math.round(tempC);
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
    tempCRounded,
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
  const maxTempCRounded = Math.round(maxTempC);
  const minTempC = data.forecast.forecastday[day].day.mintemp_c;
  const minTempCRounded = Math.round(minTempC);
  const dayCondition = data.forecast.forecastday[day].day.condition.text;
  const dateTime = data.location.localtime;

  return [maxTempCRounded, minTempCRounded, dayCondition, dateTime];
}

export function processWeatherForecastHourly(data, day, hour) {
  const hourTempC = data.forecast.forecastday[day].hour[hour].temp_c;
  const hourTempCRounded = Math.round(hourTempC);
  const hourCondition =
    data.forecast.forecastday[day].hour[hour].condition.text;
  const dateTime = data.location.localtime;
  const isDay = data.forecast.forecastday[day].hour[hour].is_day;
  const currentHour = data.forecast.forecastday[day].hour[hour].time;

  return [hourTempCRounded, hourCondition, isDay, dateTime, currentHour];
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
      iconCode = 113;
    } else if (awaitedData[i].day === condition) {
      iconCode = awaitedData[i].icon;
    }
  }

  if (isDay) {
    iconSrc = `./assets/weather/64x64/day/${iconCode}.png`;
  } else iconSrc = `./assets/weather/64x64/night/${iconCode}.png`;

  return iconSrc;
}
