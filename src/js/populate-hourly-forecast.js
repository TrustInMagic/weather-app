import {
  getWeatherFromLocation,
  processWeatherForecastHourly,
  getWeatherIcon,
} from './get-process-data';
import moment from 'moment';

function elementFromHtml(html) {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  return container;
}

export async function buildDisplaySectionData(location = 'Bali') {
  const response = await getWeatherFromLocation(location);
  const forecastDisplay = document.querySelector('.forecast-display');

  forecastDisplay.innerHTML = '';

  const dateTime = processWeatherForecastHourly(response, 0)[2];
  const localTime = moment(dateTime, 'YYYY-MM-DD HH:mm');
  const nextHours = [];
  const firstSection = [];
  const secondSection = [];
  const thirdSection = [];

  for (let i = 0; i < 24; i++) {
    const hour = moment(localTime)
      .add(i + 1, 'hours')
      .format('hh a');
    nextHours.push(hour);
  }

  for (let i = 0; i < 24; i++) {
    let hourTempC;
    let hourCondition;

    [hourTempC, hourCondition] = processWeatherForecastHourly(response, i);
    const usefulData = [hourTempC, hourCondition];

    if (i < 8) {
      firstSection.push(usefulData);
    } else if (i >= 8 && i < 16) {
      secondSection.push(usefulData);
    } else if (i >= 16) thirdSection.push(usefulData);
  }

  return [nextHours, firstSection, secondSection, thirdSection];
}

export function populateHourlyForecast() {
  const weatherCard = elementFromHtml(`
    <div class="weather-card">
      <div class="hour"></div>
      <div class="temp-container">
        <div class="max-temp-container">
          <div class="max-temp"></div><span class="temp-unit">°C</span>
        </div>
      </div>
      <img src="">
    </div>
  `);

  console.log(buildDisplaySectionData())
}
