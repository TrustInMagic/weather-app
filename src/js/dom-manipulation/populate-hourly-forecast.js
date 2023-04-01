import { getWeatherIcon } from '../data-collecting/get-process-data';
import moment from 'moment';

function elementFromHtml(html) {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  return container;
}

async function createWeatherCard(data) {
  const weatherCard = elementFromHtml(`
    <div class="weather-card weather-card-hourly">
      <div class="hour"></div>
      <div class="temp-container">
        <div class="max-temp-container">
          <div class="max-temp"></div><span class="temp-unit">°C</span>
        </div>
      </div>
      <img src="">
    </div>
  `);

  const hourEl = weatherCard.querySelector('.hour');
  const tempEl = weatherCard.querySelector('.max-temp');
  const icon = weatherCard.querySelector('img');
  const iconSrc = await getWeatherIcon(data[1], data[2]);
  const date = data[3];
  const momentDate = moment(date, 'YYYY-MM-DD HH:mm');
  const time = momentDate.format('h:mm a');
  const temp = data[0];

  hourEl.textContent = time;
  tempEl.textContent = temp;
  icon.src = iconSrc;

  return weatherCard;
}

export async function populateHourlyForecast(
  firstSection,
  secondSection,
  thirdSection
) {
  const firstSectionDomEl = document.createElement('div');
  const secondSectionDomEl = document.createElement('div');
  const thirdSectionDomEl = document.createElement('div');
  firstSectionDomEl.classList.add('hour-section', 'first-section');
  firstSectionDomEl.setAttribute('data-visible', 'on');
  secondSectionDomEl.classList.add('hour-section', 'second-section');
  thirdSectionDomEl.classList.add('hour-section', 'third-section');

  for (let i = 0; i < firstSection.length; i++) {
    const firstSectionWeatherCard = await createWeatherCard(firstSection[i]);
    firstSectionDomEl.appendChild(firstSectionWeatherCard);
  }

  for (let i = 0; i < secondSection.length; i++) {
    const secondSectionWeatherCard = await createWeatherCard(secondSection[i]);
    secondSectionDomEl.appendChild(secondSectionWeatherCard);
  }

  for (let i = 0; i < thirdSection.length; i++) {
    const thirdSectionWeatherCard = await createWeatherCard(thirdSection[i]);
    thirdSectionDomEl.appendChild(thirdSectionWeatherCard);
  }

  const forecastDisplay = document.querySelector('.forecast-display');
  forecastDisplay.innerHTML = '';
  forecastDisplay.appendChild(firstSectionDomEl);
  forecastDisplay.appendChild(secondSectionDomEl);
  forecastDisplay.appendChild(thirdSectionDomEl);
}
