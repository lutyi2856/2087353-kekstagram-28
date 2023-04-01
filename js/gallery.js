
import { renderThumbnails } from './miniature.js';
import {showPicturePopup} from './popup.js';
import { showAlert } from './util.js';
import {getData} from './api.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const fotoElement = evt.target.closest('[data-thumbnail-id]');
    if(!fotoElement) {
      return;
    }
    const picture = pictures.find(
      (item) => item.id === +fotoElement.dataset.thumbnailId
    );

    showPicturePopup(picture);

  });
  renderThumbnails(pictures);
};

const getDataPicture = async () => {
  try {
    const data = await getData();
    renderGallery(data);
  } catch(err) {
    showAlert(err.message);
  }
};

export {renderGallery, getDataPicture};
