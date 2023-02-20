// Функция для проверки длины строки

let getStringLength = function (string, length) {
  if(length > 17) {
    getStringLength = `${true }- строка проходит по длине`;
    return getStringLength;
  }
  getStringLength = `${false }- строка не проходит`;
  return getStringLength;
};

// Функция для проверки, является ли строка палиндромом

function checkPalindrome (string) {
  string = string.replaceAll(' ', '');
  stringNew = string.toLowerCase();
  const j = stringNew.length - 1;
  for(let i = 0 ; i < j / 2 ;i++) {
    const x = stringNew[i] ;
    const y = stringNew[j - i];
    if(x != y) {
      const palindrome = 'false - это не палиндром';
      return palindrome;
    } else {
      const g = string.length - 1;
      for(let i = 0 ; i = g - 1 ;i++) {
        const s = string[i];
        const c = string[g - i];
        if(s !== c) {
          palindrome = 'true - несмотря на разный регистр, тоже палиндром';
          return palindrome;
        } else {
          palindrome = 'true - строка является палиндромом';
          return palindrome;
        }
      }
    }
  }

}

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 

function getOnlyNumbers (string){
  string = String(string);
  const regexp = /[\d]/g;
  const numbersArr = String(string.match(regexp));
  const numbersStr = numbersArr.replace(/,/g, '');
  string = Number(numbersStr);
  return string;
}


// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
function getAdressFile(string, length, additional) {
  if(string.length >= length) {
    // сравнивает длину исход строки и длюну минимальной строки
    const adressFile = string; // если > или =, тогда функция возвращает первую строку(не работает)?
    return adressFile;
  } else {
    let sumadditional = '';
    const availableLength = length - string.length;
    //высчитывает длину добавочной строки для использования
    for(let i = 0; i <= availableLength - 1; i++) {
      sumadditional += additional[i];
      additional += additional[i];
    }
    adressFile = sumadditional + string;

    return adressFile;
  }
}
