import {onPopupClose, picturePopup, closePopupButton} from './popup.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const onEscapeClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    picturePopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', onEscapeClose);
  closePopupButton.removeEventListener('click', onPopupClose);
  if(document.querySelector('.social__comments-loader').classList.contains('hidden')) {
    commentsLoadButton.classList.remove('hidden');
  }
};

export {
  createRandomIdFromRangeGenerator,
  getRandomInteger,
  onEscapeClose
};
