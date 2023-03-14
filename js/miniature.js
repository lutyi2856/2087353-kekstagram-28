import {createFotoDescriptions} from './data.js';


const userDialog = document.querySelector('.pictures__title');
userDialog.classList.remove('visually-hidden');


const similarListElement = document.querySelector('.pictures');
const similarWizardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarWizards = createFotoDescriptions();

similarWizards.forEach((wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.picture__img').src = wizard.url;
  wizardElement.querySelector('.picture__likes').textContent = wizard.likes;
  wizardElement.querySelector('.picture__comments').textContent = wizard.comments.length;
  similarListElement.appendChild(wizardElement);
});
