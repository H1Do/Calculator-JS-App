export function initCalculator() {
  const calculatorButtons = document.querySelector('.calculator__buttons');
  const calculatorScreen = document.querySelector('.calculator__output');

  let calculatorState = {
    currentValue: 0,
    prevValue: 0,
    currentOperation: '',
    isFloat: false,
    isDotAppearing: false,
  }

  calculatorButtons.addEventListener('click', function (event) {
    calculatorState = handleClick(event, calculatorState);
    screenRender(calculatorScreen, calculatorState);
  })
}

function handleClick(event, { currentValue, prevValue, currentOperation, isFloat, isDotAppearing }) {
  if (!isNaN(event.target.value)) {
    if (isDotAppearing) {
      currentValue = currentValue + Number(event.target.value) / 10;
      isDotAppearing = false;
      isFloat = true;
    } else if (isFloat) {
      currentValue = Number(String(currentValue) + event.target.value);
    } else {
      currentValue = currentValue * 10 + Number(event.target.value);
    }
  } else {
    switch (event.target.value) {
      case 'DEL':
        if (isFloat) {
          if (String(currentValue).at(-2) === '.') {
            isFloat = false;
          }
          currentValue = Number(String(currentValue).slice(0, -1));
        } else {
          currentValue = Math.trunc(currentValue / 10);
        }
        break;
      case 'RESET':
        currentValue = 0;
        prevValue = 0;
        currentOperation = '';
        isFloat = false;
        isDotAppearing = false;
        break;
      case '.':
        if (!isFloat && !isDotAppearing) {
          isDotAppearing = true;
          isFloat = true;
        }
        break;
      case '+':
        prevValue = currentValue;
        currentValue = 0;
        currentOperation = '+';
        break;
      case '-':
        prevValue = currentValue;
        currentValue = 0;
        currentOperation = '-';
        break;
      case '*':
        prevValue = currentValue;
        currentValue = 0;
        currentOperation = '*';
        break;
      case '/':
        prevValue = currentValue;
        currentValue = 0;
        currentOperation = '/';
        break;
      case '=':
        currentValue = (currentOperation === '+') ? currentValue + prevValue :
          (currentOperation === '-') ? prevValue - currentValue :
            (currentOperation === '*') ? currentValue * prevValue :
              (currentOperation === '/') ? prevValue / currentValue : currentValue;
        if (!isInt(currentValue)) {
          isFloat = true;
        }
        break;
    }
  }
  return { currentValue, prevValue, currentOperation, isFloat, isDotAppearing };
}

function screenRender(screenElement, { currentValue, isDotAppearing }) {
  screenElement.textContent = (String(currentValue) + (isDotAppearing ? '.' : ''));
  console.log(isDotAppearing);
}

function isInt(number) {
  return Number(number) === number && number % 1 === 0;
}