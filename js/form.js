import {resetEffects} from './effects.js';
import {resetScale} from './scale.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { showAlert } from './util.js';
import { loadPreview } from './preview.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};
const MAX_HASHTAG_COUNT = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAGS_ERROR_TEXT = 'Не правильно заполнены хэштэги';
const ERROR_TEXT_DESCRIPTION = 'Максимальная длина 140 символов';
const formPopup = document.querySelector('.img-upload__overlay');
const uploadImgButton = document.querySelector('#upload-file');
const formPopupClose = document.querySelector('#upload-cancel');
const formAddImage = document.querySelector('#upload-select-image');
const inputTextHashtags = formPopup.querySelector('.text__hashtags');
const inputTextDescription = formPopup.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const pristine = new Pristine(formAddImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__eror'
});

const hide = () => {
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImgButton.value = '';
  formAddImage.reset();
  pristine.reset();
  resetEffects();
  document.removeEventListener('keydown', onEscapeFormClose);
  formPopupClose.removeEventListener('click', onPopupFormClose);
};

function onPopupFormClose() {
  hide();
}


function onEscapeFormClose(evt) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    if(inputTextHashtags === document.activeElement || inputTextDescription === document.activeElement || errorMessage) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      hide();
    }
  }
}


const onInputUpload = () => {
  formPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  loadPreview();
  formPopupClose.addEventListener('click', onPopupFormClose);
  document.addEventListener('keydown', onEscapeFormClose);
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = (tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator (
  hashtagField,
  validateTags,
  HASHTAGS_ERROR_TEXT
);

const validateTextDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator (
  inputTextDescription,
  validateTextDescription,
  ERROR_TEXT_DESCRIPTION
);

const answerOfFormSubmit = async () => {
  try {
    await sendData(new FormData(formAddImage));
    onPopupFormClose();
    showSuccessMessage();
  }catch(err) {
    showErrorMessage();
    showAlert(err.message);
  }
};

const addFormSubmitListener = async() => {
  formAddImage.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await answerOfFormSubmit();
      unblockSubmitButton();
    }
  });

};


uploadImgButton.addEventListener('change', onInputUpload);


export {addFormSubmitListener, onPopupFormClose};

