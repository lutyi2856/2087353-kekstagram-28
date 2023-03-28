import {isEscapeKey} from './util.js';

const COMMENTS_COUNT_LOAD = 5;
const commentsPopup = document.querySelector('.social__comments');
const commentElementPopup = document.querySelector('.social__comment');
const picturePopup = document.querySelector('.big-picture');
const closePopupButton = document.querySelector('.big-picture__cancel');
const commentsLoadButton = document.querySelector('.social__comments-loader');
const currenCountLabel = document.querySelector('.social__comment-count');


const renderComments = (comments) => {
  const fragmentComments = document.createDocumentFragment();
  commentsPopup.innerHTML = '';
  comments.forEach((comment) => {
    const commentsElement = commentElementPopup.cloneNode(true);
    commentsElement.querySelector('.social__picture').src = comment.avatar;
    commentsElement.querySelector('.social__picture').alt = comment.name;
    commentsElement.querySelector('.social__text').textContent = comment.message;
    commentsElement.dataset.commentId = comment.id;
    fragmentComments.appendChild(commentsElement);
  });

  commentsPopup.appendChild(fragmentComments);
};

let onCommentsLoadClick;

const onPopupClose = () => {
  picturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopupButton.removeEventListener('click', onPopupClose);
  document.removeEventListener('keydown', onEscapeClose);
  commentsLoadButton.removeEventListener('click', onCommentsLoadClick);
};

function onEscapeClose(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    picturePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', onEscapeClose);
  closePopupButton.removeEventListener('click', onPopupClose);
  commentsLoadButton.removeEventListener('click', onCommentsLoadClick);
}

const createCommentsCounter = () => {
  let counter = COMMENTS_COUNT_LOAD;
  return function () {
    counter += COMMENTS_COUNT_LOAD;
    return counter;
  };
};


const showPicturePopup = (picture) => {
  const commentsCounter = createCommentsCounter();
  picturePopup.querySelector('.big-picture__img img').src = picture.url;
  picturePopup.querySelector('.big-picture__img img').alt = picture.description;
  picturePopup.querySelector('.likes-count').textContent = picture.likes;
  picturePopup.querySelector('.comments-count').textContent = picture.comments.length;
  picturePopup.querySelector('.social__caption').textContent = picture.description;
  picturePopup.classList.remove('hidden');
  renderComments(picture.comments.slice(0, COMMENTS_COUNT_LOAD));
  const currentCommentsLength = document.querySelectorAll('.social__comment').length;
  currenCountLabel.firstChild.textContent = `${currentCommentsLength} из `;
  document.body.classList.add('modal-open');
  closePopupButton.addEventListener('click', onPopupClose);
  document.addEventListener('keydown', onEscapeClose);
  onCommentsLoadClick = () => {
    const commentsCount = commentsCounter();
    const currentComments = picture.comments.slice(0, commentsCount);
    const commentsLength = picture.comments.length;
    currenCountLabel.firstChild.textContent = `${currentComments.length} из `;
    renderComments(currentComments);
    if(commentsCount >= commentsLength) {
      commentsLoadButton.classList.add('hidden');
    }
  };
  commentsLoadButton.classList.toggle('hidden', picture.comments.length <= COMMENTS_COUNT_LOAD);
  commentsLoadButton.addEventListener('click', onCommentsLoadClick);
};

export {showPicturePopup, picturePopup, closePopupButton};
