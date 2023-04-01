import {
  getWeatherFromLocation,
  processWeatherForecastHourly,
} from './get-process-data';
import moment from 'moment';

export async function buildHourlyData(location = 'Bucharest') {
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
  let hourIncrement = 1;
  let hourMissingIncrement = 1;

  // generating the next hours of the day starting this hour + 1
  for (let i = +hour + 1; i < 24; i++) {
    const hour = moment(localTime).add(hourIncrement, 'hours').format('H');
    nextHours.push(hour);

    hourIncrement++;
  }

  const remainingHoursOfCurrentDay = nextHours.length;
  const hoursMissing = 24 - remainingHoursOfCurrentDay;

  // generating the other x hours of the next day (to reach 24 in total)
  if (nextHours.length < 24) {
    const firstHourOfNextDay = moment(localTime).add(nextHours.length, 'hours');
    for (let i = 0; i < hoursMissing; i++) {
      const hour = moment(firstHourOfNextDay)
        .add(hourMissingIncrement, 'hours')
        .format('H');
      nextHours.push(hour);

      hourMissingIncrement++;
    }
  }

  const workingData = {
    firstSection,
    secondSection,
    thirdSection,
    response,
  };
  const currentDayHours = nextHours.slice(0, remainingHoursOfCurrentDay);
  const nextDayHours = nextHours.slice(remainingHoursOfCurrentDay, 24);

  constructHourlySectionData(currentDayHours, 0, workingData);
  constructHourlySectionData(nextDayHours, 1, workingData);

  return [firstSection, secondSection, thirdSection];
}

export function constructHourlySectionData(hours, day, workingData) {
  const response = workingData.response;
  const firstSection = workingData.firstSection;
  const secondSection = workingData.secondSection;
  const thirdSection = workingData.thirdSection;

  for (let i = 0; i < hours.length; i++) {
    let hourTempC;
    let hourCondition;
    let isDay;
    let currentHour;

    [hourTempC, hourCondition, isDay, , currentHour] =
      processWeatherForecastHourly(response, day, hours[i]);

    const usefulData = [hourTempC, hourCondition, isDay, currentHour];

    while (firstSection.length < 8) {
      firstSection.push(usefulData);
      break;
    }
    while (firstSection.length === 8 && secondSection.length < 8) {
      secondSection.push(usefulData);
      break;
    }
    while (
      firstSection.length === 8 &&
      secondSection.length === 8 &&
      thirdSection.length < 8
    ) {
      thirdSection.push(usefulData);
      break;
    }
  }
}
