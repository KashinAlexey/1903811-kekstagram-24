import { deactivationUserForm } from './user-form.js';
import { deactivationFilterForm, activationFilterForm } from './filter-form.js';
import { mapLoad, setMapDefaultParameters } from './map.js';
import { getData } from './data.js';
import { showGetDataErrMsg } from './message.js';
import { activationUserForm } from './user-form.js';

deactivationUserForm();
deactivationFilterForm();

mapLoad(() => {
  setMapDefaultParameters();
  getData((dataFromServer) => activationFilterForm(dataFromServer), (dataFromServer) => activationUserForm(dataFromServer), () => showGetDataErrMsg());
});
