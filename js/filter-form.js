
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const pictureContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = document.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const buttonResetBigPicture = bigPictureContainer.querySelector('.big-picture__cancel');

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

const showFullSizePicture = (comments) => {
  console.log('showFullSizePicture');
  bodyElement.classList.add('modal-open');
  bigPictureContainer.classList.remove('hidden');

  buttonResetBigPicture.addEventListener('click', onFullSizePicture);
  document.addEventListener('keydown', onFullSizePicture);

  console.log(comments);
  socialCommentsContainer.innerHTML = '';
  
  comments.forEach((comment) => {



    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialCommentsContainer.appendChild(commentElement);



  });



};
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


const showComments = () => {
  console.log('showComments');
};
const onShowComments = () => {
  console.log('onShowComments');

  showComments();
};



export { deactivationFilterForm, activationFilterForm };
