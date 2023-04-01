import {
  getWeatherFromLocation,
  processWeatherForecastSpecificDate,
  getWeatherIcon,
} from '../data-collecting/get-process-data';
import moment from 'moment';

function elementFromHtml(html) {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  return container;
}

export async function populateDailyForecast(location = 'Bucharest') {
  const response = await getWeatherFromLocation(location);
  const forecastDisplay = document.querySelector('.forecast-display');

  forecastDisplay.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    let maxTempC;
    let minTempC;
    let dayCondition;
    let dateTime;

    [maxTempC, minTempC, dayCondition, dateTime] =
      processWeatherForecastSpecificDate(response, i);

    const iconSrc = await getWeatherIcon(dayCondition, 1);

    const localTime = moment(dateTime, 'YYYY-MM-DD HH:mm');
    const nextDaysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const day = moment(localTime)
        .add(i + 1, 'days')
        .format('dddd');
      nextDaysOfWeek.push(day);
    }

    const weatherCard = elementFromHtml(`
    <div class="weather-card">
      <div class="week-day"></div>
      <div class="temp-container">
        <div class="max-temp-container">
          <div class="max-temp"></div><span class="temp-unit">°C</span>
        </div>
        <div class="min-temp-container">
          <div class="min-temp"></div><span class="temp-unit">°C</span>
        </div>
      </div>
      <img class="daily-icon" src="">
    </div>
  `);

    const maxTempEl = weatherCard.querySelector('.max-temp');
    const minTempEl = weatherCard.querySelector('.min-temp');
    const icon = weatherCard.querySelector('img');
    const weekDay = weatherCard.querySelector('.week-day');

    maxTempEl.textContent = maxTempC;
    minTempEl.textContent = minTempC;
    weekDay.textContent = nextDaysOfWeek[i];
    icon.src = iconSrc;

    forecastDisplay.appendChild(weatherCard);
  }
}
