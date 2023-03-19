const commentsPopup = document.querySelector('.social__comments');
const commentElementPopup = document.querySelector('.social__comment');
const similarFotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const renderThumbnails = (descriptions, container) => {
  const fragment = document.createDocumentFragment();
  descriptions.forEach((foto) => {
    const fotoElement = similarFotoTemplate.cloneNode(true);
    fotoElement.querySelector('.picture__img').src = foto.url;
    fotoElement.querySelector('.picture__img').alt = foto.description;
    fotoElement.querySelector('.picture__likes').textContent = foto.likes;
    fotoElement.querySelector('.picture__comments').textContent = foto.comments.length;
    fotoElement.dataset.thumbnailId = foto.id;
    fragment.appendChild(fotoElement);
  });

  container.appendChild(fragment);
};

const renderComments = (comments) => {
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comments) => {
    const commentsElement = commentElementPopup.cloneNode(true);
    commentsElement.querySelector('.social__picture').src = comments.avatar;
    commentsElement.querySelector('.social__picture').alt = comments.name;
    commentsElement.querySelector('.social__text').textContent = comments.message;
    commentsElement.dataset.commentId = comments.id;
    fragmentComments.appendChild(commentsElement);
  });

  commentsPopup.appendChild(fragmentComments);
};


export {renderThumbnails, renderComments};
