import { createWebStorage } from '@/lib/utils';
import { createEncryptedTransform, createPersistTransform } from '@/redux/persist/transforms';

const persistKey = 'root';
const persistVersion = 1;
const storage = createWebStorage('session');
const whitelist = ['auth']; // will be persisted

export const persistConfig: any = {
  key: persistKey,
  version: persistVersion,
  storage,
  whitelist,
  transforms: [createPersistTransform(whitelist), createEncryptedTransform()]
};
