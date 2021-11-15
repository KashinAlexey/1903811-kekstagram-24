import {MANDATORY_TEXT, ALERT_SHOW_TIME} from './constants.js';

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntegerInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно с указанным "количеством знаков после запятой"
const getRandomFloatInclusive = (min, max, simbolsCount) => +((Math.random() * (max - min)) + min).toFixed(simbolsCount);

// Функция, возвращающая новый массив случайной длины, состоящий из неповторящихся элементов принимаего массива
const getNewRandomArray = (elements) => elements.slice(0, getRandomIntegerInclusive(1, elements.length));

// Функция, возвращающую новый элемент с тегом, классами и текстом (при наличии) для добавления в разметку
const makeElement = (tagName, classNames, text) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => {
    element.classList.add(className);
  });
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Функция валидации ввода (текста или чисел) в определнном диапазоне min и max (символов или значений) с выводом сообщений
const isInputValueInRange = (elementInput, min, max, textForMin, textForMax, isNumber) => {
  let value;

  if (isNumber) {
    value = elementInput.value;
  } else {
    value = elementInput.value.length;
  }

  if (value < min) {
    elementInput.setCustomValidity(textForMin);
  } else if (value > max) {
    elementInput.setCustomValidity(textForMax);
  } else {
    elementInput.setCustomValidity('');
  }

  elementInput.reportValidity();
};

// Функция валидации обязательного значения
const checkMandatoryValue = (elementInput) => {
  if (elementInput.validity.valueMissing) {
    elementInput.setCustomValidity(MANDATORY_TEXT);
  } else {
    elementInput.setCustomValidity('');
  }
};

// Формирование и показ блока с сообщением об ошибке загрузки данных
const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomIntegerInclusive, getRandomFloatInclusive, getNewRandomArray, makeElement, isInputValueInRange, checkMandatoryValue, showErrorAlert, debounce};
