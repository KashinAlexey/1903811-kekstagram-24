import { shuffle, debounce } from './util.js';
import { COMMENT_SHOW_NUMBER, NUMBER_OF_RANDOM_PHOTOS, TIME_DELAY } from './constants.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const pictureContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = document.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const buttonResetBigPicture = bigPictureContainer.querySelector('.big-picture__cancel');
const buttonCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
const filterForm = document.querySelector('.img-filters');
const buttonsFilterForm = filterForm.querySelectorAll('button');


const deactivateFilterForm = () => {
  filterForm.classList.add('img-filters--inactive');
};

const closeFullSizePicture = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');
}; //OK
const onFullSizePicture = (evt) => {
  if (evt.key === 'Escape' || evt.type === 'click') {
    evt.preventDefault();
    closeFullSizePicture();
    document.removeEventListener('keydown', onFullSizePicture);
    buttonResetBigPicture.removeEventListener('click', onFullSizePicture);
  }
};

const showComments = (comments) => {
  let commentsCountEnd = comments.length >= COMMENT_SHOW_NUMBER ? COMMENT_SHOW_NUMBER : comments.length;

  return ()=> {
    socialCommentsContainer.innerHTML = '';

    if (commentsCountEnd >= comments.length) {
      commentsCountEnd = comments.length;
      buttonCommentsLoader.classList.add('hidden');
    } else {
      buttonCommentsLoader.classList.remove('hidden');
    }

    bigPictureContainer.querySelector('.show_comments-count').textContent = commentsCountEnd;

    comments.slice(0, commentsCountEnd).forEach((comment) => {
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      socialCommentsContainer.appendChild(commentElement);
    });
    commentsCountEnd += COMMENT_SHOW_NUMBER;
  };
}; // OK
const onShowComments = (callback) => {
  callback();
}; //OK

const showFullSizePicture = (comments) => {
  const showNewComments = showComments(comments);

  bodyElement.classList.add('modal-open');
  bigPictureContainer.classList.remove('hidden');
  showNewComments();

  buttonResetBigPicture.addEventListener('click', onFullSizePicture);
  document.addEventListener('keydown', onFullSizePicture);
  buttonCommentsLoader.addEventListener('click', () => onShowComments(showNewComments));
}; //OK

const onEveryGettingPicture = (evt, dataFromServer) => {

  dataFromServer.forEach(({id, url, likes, comments, description}) => {
    if (+id === +evt.target.getAttribute('id')) {
      bigPictureContainer.querySelector('.big-picture__img').querySelector('img').src = url;
      bigPictureContainer.querySelector('.big-picture__social').querySelector('.social__caption').textContent = description;
      bigPictureContainer.querySelector('.big-picture__social').querySelector('.likes-count').textContent = likes;
      bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
      showFullSizePicture(comments);
    }
  });

}; // Ok

const showFilteredPicturesList = (dataFromServer) => {

  const elements = pictureContainer.querySelectorAll('.picture');
  for (const element of elements) {
    element.remove();
  }

  dataFromServer.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').setAttribute('id', `${id}`);
    pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = likes;
    pictureElement.addEventListener('click', (evt) => onEveryGettingPicture(evt, dataFromServer));
    pictureContainer.append(pictureElement);
  });
}; //OK

const onActivationFilterForm = (evt, dataFromServer, callback) => {

  const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

  const newDataArray = dataFromServer.slice();
  for (const button of buttonsFilterForm) {
    button.classList.remove('img-filters__button--active');
  }

  const getFilteredData = () => {
    switch (evt.currentTarget.getAttribute('id')) {
      case 'filter-default':
        evt.target.classList.add('img-filters__button--active');
        return newDataArray;
      case 'filter-random':
        shuffle(newDataArray);
        evt.target.classList.add('img-filters__button--active');
        return newDataArray.slice(0, NUMBER_OF_RANDOM_PHOTOS);
      case 'filter-discussed':
        newDataArray.sort(comparePictures);
        evt.target.classList.add('img-filters__button--active');
        return newDataArray;
    }
  };

  callback(getFilteredData());

}; // OK

const activateFilterForm = (dataFromServer) => {
  filterForm.classList.remove('img-filters--inactive');
  showFilteredPicturesList(dataFromServer);

  for (const button of buttonsFilterForm) {
    button.addEventListener('click', (evt) => {
      onActivationFilterForm(evt, dataFromServer, debounce((data) => showFilteredPicturesList(data), TIME_DELAY));
    });
  }
}; // OK


export { deactivateFilterForm, activateFilterForm };
