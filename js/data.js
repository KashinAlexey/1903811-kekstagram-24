import { activationFilterForm } from './filter-form.js';
import { showGetDataErrMsg, showSendDataErrMsg, showSendDataSuccessMsg } from './message.js';

const getData = () => {
  console.log('getData');

  // Success
  activationFilterForm();

  // Error
  showGetDataErrMsg();
};

const sendData = () => {
  console.log('sendData');

  // Success
  showSendDataSuccessMsg();

  // Error
  showSendDataErrMsg();
};

export { getData, sendData };
