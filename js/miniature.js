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


export {renderThumbnails};
