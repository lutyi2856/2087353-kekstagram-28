const URL = [
  '1','2','3','4','5','6','7','8','9','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25',
];


const DESCRIPTION = [
  'Природа','Космос','Город','Деревня','Парк','Озеро','Лес','Горы','Машина','Катер',
  'Велосипед','Каток','Спорт','Рыбалка','Одежда','Юмор','Техника','Програмирование','Код','Веб',
  'История','Наука','Шоу','Математика','Химия','Физика','Язык','Творчество','Работа','Данные',
];

const MESSAGE = ['Всё отлично!','В целом всё неплохо. Но не всё.'];

const NAME = ['Ян','Игорь','Вася','Петя','Коля','Аня','Вика'];

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


const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIdFromRangeGenerator(0, URL.length - 1);
const generateAvatarId = createRandomIdFromRangeGenerator(1, 300);

const createFotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${ URL[generatePhotoUrl()]}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: [{id: generateAvatarId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGE[getRandomInteger(0, MESSAGE.length - 1)],
    name: NAME[getRandomInteger(0, NAME.length - 1)], }],
});

const similarFotoDescription = Array.from({length: 25}, createFotoDescription);
console.log(similarFotoDescription);
