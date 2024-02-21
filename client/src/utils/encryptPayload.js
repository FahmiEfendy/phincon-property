import { AES } from 'crypto-js';

const encryptPayload = (data) => {
  try {
    if (typeof data === 'object') {
      return AES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_SECRET).toString();
    }
    if (typeof data === 'string') {
      return AES.encrypt(data, import.meta.env.VITE_CRYPTO_SECRET).toString();
    }
  } catch (error) {
    Promise.reject(error);
  }
};

export default encryptPayload;
