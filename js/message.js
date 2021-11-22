import { setDefaulParameters, deactivateUserForm } from './user-form.js';

// Переменные
let errMsgContainerForGetData;
const errMsgContainerForSendData = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const butttonCloseErrMsgContainerForSendData = errMsgContainerForSendData.querySelector('.error__button');
const successMsgContainerForSendData = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const butttonCloseSuccessMsgContainerForSendData = successMsgContainerForSendData.querySelector('.success__button');

// Функционал модуля
const closeGetDataErrMsg = () => {
  errMsgContainerForGetData.remove();
}; // OK
const onGetDataErrMsg = (evt) => {
  if (evt.key || evt.type === 'click') {
    evt.preventDefault();
    closeGetDataErrMsg();
    document.removeEventListener('keydown', onGetDataErrMsg);
    document.removeEventListener('click', onGetDataErrMsg);
  }
}; // OK
const showGetDataErrMsg = () => {
  // Переменные
  errMsgContainerForGetData = document.createElement('div');

  // логика
  errMsgContainerForGetData.style.zIndex = '100';
  errMsgContainerForGetData.style.position = 'absolute';
  errMsgContainerForGetData.style.left = '0';
  errMsgContainerForGetData.style.top = '0';
  errMsgContainerForGetData.style.right = '0';
  errMsgContainerForGetData.style.padding = '10px 3px';
  errMsgContainerForGetData.style.fontSize = '30px';
  errMsgContainerForGetData.style.textAlign = 'center';
  errMsgContainerForGetData.style.backgroundColor = 'red';
  errMsgContainerForGetData.textContent = 'Не удалось загрузить данные с сервера';

  document.body.append(errMsgContainerForGetData);

  document.addEventListener('keydown', onGetDataErrMsg);
  document.addEventListener('click', onGetDataErrMsg);
}; // OK

const closeSendDataErrMsg = () => {
  errMsgContainerForSendData.remove();
}; // OK
const onSendDataErrMsg = (evt) => {
  if (evt.key === 'Escape' || (evt.type === 'click' && evt.target.className !== 'error__inner')) {
    closeSendDataErrMsg();
    butttonCloseErrMsgContainerForSendData.removeEventListener('click',     onSendDataErrMsg);
    document.removeEventListener('keydown', onSendDataErrMsg);
    document.removeEventListener('click', onSendDataErrMsg);
  }
};
const showSendDataErrMsg = () => {
  document.body.append(errMsgContainerForSendData);
  deactivateUserForm();
  document.addEventListener('keydown', onSendDataErrMsg);
  document.addEventListener('click', onSendDataErrMsg);
  butttonCloseErrMsgContainerForSendData.addEventListener('click', onSendDataErrMsg);
}; //OK

const closeSendDataSuccessMsg = () => {
  successMsgContainerForSendData.remove();
}; //OK
const onSendDataSuccessMsg = (evt) => {
  if (evt.key === 'Escape' || (evt.type === 'click' && evt.target.className !== 'success__inner')) {
    closeSendDataSuccessMsg();
    setDefaulParameters();
    document.removeEventListener('keydown', onSendDataSuccessMsg);
    document.removeEventListener('click', onSendDataSuccessMsg);
    butttonCloseSuccessMsgContainerForSendData.removeEventListener('click', onSendDataSuccessMsg);
  }
}; // OK
const showSendDataSuccessMsg = () => {
  document.body.append(successMsgContainerForSendData);
  deactivateUserForm();
  document.addEventListener('keydown', onSendDataSuccessMsg);
  document.addEventListener('click', onSendDataSuccessMsg);
  butttonCloseSuccessMsgContainerForSendData.addEventListener('click', onSendDataSuccessMsg);
}; //OK

export { showGetDataErrMsg, showSendDataErrMsg, showSendDataSuccessMsg };
