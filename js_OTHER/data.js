import { showSendDataSuccessMsg, showSendDataErrMsg } from './message.js';
import { GET_URL, SEND_URL } from './constants.js';

const getData = (activationFilterForm, activationUserForm, showGetDataErrMsg) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((datafromServer) => {
      activationFilterForm(datafromServer);
      activationUserForm(datafromServer);
    })
    .catch(() => {
      showGetDataErrMsg();
      activationUserForm([{}]);
    });
}; // OK

const sendData = (body, datafromServer) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSendDataSuccessMsg(datafromServer);
        return;
      }

      throw new Error();
    })
    .catch(() => {
      showSendDataErrMsg();
    });
}; // OK

export { getData, sendData};
