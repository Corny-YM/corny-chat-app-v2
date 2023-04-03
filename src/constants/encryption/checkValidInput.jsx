import { arrAllChars } from "./arrayAllChar";

// console.log(arrAllChars);

export const checkValidInput = (str) => {
  if(!str) return;
  let isValid = true;
  for (let i = 0; i < str.length; i++) {
    if (arrAllChars.indexOf(str[i]) == -1) {
      return false;
    }
  }
  return isValid;
};
