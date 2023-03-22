
import {onEscapeClose} from './util.js';
const COMMENTS_COUNT_LOAD = 5;
const commentsPopup = document.querySelector('.social__comments');
const commentElementPopup = document.querySelector('.social__comment');
const picturePopup = document.querySelector('.big-picture');
const closePopupButton = picturePopup.querySelector('.big-picture__cancel');
const commentsLoadButton = picturePopup.querySelector('.social__comments-loader');
const currenCountLabel = picturePopup.querySelector('.social__comment-count');

// 1.Показать не больше или равно 5 ком

// - завести переменную  и проверять длину массива и если длина > 5 , обрезать до 5 элементов;
// 2.Счётчик  создать который будет показывать текущее количество комментариев
// 3. Функция обработчик событий на кнопку загрузить еще, в которая увеличивает счетчик на пять и согласно счётчика обрезаться


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

const onPopupClose = () => {
  picturePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopupButton.removeEventListener('click', onPopupClose);
  document.removeEventListener('keydown', onEscapeClose);
};

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
  document.body.classList.add('modal-open');
  closePopupButton.addEventListener('click', onPopupClose);
  document.addEventListener('keydown', onEscapeClose);
  commentsLoadButton.addEventListener('click', () => {
    const commentsCount = commentsCounter();
    const currentComments = picture.comments.slice(0, commentsCount);
    currenCountLabel.firstChild.data = `${currentComments.length} из `;
    renderComments(currentComments);
    if(commentsCount >= picture.comments.length) {
      commentsLoadButton.classList.add('hidden');
    }
  });
};

export {showPicturePopup, onPopupClose, picturePopup, closePopupButton};
