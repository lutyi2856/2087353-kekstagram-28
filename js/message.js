const containerSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const containerErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const showSuccessMessage = () => {
  const fragmentSuccessMessage = document.createDocumentFragment();
  const uccessMessageElement = containerSuccessMessage.cloneNode(true);
  fragmentSuccessMessage.appendChild(uccessMessageElement);
  document.body.appendChild(fragmentSuccessMessage);
};

const showErrorMessage = () => {
  const fragmentErrorMessage = document.createDocumentFragment();
  const errorMessageElement = containerErrorMessage.cloneNode(true);
  fragmentErrorMessage.appendChild(errorMessageElement);
  document.body.appendChild(fragmentErrorMessage);
};

export {showSuccessMessage, showErrorMessage};
