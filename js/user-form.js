
const closeUserForm = () => {
  console.log('closeUserForm');
};

const setDefaulParameters = () => {
  console.log('setDefaulParameters');

  closeUserForm();
};

const validationUserForm = (cb) => {
  console.log('validationUserForm');

  const inputComments = () => {
    console.log('inputComments');
  };
  const inputHashTags = () => {
    console.log('inputHashTags');
  };
  const choosingEffect = () => {
    console.log('choosingEffect');
  };
  const setDefaultEffectIntensity = () => {
    console.log('setDefaultEffectIntensity');
  };
  const choosingEffectIntensity = () => {
    console.log('choosingEffectIntensity');
  };
  const onChangingScale = () => {
    console.log('onChangingScale');
  };
  const changingScale = () => {
    console.log('changingScale');
  };

  const onResetUserForm = () => {
    console.log('onResetUserForm');

    setDefaulParameters();
  };

  const onSubmitUserForm = () => {
    console.log('onSubmitUserForm');


    const dataToServer = 0;
    cb(dataToServer); // sendData();
  };

  inputComments();
  inputHashTags();
  choosingEffect();
  setDefaultEffectIntensity();
  choosingEffectIntensity();
  onChangingScale();
  changingScale();
  onResetUserForm();
  onSubmitUserForm();
};

const activationUserForm = (cb) => {
  console.log('activationUserForm');

  cb(); // validationUserForm();

};

const loadingNewUserPhoto = (cb) => {
  console.log('loadingNewUserPhoto');

  cb(); // activationUserForm();
};

export { loadingNewUserPhoto, activationUserForm, validationUserForm, setDefaulParameters };
