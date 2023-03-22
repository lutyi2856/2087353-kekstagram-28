const formPopup = document.querySelector('.img-upload__overlay');
const uploadImgButton = document.querySelector('#upload-file');
const formPopupClose = document.querySelector('#upload-cancel');
const FormAddImage = document.querySelector('#upload-select-image');


const onUploadInput = () => {
  formPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  console.log(uploadImgButton.files[0].name);
};

uploadImgButton.addEventListener('change', onUploadInput);
formPopupClose.addEventListener('click', () => {
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImgButton.value = '';
  new Pristine(FormAddImage);
});


FormAddImage.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = Pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
