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

  const dateTime = processWeatherForecastHourly(response, 0, 0)[3];
  const localTime = moment(dateTime, 'YYYY-MM-DD HH:mm');
  const hour = moment(localTime).format('H');
  const nextHours = [];
  const firstSection = [];
  const secondSection = [];
  const thirdSection = [];
  let hourIncrement = 1

  // getting next hours of the day starting now
  for (let i = +hour + 1; i < 24; i++) {
    console.log(i)
    const hour = moment(localTime)
      .add(hourIncrement, 'hours')
      .format('hh a');
    nextHours.push(hour);

    hourIncrement++
  }

  // if (nextHours.length < 24) {
  //   const hoursMissing = 24 - nextHours.length;
  //   console.log(hoursMissing)
  //   for (let i = 0; i < hoursMissing; i++) {
  //     const hour = moment(localTime)
  //       .add(nextHours.length, 'hours')
  //       .add(i + 1, 'hours')
  //       .format('hh a');
  //     nextHours.push(hour)
  //   }
  // }

  console.log(nextHours)

  for (let i = 0; i < 24; i++) {
    let hourTempC;
    let hourCondition;
    let isDay;

    [hourTempC, hourCondition, isDay] = processWeatherForecastHourly(
      response,
      0,
      i
    );
    const usefulData = [hourTempC, hourCondition, isDay];

    // constructing the data structures for the three sections
    // (each containing 8 weather cards to display) corresponding to the next 24 hours
    if (i < 8) {
      firstSection.push(usefulData);
    } else if (i >= 8 && i < 16) {
      secondSection.push(usefulData);
    } else if (i >= 16) thirdSection.push(usefulData);
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (j === i) {
        firstSection[i].push(nextHours[j]);
      }
    }
  }

  return [firstSection, secondSection, thirdSection];
}

async function createWeatherCard(data) {
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

  const hourEl = weatherCard.querySelector('.hour');
  const tempEl = weatherCard.querySelector('.max-temp');
  const icon = weatherCard.querySelector('img');
  const iconSrc = await getWeatherIcon(data[1], data[2]);

  hourEl.textContent = data[3];
  tempEl.textContent = data[0];
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
  forecastDisplay.appendChild(firstSectionDomEl);
  // forecastDisplay.appendChild(secondSectionDomEl);
  // forecastDisplay.appendChild(thirdSectionDomEl);

  console.log(firstSection);
}
