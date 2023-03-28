/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/get-and-process-data.js":
/*!****************************************!*\
  !*** ./src/js/get-and-process-data.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeatherFromLocation": () => (/* binding */ getWeatherFromLocation),
/* harmony export */   "processWeatherDataCurrentDay": () => (/* binding */ processWeatherDataCurrentDay)
/* harmony export */ });
async function getWeatherFromLocation(
  location,
  type = 'forecast',
  days = '8'
) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/${type}.json?key=b799deac1aed4f0b980145810232703&q=${location}&days=${days}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log(`OOPS ${error}`);
  }
}

async function getWeatherConditions() {
  const response = await fetch('./assets/weather_conditions.json');
  const weatherConditions = await response.json();

  return weatherConditions;
}

async function processWeatherDataCurrentDay(data) {
  const awaitedData = await data;

  const condition = awaitedData.current.condition.text;
  const location = awaitedData.location.name;
  const dateHour = awaitedData.location.localtime;
  const tempC = awaitedData.current.temp_c;
  const feelsLikeC = awaitedData.current.feelslike_c;
  const humidity = awaitedData.current.humidity;
  const windSpeed = awaitedData.current.wind_kph;
  const chanceOfRain =
    awaitedData.forecast.forecastday[0].day.daily_chance_of_rain;
  const isDay = awaitedData.current.is_day;

  return [
    condition,
    location,
    dateHour,
    tempC,
    feelsLikeC,
    humidity,
    windSpeed,
    chanceOfRain,
    isDay,
  ];
}

function processWeatherForecastSpecificDate(data, day) {
  // day = 0 is today; day = 1 is tomorrow, etc;
  const maxTempC = data.forecast.forecastday[day].day.maxtemp_c;
  const minTempC = data.forecast.forecastday[day].day.mintemp_c;
  const dayCondition = data.forecast.forecastday[day].day.condition.text;

  return [maxTempC, minTempC, dayCondition];
}

function processWeatherForecastHourly(data, hour) {
  const hourTempC = data.forecast.forecastday[0].hour[hour];
  const hourCondition = data.forecast.forecastday[0].hour[hour].condition.text;

  return [hourTempC, hourCondition];
}

async function getWeatherIcon(data, condition, isDay) {
  const awaitedData = await data;
  let iconCode;
  let iconSrc;

  for (let i = 0; i < awaitedData.length; i++) {
    if (awaitedData[i].day === condition) {
      iconCode = awaitedData[i].icon;
    }
  }

  if (isDay) {
    iconSrc = `./assets/weather/64x64/day/${iconCode}.png`;
  } else iconSrc = `./assets/weather/64x64/night/${iconCode}.png`;

  const icon = new Image();
  icon.src = iconSrc;

  return icon;
}


/***/ }),

/***/ "./src/js/populate-current-day.js":
/*!****************************************!*\
  !*** ./src/js/populate-current-day.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populateLeftSection": () => (/* binding */ populateLeftSection)
/* harmony export */ });
/* harmony import */ var _get_and_process_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-and-process-data */ "./src/js/get-and-process-data.js");


function populateLeftSection() {
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


  const weatherData = (0,_get_and_process_data__WEBPACK_IMPORTED_MODULE_0__.getWeatherFromLocation)('Bali');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _populate_current_day__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./populate-current-day */ "./src/js/populate-current-day.js");


