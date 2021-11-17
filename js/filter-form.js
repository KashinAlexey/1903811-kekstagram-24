
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const pictureContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = document.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const buttonResetBigPicture = bigPictureContainer.querySelector('.big-picture__cancel');
const buttonCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
const filterForm = document.querySelector('.img-filters');

const deactivationFilterForm = () => {
  console.log('deactivationFilterForm');
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
  let commentsCountStart = 0;
  let commentsCountEnd = 5;

  return ()=> {
    if (commentsCountEnd > comments.length) {
      commentsCountEnd = comments.length;
      buttonCommentsLoader.classList.add('hidden');
    }

    bigPictureContainer.querySelector('.show_comments-count').textContent = commentsCountEnd;
    socialCommentsContainer.innerHTML = '';
    comments.slice(commentsCountStart, commentsCountEnd).forEach((comment) => {
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      socialCommentsContainer.appendChild(commentElement);
    });
    commentsCountStart += 5;
    commentsCountEnd +=5;
  };
};

const onShowComments = (cb) => {
  cb();
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

const onEveryGettingPicture = (evt, datafromServer) => {

  datafromServer.forEach(({id, url, likes, comments, description}) => {
    if (+id === +evt.target.getAttribute('id')) {
      bigPictureContainer.querySelector('.big-picture__img').querySelector('img').src = url;
      bigPictureContainer.querySelector('.big-picture__social').querySelector('.social__caption').textContent = description;
      bigPictureContainer.querySelector('.big-picture__social').querySelector('.likes-count').textContent = likes;
      bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
      showFullSizePicture(comments);
    }
  });

}; // Ok

const showFilteredPicturesList = (datafromServer) => {
  datafromServer.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').setAttribute('id', `${id}`);
    pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = likes;
    pictureElement.addEventListener('click', (evt) => onEveryGettingPicture(evt, datafromServer));
    pictureContainer.append(pictureElement);
  });
};

const activationFilterForm = (datafromServer) => {
  console.log('activationFilterForm');
  console.log(datafromServer);

  showFilteredPicturesList(datafromServer);
};


export { deactivationFilterForm, activationFilterForm };
