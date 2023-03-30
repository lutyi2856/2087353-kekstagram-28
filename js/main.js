
import {renderGallery} from './gallery.js';
import './form.js';
import {getData, sendData} from './api.js';
import { showAlert } from './util.js';
import { onFormSubmit, onPopupFormClose } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';


onFormSubmit(async (data) => {
  try {
    await sendData(data);
    onPopupFormClose();
    showSuccessMessage();
  }catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch(err) {
  showAlert(err.message);
}


