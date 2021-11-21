import { STEP, MIN_SCALE_VALUE, MAX_SCALE_VALUE, FILTER, COMMENT_LENGTH } from './constants.js';
import { loadSlider, setSliderOptions, setDefaultSliderStart, destroySlider } from './slider.js';

// Переменные
const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUplodOverlay = document.querySelector('.img-upload__overlay');
const htmlBody = document.querySelector('body');
const buttonReset = document.querySelector('#upload-cancel');
const imgUploadScale = document.querySelector('.img-upload__scale');
const buttonScaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlInput = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
const hashTagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const hashCodeTemplate = /([#][a-zA-Z0-9]{1,19}[ ]*)+/;

const handlers = []; // Массив функций удаления обработчиков

// Функционал модуля
const setDefaulParameters = () => {
  imgUploadPreview.style.transform = `scale(${1.00})`;
  imgUploadPreview.style.filter = '';
  imgUploadPreview.setAttribute('class' ,'');
  handlers.forEach((handler) => handler()); // Удаляем все обработчики с формы
  form.reset();
}; // OK

const deactivationUserForm = () => {
  imgUplodOverlay.classList.add('hidden');
  htmlBody.classList.remove('modal-open');
  form.reset();
}; // OK

const validationUserForm = (callback) => {
  let currentEffect = 'none';

  const onInputComments = () => {
    if (commentInput.value.length > COMMENT_LENGTH) {
      commentInput.setCustomValidity('Длина коментария не более 140 символов');
    } else {
      commentInput.setCustomValidity('');
    }

    commentInput.reportValidity();
  }; // OK
  commentInput.addEventListener('input', onInputComments);
  handlers.push(() => commentInput.removeEventListener('input', onInputComments));

  const onInputHashTags = () => {
    const heshTags = hashCodeTemplate.exec(hashTagsInput.value); // Массив строк ввода пользователя соответствующих шаблону регулярного выражения
    let userInputs = hashTagsInput.value.split(' '); // Массив строк ввода пользователя
    const heshTagsSet = new Set(heshTags); // Массив уникальных строк соответствующих шаблону регулярного выражения
    const userInputsSet = new Set(userInputs); // Массив уникальных строк ввода пользователя

    // Начало с #
    userInputs.forEach((str) => {
      str[0] === '#' && heshTagsSet.size > 0 ? hashTagsInput.setCustomValidity('') : hashTagsInput.setCustomValidity('Не верный формат хеш-тега');
    });

    // Соответствие критериям
    if (heshTagsSet.size > 0) {
      if ([...heshTagsSet][0].length !== hashTagsInput.value.length) {
        hashTagsInput.setCustomValidity('Не верный формат хеш-тега');
      } else if (userInputsSet.size !== userInputs.length) {
        hashTagsInput.setCustomValidity('Повторяться нельзя');
      } else if (userInputs.length > 5) {
        hashTagsInput.setCustomValidity('Больше 5 нельзя');
      }
      else {
        hashTagsInput.setCustomValidity('');
      }
    }

    // Если ничего не введено
    if (hashTagsInput.value === '') {
      hashTagsInput.setCustomValidity('');
      userInputs = [];
    }

    hashTagsInput.reportValidity();
  }; // OK
  hashTagsInput.addEventListener('input', onInputHashTags); // OK
  handlers.push(() => hashTagsInput.removeEventListener('input', onInputHashTags));

  const setDefaultEffectIntensity = () => {
    imgUploadPreview.style.filter = '';
  }; // OK
  const onEffectIntensity = (value) => {
    value = value || 100;
    effectLevelInput.value = value;
    switch (currentEffect) {
      case 'none':
        return imgUploadPreview.style.filter = '';
      case 'chrome':
        return imgUploadPreview.style.filter = `grayscale(${value})`;
      case 'sepia':
        return imgUploadPreview.style.filter = `sepia(${value})`;
      case 'marvin':
        return imgUploadPreview.style.filter = `invert(${value}%)`;
      case 'phobos':
        return imgUploadPreview.style.filter = `blur(${value}px)`;
      case 'heat':
        return imgUploadPreview.style.filter = `brightness(${value})`;
    }
  }; // OK

  const onChoosingEffect = (evt) => {
    const min = FILTER[evt.target.value].min;
    const max = FILTER[evt.target.value].max;
    const step = FILTER[evt.target.value].step;

    currentEffect = evt.target.value;
    setSliderOptions(min, max, step);
    setDefaultEffectIntensity();
    imgUploadPreview.setAttribute('class' ,'');

    if (evt.target.value !== 'none') {
      imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
    }

    return evt.target.value;
  }; //OK
  effectsList.addEventListener('input', onChoosingEffect);
  handlers.push(() => effectsList.removeEventListener('input', onChoosingEffect));

  const setScaleValue = (newString, step) => {
    scaleControlInput.value = `${String(step + Number(newString))}%`;
    imgUploadPreview.style.transform = `scale(${(step + Number(newString)) / 100})`;
  };
  const onChangingSmallerScale = () => {
    const newString = scaleControlInput.value.slice(0, -1);
    if (Number(newString) - STEP >= MIN_SCALE_VALUE) {
      setScaleValue(newString, -STEP);
    }
  };
  const onChangingBiggerScale = () => {
    const newString = scaleControlInput.value.slice(0, -1);
    if (Number(newString) + STEP <= MAX_SCALE_VALUE) {
      setScaleValue(newString, STEP);
    }
  };
  buttonScaleControlSmaller.addEventListener('click', onChangingSmallerScale);
  buttonScaleControlBigger.addEventListener('click', onChangingBiggerScale);
  handlers.push(() => buttonScaleControlBigger.removeEventListener('click', onChangingBiggerScale));
  handlers.push(() => buttonScaleControlSmaller.removeEventListener('click', onChangingSmallerScale));

  const onResetUserForm = (evt) => {
    if (!document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description') && (evt.key === 'Escape' || evt.type === 'click')) {
      setDefaulParameters();
      deactivationUserForm();
    }
  }; // OK
  buttonReset.addEventListener('click', onResetUserForm);
  document.addEventListener('keydown', onResetUserForm);
  handlers.push(() => buttonReset.removeEventListener('click', onResetUserForm));
  handlers.push(() => document.removeEventListener('keydown', onResetUserForm));

  const onSubmitUserForm = (evt) => {
    evt.preventDefault();
    const dataToServer = new FormData(evt.target);
    callback(dataToServer);
  }; // OK
  form.addEventListener('submit', onSubmitUserForm);
  handlers.push(() => form.removeEventListener('submit', onSubmitUserForm));

  try {
    loadSlider((value) => onEffectIntensity(value)); // OK
  } catch (error) {
    destroySlider();
    loadSlider((value) => onEffectIntensity(value)); // OK
  }

  imgUploadEffectLevel.classList.add('hidden');
  setDefaultSliderStart();
  setDefaultEffectIntensity();
};

const activationUserForm = (callback) => {
  imgUplodOverlay.classList.remove('hidden');
  htmlBody.classList.add('modal-open');
  imgUploadPreview.src =  window.URL.createObjectURL(imgUploadInput.files[0]);
  callback();
}; //OK

const loadingNewUserPhoto = (callback) => {
  imgUploadInput.addEventListener('input', callback);
};

export { loadingNewUserPhoto, activationUserForm, validationUserForm, setDefaulParameters, deactivationUserForm};
