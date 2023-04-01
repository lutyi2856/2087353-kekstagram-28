import {isEscapeKey} from './util.js';

const containerSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');


const containerErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

let onCloseEscapeErrorMessage;
let onCloseEscapeSuccessMessage;


const showSuccessMessage = () => {
  const successMessageElement = containerSuccessMessage.cloneNode(true);
  document.body.appendChild(successMessageElement);
  const buttonSuccessMessage = successMessageElement.querySelector('.success__button');
  onCloseEscapeSuccessMessage = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessageElement.remove();
      document.removeEventListener('keydown',onCloseEscapeSuccessMessage);
    }
  };
  buttonSuccessMessage.addEventListener('click', () => {
    successMessageElement.remove();
  });
  document.addEventListener('keydown',onCloseEscapeSuccessMessage);
};

const showErrorMessage = () => {
  const errorMessageElement = containerErrorMessage.cloneNode(true);
  document.body.appendChild(errorMessageElement);
  const buttonErrorMessage = errorMessageElement.querySelector('.error__button');
  onCloseEscapeErrorMessage = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
      document.removeEventListener('keydown',onCloseEscapeErrorMessage);
    }
  };
  buttonErrorMessage.addEventListener('click', () => {
    errorMessageElement.remove();
  });
  document.addEventListener('keydown',onCloseEscapeErrorMessage);
};


export {showSuccessMessage, showErrorMessage};
