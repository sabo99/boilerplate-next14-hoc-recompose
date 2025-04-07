const crypto = {
  hashedKey: process.env.CRYPTO_HASHED_KEY as string,
  encryptedKey: process.env.CRYPTO_ENCRYPTED_KEY as string
};

const Config = {
  env: process.env.APP_ENV as string,
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string
  },
  headers: {
    accessTokenKey: process.env.NEXT_PUBLIC_AUTH_KEY as string
  },
  secret: {
    crypto
  }
};

export default Config;