import {
  populateTopLeftSection,
  populateTopRightSection,
} from './populate-current-day';
import { populateDailyForecast } from './populate-daily-forecast';
import { populateHourlyForecast } from './populate-hourly-forecast';

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

dailyButton.addEventListener('click', () => {
  dailyButton.classList.add('active-button');
  hourlyButton.classList.remove('active-button');
  populateDailyForecast(location);
});

hourlyButton.addEventListener('click', () => {
  hourlyButton.classList.add('active-button');
  dailyButton.classList.remove('active-button');
  populateHourlyForecast();
});
