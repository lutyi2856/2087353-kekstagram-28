import {renderThumbnails} from './miniature.js';
import {showPicturePopup} from './popup.js';


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
  renderThumbnails(pictures, container);
};

export {renderGallery};
