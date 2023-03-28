import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const TASK_ERROR_TEXT = 'Не правильно заполнены хэштэги';

const formPopup = document.querySelector('.img-upload__overlay');
const uploadImgButton = document.querySelector('#upload-file');
const formPopupClose = document.querySelector('#upload-cancel');
const FormAddImage = document.querySelector('#upload-select-image');
const inputTextHashtags = formPopup.querySelector('.text__hashtags');
const inputTextDescription = formPopup.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const pristine = new Pristine(FormAddImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__eror'
});


const onEscapeFormClose = (evt) => {
  if (evt.key === 'Escape') {
    if(inputTextHashtags === document.activeElement || inputTextDescription === document.activeElement) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      formPopup.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadImgButton.value = '';
      FormAddImage.reset();
      document.removeEventListener('keydown', onEscapeFormClose);
      formPopupClose.removeEventListener('click', onPopupFormClose);
    }
  }
};

const onPopupFormClose = () => {
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImgButton.value = '';
  formPopup.reset();
  formPopupClose.addEventListener('click', onPopupFormClose);
  document.addEventListener('keydown', onEscapeFormClose);
};

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
  TASK_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
  if(validateTags(hashtagField.value)) {
    FormAddImage.submit();
  } else {
    evt.preventDefault();
  }
};

FormAddImage.addEventListener('submit', onFormSubmit);
uploadImgButton.addEventListener('change', onInputUpload);
formPopupClose.addEventListener('click', onPopupFormClose);
document.addEventListener('keydown', onEscapeFormClose);
