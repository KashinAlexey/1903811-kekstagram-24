import { deactivationFilterForm } from './filter-form.js';
import { getData } from './data.js';
import { loadingNewUserPhoto } from './user-form.js';
import { showGetDataErrMsg } from './message.js';
import { activationFilterForm } from './filter-form.js';
import { activationUserForm, validationUserForm } from './user-form.js';
import { sendData } from './data.js';
import { showSendDataErrMsg, showSendDataSuccessMsg } from './message.js';


deactivationFilterForm();

getData(activationFilterForm, showGetDataErrMsg);

loadingNewUserPhoto(
  () => activationUserForm(
    () => validationUserForm(
      () => sendData(showSendDataSuccessMsg, showSendDataErrMsg))));
