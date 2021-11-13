const getData = (activationFilterForm, showGetDataErrMsg) => {
  console.log('getData');

  // Success
  activationFilterForm();

  // Error
  showGetDataErrMsg();
};

const sendData = (showSendDataSuccessMsg, showSendDataErrMsg) => {
  console.log('sendData');

  // Success
  showSendDataSuccessMsg();

  // Error
  showSendDataErrMsg();
};

export { getData, sendData };
