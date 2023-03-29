import {
  getWeatherFromLocation,
  processWeatherDataCurrentDay,
  getWeatherIcon,
} from './get-process-data';
import moment from 'moment';

(function getLocationFromInput() {
  const locationInput = document.querySelector('.top-left input');
  const searchIcon = document.querySelector('.top-left .magnifying-glass');
  let location;

  window.addEventListener('keydown', (e) => {
    if (locationInput === document.activeElement && e.key === 'Enter') {
      location = locationInput.value;
      populateTopLeftSection(location);
      populateTopRightSection(location);
      locationInput.value = '';
    }
  });

  searchIcon.addEventListener('click', () => {
    location = locationInput.value;
    populateTopLeftSection(location);
    populateTopRightSection(location);
    locationInput.value = '';
  });
})();

export async function populateTopLeftSection(location = 'Bali') {
  const conditionEl = document.querySelector('.condition');
  const locationEl = document.querySelector('.location');
  const dateEl = document.querySelector('.date');
  const hourEl = document.querySelector('.hour');
  const tempEl = document.querySelector('.main-temp');
  const iconEl = document.querySelector('.condition-icon');
  let condition;
  let loc;
  let dateTime;
  let tempC;
  let rest;

  const response = getWeatherFromLocation(location);
  // destructuring the weather data
  [condition, loc, dateTime, tempC, ...rest] =
    await processWeatherDataCurrentDay(response);

  const momentDate = moment(dateTime, 'YYYY-MM-DD HH:mm');
  const date = momentDate.format("dddd, MMMM Do [']YY");
  const time = momentDate.format('h:mm a');
  // the ...rest variable contains all of the data that was not used for this section
  const isDay = rest[rest.length - 1];

  const iconSrc = await getWeatherIcon(condition, isDay);

  conditionEl.textContent = condition;
  locationEl.textContent = loc;
  dateEl.textContent = date;
  hourEl.textContent = time;
  tempEl.textContent = tempC;
  iconEl.src = iconSrc;
}

export async function populateTopRightSection(location = 'Bali') {
  const feelsLikeEl = document.querySelector('.feels-like .right-stat');
  const humidityEl = document.querySelector('.humidity .right-stat');
  const chanceOfRainEl = document.querySelector('.chance-of-rain .right-stat');
  const windSpeedEl = document.querySelector('.wind-speed .right-stat');
  let feelsLike;
  let humidity;
  let windSpeed;
  let chanceOfRain;
  let data;

  const response = getWeatherFromLocation(location);
  //destructuring the weather data
  [, , , , ...data] = await processWeatherDataCurrentDay(response);
  feelsLike = data[0];
  humidity = data[1];
  windSpeed = data[2];
  chanceOfRain = data[3];
  

  console.log(await processWeatherDataCurrentDay(response))

  feelsLikeEl.textContent = feelsLike;
  humidityEl.textContent = humidity;
  chanceOfRainEl.textContent = chanceOfRain;
  windSpeedEl.textContent = windSpeed;
}
