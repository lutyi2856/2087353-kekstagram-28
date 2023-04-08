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
  const successMessagePopup = document.querySelector('.success');

  successMessagePopup.addEventListener('click', (evt) => {
    const successElementPopup = successMessagePopup.querySelector('.success__inner');
    if(evt.target !== successElementPopup) {
      successMessageElement.remove();
    }
  });

  onCloseEscapeSuccessMessage = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessageElement.remove();
      document.removeEventListener('keydown',onCloseEscapeSuccessMessage);
    }
  };

  document.addEventListener('keydown',onCloseEscapeSuccessMessage);
  buttonSuccessMessage.addEventListener('click', () => {
    successMessageElement.remove();
    document.removeEventListener('keydown',onCloseEscapeSuccessMessage);
  });
};

const showErrorMessage = () => {
  const errorMessageElement = containerErrorMessage.cloneNode(true);
  document.body.appendChild(errorMessageElement);
  const buttonErrorMessage = errorMessageElement.querySelector('.error__button');
  const errorMessagePopup = document.querySelector('.error');

  errorMessagePopup.addEventListener('click', (evt) => {
    const errorElementPopup = errorMessagePopup.querySelector('.error__inner');
    if(evt.target !== errorElementPopup) {
      errorMessagePopup.remove();
    }
  });

  onCloseEscapeErrorMessage = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
      document.removeEventListener('keydown',onCloseEscapeErrorMessage);
    }
  };

  document.addEventListener('keydown',onCloseEscapeErrorMessage);
  buttonErrorMessage.addEventListener('click', () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown',onCloseEscapeErrorMessage);
  });

};


export {showSuccessMessage, showErrorMessage};
