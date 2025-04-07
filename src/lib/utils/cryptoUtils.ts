import CryptoJS from 'crypto-js';

import Config from '@/config';

const hashedKey = Config.secret.crypto.hashedKey;
const encryptedKey = Config.secret.crypto.encryptedKey;

export const generateHash256 = (data: any) => {
  const stringified = JSON.stringify(data);
  const secretKey = hashedKey;
  return CryptoJS.HmacSHA256(stringified, secretKey).toString();
};

export const generateHash512 = (data: any) => {
  const stringified = JSON.stringify(data);
  const secretKey = hashedKey;
  return CryptoJS.HmacSHA512(stringified, secretKey).toString();
};

export const encrypt = (value: any) => {
  const stringified = JSON.stringify(value);
  const secretKey = encryptedKey;
  return CryptoJS.AES.encrypt(stringified, secretKey).toString();
};

export const decrypt = (ciphertext: string) => {
  const secretKey = encryptedKey;
  return CryptoJS.AES.decrypt(ciphertext, secretKey);
};