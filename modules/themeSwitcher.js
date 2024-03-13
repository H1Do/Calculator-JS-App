export function initThemeSwitcher() {
  const themeRadios = document.querySelectorAll('.calculator__theme-switcher [type="radio"]');
  const themeLabels = document.querySelectorAll('.calculator__theme-switcher label');
  const bodyElement = document.body;

  const headerElement = document.querySelector('.calculator__header');
  const screenElement = document.querySelector('.calculator__output');

  themeRadios.forEach((radioButton) => {
    radioButton.addEventListener('change', function (event) {
      themeChange(bodyElement, headerElement, screenElement, event.target.value)
    })
  });

  document.addEventListener('mouseup', handleMouseUp);
  themeLabels.forEach((switcher) => {
    switcher.addEventListener('dragstart', (event) => { event.preventDefault() })
    switcher.addEventListener('mousedown', handleMouseDown);
    switcher.addEventListener('mouseup', handleMouseUp);
    switcher.addEventListener('mouseover', handleMouserOver);
  })

  let isDragging = false;

  function handleMouseDown(event) {
    isDragging = true;
    event.target.click();
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleMouserOver(event) {
    if (isDragging) {
      event.target.click();
    }
  }
}

function themeChange(bodyElement, headerElement, screenElement, theme) {
  bodyElement.className = theme;

  switch (theme) {
    case 'theme1':
      headerElement.style.removeProperty('--second-font-color');
      screenElement.style.removeProperty('--second-font-color');
      break;
    case 'theme2':
      headerElement.style.setProperty('--second-font-color', 'hsl(60, 10%, 19%)');
      screenElement.style.setProperty('--second-font-color', 'hsl(60, 10%, 19%)');
      break;
    case 'theme3':
      headerElement.style.setProperty('--second-font-color', 'hsl(52, 100%, 62%)');
      screenElement.style.setProperty('--second-font-color', 'hsl(52, 100%, 62%)');
      break;
  }
}

