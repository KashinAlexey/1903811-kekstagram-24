import { setDefaulParameters } from './user-form.js';

// Переменные
let errMsgContainerForGetData;
const errMsgContainerForSendData = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const butttonCloseErrMsgContainerForSendData = errMsgContainerForSendData.querySelector('.error__button');
const successMsgContainerForSendData = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const butttonCloseSuccessMsgContainerForSendData = errMsgContainerForSendData.querySelector('.success__button');

// Функционал модуля

const closeGetDataErrMsg = (evt) => {
  // Внутренняя логика
  if (evt.key || evt.type === 'click') {
    errMsgContainerForGetData.remove();
    document.removeEventListener('keydown', closeGetDataErrMsg);
    document.removeEventListener('click', closeGetDataErrMsg);
  }
}; // OK
const onGetDataErrMsg = () => {
  // Внешняя логика (или подписка на событие)
  document.addEventListener('keydown', closeGetDataErrMsg);
  document.addEventListener('click', closeGetDataErrMsg);
}; // OK
const showGetDataErrMsg = () => {
  // Переменные
  errMsgContainerForGetData = document.createElement('div');

  // Внутренняя логика
  errMsgContainerForGetData.style.zIndex = 100;
  errMsgContainerForGetData.style.position = 'absolute';
  errMsgContainerForGetData.style.left = 0;
  errMsgContainerForGetData.style.top = 0;
  errMsgContainerForGetData.style.right = 0;
  errMsgContainerForGetData.style.padding = '10px 3px';
  errMsgContainerForGetData.style.fontSize = '30px';
  errMsgContainerForGetData.style.textAlign = 'center';
  errMsgContainerForGetData.style.backgroundColor = 'red';
  errMsgContainerForGetData.textContent = 'Не удалось загрузить данные с сервера';

  document.body.append(errMsgContainerForGetData);

  // Внешняя логика
  onGetDataErrMsg();
}; // OK

const closeSendDataErrMsg = (evt) => {
  // Внутренняя логика
  if (evt.key === 'Escape' || evt.type === 'click') {
    errMsgContainerForSendData.remove();
    butttonCloseErrMsgContainerForSendData.removeEventListener('click', closeSendDataErrMsg);
    document.removeEventListener('keydown', closeSendDataErrMsg);
    document.removeEventListener('click', closeSendDataErrMsg);
  }
}; // OK
const onSendDataErrMsg = () => {
  // Внешняя логика (или подписка на событие)
  document.addEventListener('keydown', closeSendDataErrMsg);
  document.addEventListener('click', closeSendDataErrMsg);
  butttonCloseErrMsgContainerForSendData.addEventListener('click', closeSendDataErrMsg);
}; // TODO click any outside
const showSendDataErrMsg = () => {
  // Внутренняя логика
  document.body.append(errMsgContainerForSendData);
  // Внешняя логика
  onSendDataErrMsg();
}; //OK

const closeSendDataSuccessMsg = (evt) => {
  // Внутренняя логика
  if (evt.key === 'Escape' || evt.type === 'click') {
    successMsgContainerForSendData.remove();
    document.removeEventListener('keydown', closeSendDataSuccessMsg);
    document.removeEventListener('click', closeSendDataSuccessMsg);
    butttonCloseSuccessMsgContainerForSendData.addEventListener('click', closeSendDataSuccessMsg);
  }
}; //OK
const onSendDataSuccessMsg = () => {
  // Внешняя логика (или подписка на событие)
  document.addEventListener('keydown', closeSendDataSuccessMsg);
  document.addEventListener('click', closeSendDataSuccessMsg);
  butttonCloseSuccessMsgContainerForSendData.addEventListener('click', closeSendDataSuccessMsg);
}; // TODO click any outside
const showSendDataSuccessMsg = () => {
  console.log('sendData');
  // Внутренняя логика
  document.body.append(successMsgContainerForSendData);
  // Внешняя логика
  onSendDataSuccessMsg();
  setDefaulParameters();
}; //OK

export { showGetDataErrMsg, showSendDataErrMsg, showSendDataSuccessMsg };
