import {
  populateTopLeftSection,
  populateTopRightSection,
} from './populate-current-day';
import { populateDailyForecast } from './populate-daily-forecast';
import { buildHourlyData } from './build-hourly-data';
import { populateHourlyForecast } from './populate-hourly-forecast';
import {
  displayNextHourlySection,
  displayPreviousHourlySection,
  displaySection
} from './hourly-nav-functionality';

let location;
populateTopLeftSection();
populateTopRightSection();
populateDailyForecast();

(function getLocationFromInput() {
  const locationInput = document.querySelector('.top-left input');
  const searchIcon = document.querySelector('.top-left .magnifying-glass');

  window.addEventListener('keydown', (e) => {
    if (locationInput === document.activeElement && e.key === 'Enter') {
      location = locationInput.value;
      populateTopLeftSection(location);
      populateTopRightSection(location);
      populateDailyForecast(location);
      locationInput.value = '';
    }
  });

  searchIcon.addEventListener('click', () => {
    location = locationInput.value;
    populateTopLeftSection(location);
    populateTopRightSection(location);
    populateDailyForecast(location);
    locationInput.value = '';
  });
})();

const dailyButton = document.querySelector('.daily-button');
const hourlyButton = document.querySelector('.hourly-button');
const forecastNav = document.querySelector('.forecast-nav');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const firstDot = document.querySelector('.first-dot');
const secondDot = document.querySelector('.second-dot');
const thirdDot = document.querySelector('.third-dot');

dailyButton.addEventListener('click', () => {
  dailyButton.classList.add('active-button');
  hourlyButton.classList.remove('active-button');
  forecastNav.style.cssText = 'display: none';
  populateDailyForecast(location);
});

hourlyButton.addEventListener('click', async () => {
  hourlyButton.classList.add('active-button');
  dailyButton.classList.remove('active-button');
  forecastNav.style.cssText = 'display: flex';
  const hourlyWeatherData = await buildHourlyData(location);
  populateHourlyForecast(...hourlyWeatherData);
});

arrowRight.addEventListener('click', displayNextHourlySection);
arrowLeft.addEventListener('click', displayPreviousHourlySection);
firstDot.addEventListener('click', () => displaySection(0));
secondDot.addEventListener('click', () => displaySection(1));
thirdDot.addEventListener('click', () => displaySection(2));
