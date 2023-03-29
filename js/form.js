import {resetEffects} from './effects.js';
import {resetScale} from './scale.js';
import {isEscapeKey} from './util.js';

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

const pristine = new Pristine(formAddImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__eror'
});

const onPopupFormClose = () => {
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImgButton.value = '';
  formPopup.reset();
  formPopupClose.addEventListener('click', onPopupFormClose);
  document.addEventListener('keydown', onEscapeFormClose);
};


function onEscapeFormClose(evt) {
  if (isEscapeKey(evt)) {
    if(inputTextHashtags === document.activeElement || inputTextDescription === document.activeElement) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      formPopup.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadImgButton.value = '';
      formAddImage.reset();
      document.removeEventListener('keydown', onEscapeFormClose);
      formPopupClose.removeEventListener('click', onPopupFormClose);
    }
  }
}


const onInputUpload = () => {
  formPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  pristine.reset();
  resetScale();
  resetEffects();
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

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

formAddImage.addEventListener('submit', onFormSubmit);
uploadImgButton.addEventListener('change', onInputUpload);
formPopupClose.addEventListener('click', onPopupFormClose);
document.addEventListener('keydown', onEscapeFormClose);
