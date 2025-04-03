const Config = {
  env: process.env.APP_ENV,
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
  },
  headers: {
    accessTokenKey: process.env.NEXT_PUBLIC_AUTH_KEY
  },
  auth: {
    publicKeyPath: '',
    privateKeyPath: ''
  }
};

export default Config;