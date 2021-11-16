import { STEP, MIN_SCALE_VALUE, MAX_SCALE_VALUE, Filter } from './constants.js';
import { disableSlider, enableSlider, loadSlider, setSliderOptions, destroySlider } from './slider.js';

// Переменные
const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('#upload-file');
const imgUplodOverlay = document.querySelector('.img-upload__overlay');
const htmlBody = document.querySelector('body');
const buttonReset = document.querySelector('#upload-cancel');
const buttonSubmit = document.querySelector('#upload-submit');
const imgUploadScale = document.querySelector('.img-upload__scale');
const buttonScaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlInput = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
const hashTagsInput = document.querySelector('.text__hashtags');

const hashCodeTemplate = /([#][a-zA-Z0-9]{1,19}[ ]*)+/; //new RegExp('([#][a-zA-Z0-9]{0,18})+(\\W|$)', 'g'); // /([#][a-zA-Z0-9]{0,18})+(\W|$)/;

// Функционал модуля

const deactivationUserForm = (evt) => {
  // Внутренняя логика
  if ((!document.activeElement.classList.contains('text__hashtags')) && (evt.key === 'Escape' || evt.type === 'click')) {
    destroySlider();
    imgUplodOverlay.classList.add('hidden');
    htmlBody.classList.remove('modal-open');
    buttonReset.removeEventListener('click', deactivationUserForm);
    document.removeEventListener('keydown', deactivationUserForm);
  }
}; //OK

const setDefaulParameters = () => {
  console.log('setDefaulParameters');
  imgUploadPreview.style.transform = `scale(${1.00})`;
  imgUploadPreview.style.filter = '';
  disableSlider();
};

const validationUserForm = (cb) => {
  console.log('validationUserForm');
  let currentEffect = 'none';
  let heshTagInputArray;

  const inputComments = () => {
    console.log('inputComments');
  };

  const onInputHashTags = () => {

    heshTagInputArray = hashCodeTemplate.exec(hashTagsInput.value);

    try {
      if (hashTagsInput.value.match(/[#]/g).length <= 5) {
        if (!(heshTagInputArray === undefined || heshTagInputArray === null)) {
          heshTagInputArray[0].length === hashTagsInput.value.length ? hashTagsInput.setCustomValidity('') : hashTagsInput.setCustomValidity('Не верный формат хэш-тэга');
        } else {
          hashTagsInput.setCustomValidity('Не верный формат хэш-тэга');
        }
      } else {
        hashTagsInput.setCustomValidity('Больше 5 хеш-тегов нельзя!');
      }
    } catch (error) {
      hashTagsInput.setCustomValidity('Не верный формат хэш-тэга');
    }

    const arrayOfStrings = hashTagsInput.value.split(' ');

    arrayOfStrings.forEach((arr) => {

      let vol = 0;
      if (arr !== '') {
        for (let count = 0; count < arrayOfStrings.length; count ++) {
          if (arrayOfStrings[count] === arr) {
            vol++;
          }
        }

        if (vol > 1) {
          hashTagsInput.setCustomValidity('Повторяться нельзя');
        }
      } else {
        for (let count = 0; count < arrayOfStrings.length; count ++) {
          if (arrayOfStrings[count] === arr) {
            vol++;
          }
        }

        if (vol > 1) {
          hashTagsInput.setCustomValidity('Одного пробела достаточно');
        }
      }
    });

    hashTagsInput.reportValidity();
  }; // OK
  hashTagsInput.addEventListener('input', onInputHashTags); // OK

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
  loadSlider((value) => onEffectIntensity(value)); // OK

  const setEffect = (evt) => {
    const min = Filter[evt.target.value].min;
    const max = Filter[evt.target.value].max;
    const step = Filter[evt.target.value].step;

    currentEffect = evt.target.value;
    setSliderOptions(min, max, step);
    setDefaultEffectIntensity();
    if (imgUploadPreview.className) {
      imgUploadPreview.classList.remove(imgUploadPreview.className);
    }

    if (evt.target.value !== 'none') {
      imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
      enableSlider();
    } else {
      disableSlider();
    }

    return evt.target.value;
  }; //OK
  const onChoosingEffect = () => {
    effectsList.addEventListener('input', (evt) => {
      currentEffect = setEffect(evt);
    });
  }; // OK

  const changingScale = (evt) => {
    const isBigger = evt.target.classList.contains('scale__control--bigger');

    let newString = '';
    for (let count = 0; count < scaleControlInput.value.length - 1; count++) {
      newString = newString + scaleControlInput.value[count];
    }

    if (isBigger && (Number(newString) + STEP) <= MAX_SCALE_VALUE) {
      scaleControlInput.value = `${String(STEP + Number(newString))}%`;
      imgUploadPreview.style.transform = `scale(${(STEP + Number(newString)) / 100})`;
    } else if (!isBigger && (Number(newString) - STEP) >= MIN_SCALE_VALUE) {
      scaleControlInput.value = `${String(Number(newString) - STEP)}%`;
      imgUploadPreview.style.transform = `scale(${(Number(newString) - STEP) / 100})`;
    }
  }; // OK
  const onChangingScale = () => {
    buttonScaleControlSmaller.addEventListener('click', changingScale);
    buttonScaleControlBigger.addEventListener('click', changingScale);
  }; //OK

  const onResetUserForm = () => {
    buttonReset.addEventListener('click', deactivationUserForm);
    document.addEventListener('keydown', deactivationUserForm);
    setDefaulParameters();
  }; // OK

  const onSubmitUserForm = () => {
    buttonSubmit.addEventListener('click', (evt) => {
      //evt.preventDefault();
      console.log('onSubmitUserForm');

      console.log(form);

      const dataToServer = new FormData(evt.target);

      console.log(dataToServer);
      //sendData(dataToServer);
      //cb(dataToServer); // sendData();
    });
  }; // OK

  setDefaulParameters();

  inputComments();
  //inputHashTags();

  onChoosingEffect();
  setDefaultEffectIntensity();

  onChangingScale();

  onResetUserForm();
  onSubmitUserForm();
};

const activationUserForm = (cb) => {
  imgUplodOverlay.classList.remove('hidden');
  htmlBody.classList.add('modal-open');

  cb(); // validationUserForm()
}; //OK

const loadingNewUserPhoto = (cb) => {
  imgUploadInput.addEventListener('input', cb);
}; // TODO Added real photo

export { loadingNewUserPhoto, activationUserForm, validationUserForm, setDefaulParameters };
