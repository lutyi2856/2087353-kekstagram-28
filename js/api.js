
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте перезагрузить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз',
};

const download = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => download(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
  download(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};

