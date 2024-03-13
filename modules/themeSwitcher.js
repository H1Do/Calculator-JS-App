export function initThemeSwitcher() {
  const themeRadios = document.querySelectorAll('.calculator__theme-switcher [type="radio"]');
  const bodyElement = document.body;

  const headerElement = document.querySelector('.calculator__header');
  const screenElement = document.querySelector('.calculator__output');

  themeRadios.forEach((radio) => {
    radio.addEventListener('change', function (event) {
      bodyElement.className = event.target.value;

      switch (event.target.value) {
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
    })
  });
}