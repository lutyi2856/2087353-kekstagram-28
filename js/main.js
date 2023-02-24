/*
id
url
description
likes
comments
    id
    avatar
    message
    name
*/

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

const createFotoDescription = () => {

  return {
     ID: getRandomInteger(1, 25),
     URL: `photos/${ URL[getRandomInteger(0, URL.length - 1)]}.jpg`,
     DESCRIPTION: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
     LIKES: getRandomInteger(15, 200),
     COMMENTS: [{id: getRandomInteger(1, 400),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: MESSAGE[getRandomInteger(0, MESSAGE.length - 1)],
      name: NAME[getRandomInteger(0, NAME.length - 1)], }],
  };
};

console.log(
    createFotoDescription()
  );