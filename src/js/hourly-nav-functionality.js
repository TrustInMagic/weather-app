export function displayNextHourlySection() {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot) => {
    dot.style.cssText = 'background: none';
  });

  if (sections[0].getAttribute('data-visible') === 'on') {
    toggleActiveSection(1, 0);
  } else if (sections[1].getAttribute('data-visible') === 'on') {
    toggleActiveSection(2, 1)
  } else if (sections[2].getAttribute('data-visible') === 'on') {
    toggleActiveSection(0, 2)
  }
}

export function displayPreviousHourlySection() {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot) => {
    dot.style.cssText = 'background: none';
  });

  if (sections[0].getAttribute('data-visible') === 'on') {
    toggleActiveSection(2, 0)
  } else if (sections[1].getAttribute('data-visible') === 'on') {
    toggleActiveSection(0, 1)
  } else if (sections[2].getAttribute('data-visible') === 'on') {
    toggleActiveSection(1, 2)
  }
}

function toggleActiveSection(active, inactive) {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  sections[active].setAttribute('data-visible', 'on');
  sections[active].style.cssText = 'display: flex';
  dots[active].style.cssText = 'background: white';
  sections[inactive].removeAttribute('data-visible');
  sections[inactive].style.cssText = 'display: none';
}

export function displaySection(number) {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  sections.forEach((section) => {
    section.style.cssText = 'display: none';
    section.removeAttribute('data-visible');
  });
  dots.forEach((dot) => {
    dot.style.cssText = 'background: none';
  });

  sections[number].setAttribute('data-visible', 'on');
  sections[number].style.cssText = 'display: flex';
  dots[number].style.cssText = 'background-color: white';
}
