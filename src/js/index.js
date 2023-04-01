import {
  populateTopLeftSection,
  populateTopRightSection,
} from './dom-manipulation/populate-current-day';
import { populateDailyForecast } from './dom-manipulation/populate-daily-forecast';
import { buildHourlyData } from './data-collecting/build-hourly-data';
import { populateHourlyForecast } from './dom-manipulation/populate-hourly-forecast';
import {
  displayNextHourlySection,
  displayPreviousHourlySection,
  displaySection,
} from './hourly-nav-functionality';
import { clearErrorMsj } from './handle-wrong-location';

let location;
populateTopLeftSection();
populateTopRightSection();
populateDailyForecast();

const dailyButton = document.querySelector('.daily-button');
const hourlyButton = document.querySelector('.hourly-button');
const forecastNav = document.querySelector('.forecast-nav');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const firstDot = document.querySelector('.first-dot');
const secondDot = document.querySelector('.second-dot');
const thirdDot = document.querySelector('.third-dot');

(function getLocationFromInput() {
  const locationInput = document.querySelector('.top-left input');
  const searchIcon = document.querySelector('.top-left .magnifying-glass');

  window.addEventListener('keydown', (e) => {
    if (locationInput === document.activeElement && e.key === 'Enter') {
      location = locationInput.value;
      populateTopLeftSection(location);
      populateTopRightSection(location);
      populateDailyForecast(location);
      toggleActiveButton('daily');
      clearErrorMsj();
      locationInput.value = '';
    }
  });

  searchIcon.addEventListener('click', () => {
    location = locationInput.value;
    populateTopLeftSection(location);
    populateTopRightSection(location);
    populateDailyForecast(location);
    toggleActiveButton('daily');
    clearErrorMsj();
    locationInput.value = '';
  });
})();

function toggleActiveButton(button) {
  if (button === 'daily') {
    dailyButton.classList.add('active-button');
    hourlyButton.classList.remove('active-button');
    forecastNav.style.cssText = 'display: none';
  } else {
    hourlyButton.classList.add('active-button');
    dailyButton.classList.remove('active-button');
    forecastNav.style.cssText = 'display: flex';
  }
}

dailyButton.addEventListener('click', () => {
  toggleActiveButton('daily');
  populateDailyForecast(location);
});

hourlyButton.addEventListener('click', async () => {
  toggleActiveButton('hourly');
  const hourlyWeatherData = await buildHourlyData(location);
  populateHourlyForecast(...hourlyWeatherData);
});

arrowRight.addEventListener('click', displayNextHourlySection);
arrowLeft.addEventListener('click', displayPreviousHourlySection);
firstDot.addEventListener('click', () => displaySection(0));
secondDot.addEventListener('click', () => displaySection(1));
thirdDot.addEventListener('click', () => displaySection(2));
