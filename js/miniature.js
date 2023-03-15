import {createFotoDescriptions} from './data.js';

const similarListElement = document.querySelector('.pictures');
const similarFotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarFoto = createFotoDescriptions();

similarFoto.forEach((wizard) => {
  const fotoElement = similarFotoTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = wizard.url;
  fotoElement.querySelector('.picture__likes').textContent = wizard.likes;
  fotoElement.querySelector('.picture__comments').textContent = wizard.comments.length;
  similarListElement.appendChild(fotoElement);
});
