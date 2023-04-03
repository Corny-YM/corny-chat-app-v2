export const powMod = (base, exp, mod) => {
  let remainder = base;
  const arrRemainder = [];
  const binaryExp = Number(exp).toString(2);
  const length = binaryExp.length - 1;

  for (let i = length; i >= 0; i--) {
    let tmpExp = length - i;

    if (tmpExp == 0) {
      remainder = remainder % mod;
    }
    if (tmpExp > 0) {
      remainder = Math.pow(remainder, 2) % mod;
    }

    if (binaryExp[i] == '1') {
      arrRemainder.push(remainder);
    }
  }
  //  arrRemainder = [2, 16, 256, 1061, 1277, 801, 2009, 337]
  const result = arrRemainder.reduce((multi, currentValue) => {
    return (multi * currentValue) % mod;
  });

  return result;
};
