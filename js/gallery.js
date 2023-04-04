
import { renderThumbnails } from './miniature.js';
import {showPicturePopup} from './popup.js';
import { showAlert } from './util.js';
import {getData} from './api.js';
import { debounce } from './util.js';
import { init, getFilterdPictures } from './sort.js';

const container = document.querySelector('.pictures');
let pictures = [];

const onContainerClick = (evt) => {
  const fotoElement = evt.target.closest('[data-thumbnail-id]');
  if(!fotoElement) {
    return;
  }
  const picture = pictures.find(
    (item) => item.id === +fotoElement.dataset.thumbnailId
  );

  showPicturePopup(picture);


};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, container);
  container.addEventListener('click', onContainerClick);
};

const getDataPicture = async () => {
  try {
    const data = await getData();
    const debouncedRenderGallery = debounce(renderGallery);
    init(data, debouncedRenderGallery);
    renderGallery(getFilterdPictures());
  } catch(err) {
    showAlert(err.message);
  }
};

export {renderGallery, getDataPicture};
