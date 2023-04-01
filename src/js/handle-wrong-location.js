export function handleWrongLocation() {
  const inputError = document.querySelector('.input-error');
  inputError.innerHTML = 'Location not found. <br> Search must be in the form of "City", "City, State" or "City, Country".'
}

export function clearErrorMsj() {
  const inputError = document.querySelector('.input-error');
  inputError.innerHTML = '';
}