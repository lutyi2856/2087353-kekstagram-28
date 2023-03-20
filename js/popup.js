import {renderComments} from './miniature.js';

const bodyPage = document.querySelector('body');
const picturePopup = document.querySelector('.big-picture');
const closePopupButton = picturePopup.querySelector('.big-picture__cancel');

const onPopupClose = () => {
  picturePopup.classList.add('hidden');
  bodyPage.classList.remove('modal-open');
  closePopupButton.removeEventListener('click', onPopupClose);
};

const onEscapeClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    picturePopup.classList.add('hidden');
    bodyPage.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', onEscapeClose);
};

const showPicturePopup = (picture) => {
  picturePopup.querySelector('.big-picture__img img').src = picture.url;
  picturePopup.querySelector('.big-picture__img img').alt = picture.description;
  picturePopup.querySelector('.likes-count').textContent = picture.likes;
  picturePopup.querySelector('.comments-count').textContent = picture.comments.length;
  picturePopup.querySelector('.social__caption').textContent = picture.description;
  picturePopup.querySelector('.social__comment-count').classList.add('hidden');
  picturePopup.querySelector('.comments-loader').classList.add('hidden');
  picturePopup.classList.remove('hidden');
  renderComments(picture.comments);

  bodyPage.classList.add('modal-open');
  closePopupButton.addEventListener('click', onPopupClose);
  document.addEventListener('keydown', onEscapeClose);

};

export {showPicturePopup};
