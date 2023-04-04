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
    fragment.append(thumbnail);
  });

  container.append(fragment);
};


export {renderThumbnails};
