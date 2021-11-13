const deactivationFilterForm = () => {
  console.log('deactivationFilterForm');
};

const showFullSizePicture = () => {
  console.log('showFullSizePicture');
};
const onEveryGettingPicture = () => {
  console.log('onEveryGettingPicture');

  showFullSizePicture();
};
const showFilteredPicturesList = () => {
  console.log('showFilteredPicturesList');

  onEveryGettingPicture();
};
const activationFilterForm = () => {
  console.log('activationFilterForm');

  showFilteredPicturesList();
};


const showComments = () => {
  console.log('showComments');
};
const onShowComments = () => {
  console.log('onShowComments');

  showComments();
};

const closeFullSizePicture = () => {
  console.log('closeFullSizePicture');
};
const onFullSizePicture = () => {
  console.log('onFullSizePicture');

  closeFullSizePicture();
};

export { deactivationFilterForm, activationFilterForm };
