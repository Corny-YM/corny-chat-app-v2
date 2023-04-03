function gcd(a, h) {
  let temp;
  while (1) {
    temp = a % h;
    if (temp == 0) return h;
    a = h;
    h = temp;
  }
}

const powMod = (base, exp, mod) => {
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

const procedureInvert = (a, n) => {
  let g0 = n,
    g1 = a;
  let u0 = 1,
    u1 = 0;
  let v0 = 0,
    v1 = 1;
  let i = 1;
  while (g0 % g1 != 0) {
    let y = Math.floor(g0 / g1);
    let temp = g0 % g1;
    g0 = g1;
    g1 = temp;

    let tempU = u0 - y * u1;
    u0 = u1;
    u1 = tempU;

    let tempV = v0 - y * v1;
    v0 = v1;
    v1 = tempV;
  }
  let t = v1;
  if (t > 0) {
    return t;
  } else {
    // console.log("result t<0: " + (n + t));
    return n + t;
  }
};

const Z26 = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const arrAllChars = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
  "à", "á", "â", "ã", "è", "é", "ê", "ì", "í", "ò", "ó", "ô", "õ", "ù", "ú", "ă", "đ", "ĩ", "ũ", "ơ", "À", "Á", "Â", "Ã", "È", "É", "Ê", "Ì", "Í", "Ò", "Ó", "Ô", "Õ", "Ù", "Ú", "Ă", "Đ", "Ĩ", "Ũ", "Ơ",
  "ư", "ă", "ạ", "ả", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ắ", "ằ", "ẳ", "ẵ", "ặ", "ẹ", "ẻ", "ẽ", "ề", "ề", "ể", "Ư", "Ă", "Ạ", "Ả", "Ấ", "Ầ", "Ẩ", "Ẫ", "Ậ", "Ắ", "Ằ", "Ẳ", "Ẵ", "Ặ", "Ẹ", "Ẻ", "Ẽ", "Ề", "Ề", "Ể", 
  "ễ", "ệ", "ế", "ỉ", "ị", "ọ", "ỏ", "ố", "ồ", "ổ", "ỗ", "ộ", "ớ", "ờ", "ở", "ỡ", "ợ", "ụ", "ủ", "ứ", "ừ", "Ễ", "Ệ", "Ế", "Ỉ", "Ị", "Ọ", "Ỏ", "Ố", "Ồ", "Ổ", "Ỗ", "Ộ", "Ớ", "Ờ", "Ở", "Ỡ", "Ợ", "Ụ", "Ủ", "Ứ", "Ừ", 
  "ử", "ữ", "ự", "ỳ", "ỵ", "ỷ", "ỹ", "Ử", "Ữ", "Ự", "Ỳ", "Ỵ", "Ỷ", "Ỹ",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", ":", ";", "<", ">", "?", "`", "~", "'", '"', "|", "\\", "/", " ",
];

const encodeRSA = (str) => {
  const p = 3,
    q = 7;
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let b = 11;
  const a = procedureInvert(b, phi);

  const arrIndex = [];
  for (let i = 0; i < str.length; i++) {
    let curIndex = Z26.indexOf(str[i]);
    // numerous += curIndex != -1 ? curIndex : 26
    arrIndex.push(curIndex != -1 ? curIndex : 26);
  }
  console.log(arrIndex);

  const arrIndexEncode = [];
  for (let i = 0; i < arrIndex.length; i++) {
    arrIndexEncode.push(powMod(arrIndex[i], b, n));
  }
  console.log(arrIndexEncode);
  // const encryption = powMod(str, b, n);
  let strEncryption = '';
  for (let i = 0; i < arrIndexEncode.length; i++) {
    strEncryption += Z26[arrIndexEncode[i]];
  }
  console.log(strEncryption);

  return {
    secretNumber: {
      p: p,
      q: q,
    },
    coupleKeys: {
      privateKey: a,
      publicKey: b,
    },
    encode: strEncryption,
  };
};

const decodeRSA = (str, a, n) => {
  console.log(str);
  const arrIndex = []
  for (let i = 0; i < str.length; i++) {
    let curIndex = Z26.indexOf(str[i]);
    // numerous += curIndex != -1 ? curIndex : 26
    arrIndex.push(curIndex != -1 ? curIndex : 26);
  }
  console.log(arrIndex);

  const arrIndexEncode = [];
  for (let i = 0; i < arrIndex.length; i++) {
    arrIndexEncode.push(powMod(arrIndex[i], a, n));
  }
  console.log(arrIndexEncode);

  let plainText = ""
  for (let i = 0; i < arrIndexEncode.length; i++) {
    plainText += Z26[arrIndexEncode[i]];
  }

  //   const plainText = powMod(str, a, n);
    return plainText;
};

export { encodeRSA, decodeRSA };
