const closeGetDataErrMsg = () => {
  console.log('closeGetDataErrMsg');
};
const onGetDataErrMsg = () => {
  console.log('onGetDataErrMsg');

  closeGetDataErrMsg();
};
const showGetDataErrMsg = () => {
  console.log('showGetDataErrMsg');

  onGetDataErrMsg();

};


const closeSendDataErrMsg = () => {
  console.log('closeSendDataErrMsg');
};
const onSendDataErrMsg = () => {
  console.log('onSendDataErrMsg');
  closeSendDataErrMsg();
};
const showSendDataErrMsg = () => {
  console.log('showSendDataErrMsg');

  onSendDataErrMsg();
};

const closeSendDataSuccessMsg = () => {
  console.log('closeSendDataSuccessMsg');
};
const onSendDataSuccessMsg = () => {
  console.log('onSendDataSuccessMsg');
  closeSendDataSuccessMsg();
};
const showSendDataSuccessMsg = () => {
  console.log('showSendDataSuccessMsg');
  onSendDataSuccessMsg();
};

export { showGetDataErrMsg, showSendDataErrMsg, showSendDataSuccessMsg };