(0,_populate_current_day__WEBPACK_IMPORTED_MODULE_0__.populateLeftSection)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEtBQUssOENBQThDLFNBQVMsUUFBUSxLQUFLO0FBQy9HLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osd0JBQXdCLE1BQU07QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQsSUFBSSwrQ0FBK0MsU0FBUzs7QUFFNUQ7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkZnQzs7QUFFekI7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUEsR0FBRzs7O0FBR0gsc0JBQXNCLDZFQUFzQjtBQUM1Qzs7Ozs7OztVQ3ZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZEOztBQUU3RCwwRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9nZXQtYW5kLXByb2Nlc3MtZGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9wb3B1bGF0ZS1jdXJyZW50LWRheS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRnJvbUxvY2F0aW9uKFxuICBsb2NhdGlvbixcbiAgdHlwZSA9ICdmb3JlY2FzdCcsXG4gIGRheXMgPSAnOCdcbikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS8ke3R5cGV9Lmpzb24/a2V5PWI3OTlkZWFjMWFlZDRmMGI5ODAxNDU4MTAyMzI3MDMmcT0ke2xvY2F0aW9ufSZkYXlzPSR7ZGF5c31gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBPT1BTICR7ZXJyb3J9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckNvbmRpdGlvbnMoKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy4vYXNzZXRzL3dlYXRoZXJfY29uZGl0aW9ucy5qc29uJyk7XG4gIGNvbnN0IHdlYXRoZXJDb25kaXRpb25zID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gIHJldHVybiB3ZWF0aGVyQ29uZGl0aW9ucztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyRGF0YUN1cnJlbnREYXkoZGF0YSkge1xuICBjb25zdCBhd2FpdGVkRGF0YSA9IGF3YWl0IGRhdGE7XG5cbiAgY29uc3QgY29uZGl0aW9uID0gYXdhaXRlZERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcbiAgY29uc3QgbG9jYXRpb24gPSBhd2FpdGVkRGF0YS5sb2NhdGlvbi5uYW1lO1xuICBjb25zdCBkYXRlSG91ciA9IGF3YWl0ZWREYXRhLmxvY2F0aW9uLmxvY2FsdGltZTtcbiAgY29uc3QgdGVtcEMgPSBhd2FpdGVkRGF0YS5jdXJyZW50LnRlbXBfYztcbiAgY29uc3QgZmVlbHNMaWtlQyA9IGF3YWl0ZWREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2M7XG4gIGNvbnN0IGh1bWlkaXR5ID0gYXdhaXRlZERhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgY29uc3Qgd2luZFNwZWVkID0gYXdhaXRlZERhdGEuY3VycmVudC53aW5kX2twaDtcbiAgY29uc3QgY2hhbmNlT2ZSYWluID1cbiAgICBhd2FpdGVkRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XG4gIGNvbnN0IGlzRGF5ID0gYXdhaXRlZERhdGEuY3VycmVudC5pc19kYXk7XG5cbiAgcmV0dXJuIFtcbiAgICBjb25kaXRpb24sXG4gICAgbG9jYXRpb24sXG4gICAgZGF0ZUhvdXIsXG4gICAgdGVtcEMsXG4gICAgZmVlbHNMaWtlQyxcbiAgICBodW1pZGl0eSxcbiAgICB3aW5kU3BlZWQsXG4gICAgY2hhbmNlT2ZSYWluLFxuICAgIGlzRGF5LFxuICBdO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzV2VhdGhlckZvcmVjYXN0U3BlY2lmaWNEYXRlKGRhdGEsIGRheSkge1xuICAvLyBkYXkgPSAwIGlzIHRvZGF5OyBkYXkgPSAxIGlzIHRvbW9ycm93LCBldGM7XG4gIGNvbnN0IG1heFRlbXBDID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtkYXldLmRheS5tYXh0ZW1wX2M7XG4gIGNvbnN0IG1pblRlbXBDID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtkYXldLmRheS5taW50ZW1wX2M7XG4gIGNvbnN0IGRheUNvbmRpdGlvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbZGF5XS5kYXkuY29uZGl0aW9uLnRleHQ7XG5cbiAgcmV0dXJuIFttYXhUZW1wQywgbWluVGVtcEMsIGRheUNvbmRpdGlvbl07XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyRm9yZWNhc3RIb3VybHkoZGF0YSwgaG91cikge1xuICBjb25zdCBob3VyVGVtcEMgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaG91cl07XG4gIGNvbnN0IGhvdXJDb25kaXRpb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaG91cl0uY29uZGl0aW9uLnRleHQ7XG5cbiAgcmV0dXJuIFtob3VyVGVtcEMsIGhvdXJDb25kaXRpb25dO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVySWNvbihkYXRhLCBjb25kaXRpb24sIGlzRGF5KSB7XG4gIGNvbnN0IGF3YWl0ZWREYXRhID0gYXdhaXQgZGF0YTtcbiAgbGV0IGljb25Db2RlO1xuICBsZXQgaWNvblNyYztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGF3YWl0ZWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGF3YWl0ZWREYXRhW2ldLmRheSA9PT0gY29uZGl0aW9uKSB7XG4gICAgICBpY29uQ29kZSA9IGF3YWl0ZWREYXRhW2ldLmljb247XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzRGF5KSB7XG4gICAgaWNvblNyYyA9IGAuL2Fzc2V0cy93ZWF0aGVyLzY0eDY0L2RheS8ke2ljb25Db2RlfS5wbmdgO1xuICB9IGVsc2UgaWNvblNyYyA9IGAuL2Fzc2V0cy93ZWF0aGVyLzY0eDY0L25pZ2h0LyR7aWNvbkNvZGV9LnBuZ2A7XG5cbiAgY29uc3QgaWNvbiA9IG5ldyBJbWFnZSgpO1xuICBpY29uLnNyYyA9IGljb25TcmM7XG5cbiAgcmV0dXJuIGljb247XG59XG4iLCJpbXBvcnQge1xuICBnZXRXZWF0aGVyRnJvbUxvY2F0aW9uLFxuICBwcm9jZXNzV2VhdGhlckRhdGFDdXJyZW50RGF5LFxufSBmcm9tICcuL2dldC1hbmQtcHJvY2Vzcy1kYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlTGVmdFNlY3Rpb24oKSB7XG4gIGNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9wLWxlZnQgaW5wdXQnKTtcbiAgY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3AtbGVmdCAubWFnbmlmeWluZy1nbGFzcycpO1xuICBsZXQgbG9jYXRpb247XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIGlmIChsb2NhdGlvbklucHV0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uSW5wdXQudmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBzZWFyY2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxvY2F0aW9uID0gbG9jYXRpb25JbnB1dC52YWx1ZVxuXG4gIH0pXG5cblxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJGcm9tTG9jYXRpb24oJ0JhbGknKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcG9wdWxhdGVMZWZ0U2VjdGlvbiB9IGZyb20gJy4vcG9wdWxhdGUtY3VycmVudC1kYXknO1xuXG5wb3B1bGF0ZUxlZnRTZWN0aW9uKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=