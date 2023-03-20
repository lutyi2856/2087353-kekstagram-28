import {createRandomIdFromRangeGenerator, getRandomInteger} from './util.js';

const MIN_ID_AMOUNT = 1;
const MAX_ID_AMOUNT = 25;


const URLS = [
  '1','2','3','4','5','6','7','8','9','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25',
];

const MIN_URL_AMOUNT = 0;
const MAX_URL_AMOUNT = URLS.length - 1;


const DESCRIPTIONS = [
  'Природа','Космос','Город','Деревня','Парк','Озеро','Лес','Горы','Машина','Катер',
  'Велосипед','Каток','Спорт','Рыбалка','Одежда','Юмор','Техника','Програмирование','Код','Веб',
  'История','Наука','Шоу','Математика','Химия','Физика','Язык','Творчество','Работа','Данные',
];

const MIN_DESCRIPTIONS_AMOUNT = 0;
const MAX_DESCRIPTIONS_AMOUNT = DESCRIPTIONS.length - 1;

const MESSAGES = ['Всё отлично!','В целом всё неплохо. Но не всё.'];

const MIN_MESSAGES_AMOUNT = 0;
const MAX_MESSAGES_AMOUNT = MESSAGES.length - 1;


const NAMES = ['Ян','Игорь','Вася','Петя','Коля','Аня','Вика'];

const MIN_NAMES_AMOUNT = 0;
const MAX_NAMES_AMOUNT = NAMES.length - 1;

const MIN_LIKES_AMOUNT = 0;
const MAX_LIKES_AMOUNT = 200;

const MIN_AVATAR_IMG_AMOUNT = 1;
const MAX_AVATAR_IMG_AMOUNT = 6;

const MIN_AVATAR_ID_AMOUNT = 1;
const MAX_AVATAR_ID_AMOUNT = 75;

const MIN_COMMENTS_LENGTH = 1;
const MAX_COMMENTS_LENGTH = 30;

const SIMILAR_DESCRIPTIONS_COUNT = 25;


const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID_AMOUNT, MAX_ID_AMOUNT);
const generatePhotoUrl = createRandomIdFromRangeGenerator(MIN_URL_AMOUNT, MAX_URL_AMOUNT);
const generateAvatarId = createRandomIdFromRangeGenerator(MIN_AVATAR_ID_AMOUNT, MAX_AVATAR_ID_AMOUNT);

const createComment = () => ({
  id: generateAvatarId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_IMG_AMOUNT, MAX_AVATAR_IMG_AMOUNT)}.svg`,
  message: MESSAGES[getRandomInteger(MIN_MESSAGES_AMOUNT, MAX_MESSAGES_AMOUNT)],
  name: NAMES[getRandomInteger(MIN_NAMES_AMOUNT, MAX_NAMES_AMOUNT)], }
);

const createFotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${ URLS[generatePhotoUrl()]}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(MIN_DESCRIPTIONS_AMOUNT, MAX_DESCRIPTIONS_AMOUNT)],
  likes: getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS_LENGTH, MAX_COMMENTS_LENGTH)}, createComment),
});

const createFotoDescriptions = () => Array.from({length: SIMILAR_DESCRIPTIONS_COUNT}, createFotoDescription);


export {createFotoDescriptions};
