import {
  getWeatherFromLocation,
  processWeatherDataCurrentDay,
} from './get-and-process-data';

export function populateLeftSection() {
  const locationInput = document.querySelector('.top-left input');
  const searchIcon = document.querySelector('.top-left .magnifying-glass');
  let location;

  window.addEventListener('keydown', (e) => {
    if (locationInput === document.activeElement && e.key === 'Enter') {
      location = locationInput.value;
    }
  });

  searchIcon.addEventListener('click', () => {
    location = locationInput.value

  })


  const weatherData = getWeatherFromLocation('Bali');
}
