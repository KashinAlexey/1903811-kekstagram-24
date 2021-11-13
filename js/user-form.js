import { sendData } from './data.js';

const closeUserForm = () => {
  console.log('closeUserForm');
};

const setDefaulParameters = () => {
  console.log('setDefaulParameters');

  closeUserForm();
};

const validationUserForm = () => {
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

    sendData();

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

const activationUserForm = () => {
  console.log('activationUserForm');

  validationUserForm();

};

const loadingNewUserPhoto = () => {
  console.log('loadingNewUserPhoto');

  activationUserForm();
};

export { loadingNewUserPhoto };
