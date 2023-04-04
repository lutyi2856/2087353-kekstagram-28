const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtertElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilterdPictures = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnSorterClick = (callback) => {
  filtertElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter) {
      return;
    }

    filtertElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    console.log(currentFilter);
    callback(getFilterdPictures);
  });
};

const init = (loadedPictures, callback) => {
  filtertElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnSorterClick(callback);
};


export {init, getFilterdPictures};
