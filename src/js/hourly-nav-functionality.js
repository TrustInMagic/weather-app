export function displayNextHourlySection() {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot) => {
    dot.style.cssText = 'background: none';
  });

  if (sections[0].getAttribute('data-visible') === 'on') {
    sections[1].setAttribute('data-visible', 'on');
    sections[1].style.cssText = 'display: flex';
    dots[1].style.cssText = 'background: white';
    sections[0].removeAttribute('data-visible');
    sections[0].style.cssText = 'display: none';
  } else if (sections[1].getAttribute('data-visible') === 'on') {
    sections[2].setAttribute('data-visible', 'on');
    sections[2].style.cssText = 'display: flex';
    dots[2].style.cssText = 'background: white';
    sections[1].removeAttribute('data-visible');
    sections[1].style.cssText = 'display: none';
  } else if (sections[2].getAttribute('data-visible') === 'on') {
    sections[0].setAttribute('data-visible', 'on');
    sections[0].style.cssText = 'display: flex';
    dots[0].style.cssText = 'background: white';
    sections[2].removeAttribute('data-visible');
    sections[2].style.cssText = 'display: none';
  }
}

export function displayPreviousHourlySection() {
  const sections = document.querySelectorAll('.hour-section');
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot) => {
    dot.style.cssText = 'background: none';
  });

  if (sections[0].getAttribute('data-visible') === 'on') {
    sections[2].setAttribute('data-visible', 'on');
    sections[2].style.cssText = 'display: flex';
    dots[2].style.cssText = 'background: white';
    sections[0].removeAttribute('data-visible');
    sections[0].style.cssText = 'display: none';
  } else if (sections[1].getAttribute('data-visible') === 'on') {
    sections[0].setAttribute('data-visible', 'on');
    sections[0].style.cssText = 'display: flex';
    dots[0].style.cssText = 'background: white';
    sections[1].removeAttribute('data-visible');
    sections[1].style.cssText = 'display: none';
  } else if (sections[2].getAttribute('data-visible') === 'on') {
    sections[1].setAttribute('data-visible', 'on');
    sections[1].style.cssText = 'display: flex';
    dots[1].style.cssText = 'background: white';
    sections[2].removeAttribute('data-visible');
    sections[2].style.cssText = 'display: none';
  }
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
