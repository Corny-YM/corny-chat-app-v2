import { arrAllChars } from './arrayAllChar';
import { powMod } from './powMod';
import { procedureInvert } from './procedureInvert';

const a = 765; // private key
const p = 2579;
const g = 2;
const r = 853;
// Calculation public key
const h = powMod(g, a, p);
//  y1 = g^r mod p
const y1 = powMod(g, r, p);

// ====================ENCODED====================
const encryptionElgamal = (x) => {
  //  y2 = x*h^r mod p
  const y2 = ((x % p) * (powMod(h, r, p) % p)) % p;
  return y2;
};

const handleEncodeElgamal = (str) => {
  let strEncode = '';
  for (let i = 0; i < str.length; i++) {
    let tmp = encryptionElgamal(arrAllChars.indexOf(str[i]));
    strEncode += String.fromCharCode(tmp);
  }
  return strEncode;
};

// ====================DECODED====================
//  dk(y1, y2) = y2*(y1^a)^-1 mod p
// {y1: 435, y2: 2396}
const decryptionElgamal = (y2) => {
  const prevValue = y2 % p;
  const nextValue = procedureInvert(y1, p);
  const plaintext = ((prevValue % p) * powMod(nextValue, a, p)) % p;
  return plaintext;
};

const handleDecodeElgamal = (str) => {
  let strDecodeElgamal = '';
  for (let i = 0; i < str.length; i++) {
    const element = str[i].charCodeAt();
    const value = decryptionElgamal(element);
    strDecodeElgamal += arrAllChars[value];
  }
  return strDecodeElgamal;
};

export { handleEncodeElgamal, handleDecodeElgamal };
