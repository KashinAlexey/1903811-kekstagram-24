import { SLIDER_START_DEFAULT } from './constants.js';
const slider = document.querySelector('.effect-level__slider');

const loadSlider = (callback) => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: SLIDER_START_DEFAULT,
    step: 1,
    connect: 'lower', // сторона изменения цвета слайдера
    format: { // Форматирование числа
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  slider.noUiSlider.on('update', (values, handle) => {
    callback(values[handle]);
  });
};

const setDefaultSliderStart = () => {
  slider.noUiSlider.set(SLIDER_START_DEFAULT);
};

const setSliderOptions = (min, max, step) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
};

const disableSlider = () => {
  slider.setAttribute('disabled', true);
};

const enableSlider =() => {
  slider.removeAttribute('disabled');
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
};

export { loadSlider, destroySlider, setDefaultSliderStart, setSliderOptions, disableSlider, enableSlider };
