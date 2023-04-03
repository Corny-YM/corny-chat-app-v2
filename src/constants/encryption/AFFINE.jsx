// Array All Characters
import { arrAllChars } from './arrayAllChar';

// Methods support
import { procedureInvert } from './procedureInvert';

const amountLength = arrAllChars.length;

// 9, 11
// 11, 21
const a = 9;
const b = 11;

const encodeAFFINE = (msg) => {
  // const a = 3, b = 6
  const arrIndex = [];
  for (let i = 0; i < msg.length; i++) {
    let tmpIndex = arrAllChars.indexOf(msg[i]);
    let index = tmpIndex != -1 ? tmpIndex : amountLength;
    arrIndex.push(index);
  }
  //   console.log(arrIndex);

  for (let i = 0; i < arrIndex.length; i++) {
    arrIndex[i] = (a * arrIndex[i] + b) % amountLength;
  }
  //   console.log(arrIndex);

  let str = '';
  for (let i = 0; i < arrIndex.length; i++) {
    str = str + arrAllChars[arrIndex[i]]; // arrAllChars[12]
  }
  // console.log(str);
  return str;
};

const decodeAFFINE = (str) => {
  const arrIndex = [];
  for (let i = 0; i < str.length; i++) {
    let index = arrAllChars.indexOf(str[i]);
    arrIndex.push(index);
  }
  // console.log(arrIndex);

  for (let i = 0; i < arrIndex.length; i++) {
    // (a^-1 * (str - b)) mod 222
    // ((a^-1 % 222) * ((str -b) % 222)) % 222
    // arrIndex[i] = ((procedureInvert(a, 222) % 222) * ((arrIndex[i] - b) % 222)) % 222;
    const afterValue =
      arrIndex[i] - b < 0
        ? amountLength + (arrIndex[i] - b)
        : (arrIndex[i] - b) % amountLength;
    // console.log(afterValue);
    arrIndex[i] =
      ((procedureInvert(a, amountLength) % amountLength) * afterValue) %
      amountLength;
  }
  // console.log(arrIndex);

  let plainText = '';
  for (let i = 0; i < arrIndex.length; i++) {
    plainText += arrAllChars[arrIndex[i]];
  }
  return plainText;
};

export { encodeAFFINE, decodeAFFINE };
