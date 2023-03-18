

const picturePopup = document.querySelector('.big-picture');
const commentsPopup = document.querySelector('.social__comments');


const showPicturePopup = (picture) => {
  picturePopup.querySelector('.big-picture__img img').src = picture.url;
  picturePopup.querySelector('.big-picture__img img').alt = picture.description;
  picturePopup.querySelector('.likes-count').textContent = picture.likes;
  picturePopup.querySelector('.comments-count').textContent = picture.comments.length;
  picturePopup.querySelector('.social__caption').textContent = picture.description;
  picturePopup.classList.remove('hidden');

};

export {showPicturePopup};
