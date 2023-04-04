const similarFotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const createThumnail = ({ comments, description, likes, url, id }) =>{
  const fotoElement = similarFotoTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = url;
  fotoElement.querySelector('.picture__img').alt = description;
  fotoElement.querySelector('.picture__likes').textContent = likes;
  fotoElement.querySelector('.picture__comments').textContent = comments.length;
  fotoElement.dataset.thumbnailId = id;

  return fotoElement;
};

const renderThumbnails = (pictures, container) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumnail(picture);
    // const fotoElement = similarFotoTemplate.cloneNode(true);
    // fotoElement.querySelector('.picture__img').src = foto.url;
    // fotoElement.querySelector('.picture__img').alt = foto.description;
    // fotoElement.querySelector('.picture__likes').textContent = foto.likes;
    // fotoElement.querySelector('.picture__comments').textContent = foto.comments.length;
    // fotoElement.dataset.thumbnailId = foto.id;
    fragment.append(thumbnail);
  });

  container.append(fragment);
};


export {renderThumbnails};
