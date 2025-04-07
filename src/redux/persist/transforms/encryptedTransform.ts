import { encryptTransform } from 'redux-persist-transform-encrypt';

import Config from '@/config';
import { persistor } from '@/redux';

export const createEncryptedTransform = () => encryptTransform({
  secretKey: Config.secret.crypto.encryptedKey,
  onError: () => {
    persistor.purge();
  }
});