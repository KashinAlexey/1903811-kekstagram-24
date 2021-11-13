import { GET_URL, SEND_URL } from './constants.js';

const getData = (activationFilterForm, showGetDataErrMsg) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((datafromServer) => {
      activationFilterForm(datafromServer);
    })
    .catch(() => {
      showGetDataErrMsg();
    });
};

const sendData = (body, showSendDataSuccessMsg, showSendDataErrMsg) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        //showSendDataSuccessMsg();
        return;
      }

      throw new Error();
    })
    .catch(() => {
      //showSendDataErrMsg();
    });
};

export { getData, sendData };
