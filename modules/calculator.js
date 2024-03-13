export function initCalculator() {
  const calculatorButtons = document.querySelector('.calculator__buttons');
  const calculatorScreen = document.querySelector('.calculator__output');

  let calculatorState = {
    currentValue: '0',
    prevValue: '0',
    currentOperation: '',
    isFloat: false,
  }

  calculatorButtons.addEventListener('click', function (event) {
    calculatorState = handleClick(event, calculatorState);
    screenRender(calculatorScreen, calculatorState);
  })
}

function handleClick(event, { currentValue, prevValue, currentOperation, isFloat }) {
  switch (event.target.value) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      currentValue = (currentValue === '0' ? '' : currentValue) + event.target.value;
      break;
    case 'DEL':
      if (currentValue.at(-1) === '.') {
        isFloat = false;
      }
      currentValue = currentValue.slice(0, -1) || '0';
      break;
    case 'RESET':
      currentValue = '0';
      prevValue = '0';
      currentOperation = '';
      isFloat = false;
      break;
    case '.':
      currentValue += !isFloat ? '.' : '';
      isFloat = true;
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      prevValue = currentValue;
      currentValue = '0';
      currentOperation = event.target.value;
      isFloat = false;
      break;
    case '=':
      let current = Number(currentValue);
      let prev = Number(prevValue);

      currentValue = String((currentOperation === '+') ? current + prev :
        (currentOperation === '-') ? prev - current :
          (currentOperation === '*') ? current * prev :
            (currentOperation === '/') ? prev / current : current);

      isFloat = !isInt(Number(currentValue));
      currentOperation = '';
      prevValue = '0';
      break;
  }

  return { currentValue, prevValue, currentOperation, isFloat };
}

function screenRender(screenElement, { currentValue }) {
  if (currentValue.length > 12) {
    screenElement.textContent = Number(currentValue).toExponential(7);
  } else {
    screenElement.textContent = currentValue;
  }
}

function isInt(number) {
  return Number(number) === number && number % 1 === 0;
}