import { deactivateFilterForm } from './filter-form.js';
import { getData } from './data.js';
import { loadNewUserPhoto } from './user-form.js';
import { showGetDataErrMsg } from './message.js';
import { activateFilterForm } from './filter-form.js';
import { activateUserForm, validateUserForm } from './user-form.js';
import { sendData } from './data.js';
import { showSendDataErrMsg, showSendDataSuccessMsg } from './message.js';

deactivateFilterForm();

getData(activateFilterForm, showGetDataErrMsg);

loadNewUserPhoto(
  () => activateUserForm(
    () => validateUserForm(
      (dataToServer) => sendData(dataToServer, showSendDataSuccessMsg, showSendDataErrMsg))));
