// Пути к серверу
const SEND_URL = 'https://24.javascript.pages.academy/kekstagram';
const GET_URL = 'https://24.javascript.pages.academy/kekstagram/data';

// Параметры масштаба
const STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

// Параметры слайдера
const SLIDER_START_DEFAULT = 100;

// Длина коментария
const COMMENT_LENGTH = 140;
// Количество показываемых коментариев
const COMMENT_SHOW_NUMBER = 5;

// Максимальное число хеш-тегов
const MAX_HESH_TAG_NUMBER = 5;

// Количество случайных фото
const NUMBER_OF_RANDOM_PHOTOS = 10;

// Задержка времнени отображения
const TIME_DELAY = 500;

// Список значений фильтра
const FILTER = {
  none: {
    min: 0,
    max: 100,
    step: 1,
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

export { SEND_URL, GET_URL, STEP, MIN_SCALE_VALUE, MAX_SCALE_VALUE, SLIDER_START_DEFAULT, FILTER, COMMENT_LENGTH, MAX_HESH_TAG_NUMBER, COMMENT_SHOW_NUMBER, NUMBER_OF_RANDOM_PHOTOS, TIME_DELAY };
