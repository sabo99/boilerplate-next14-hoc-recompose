const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    }
  };
};

type StorageType = 'local' | 'session';
type WebStorageType = 'localStorage' | 'sessionStorage';

export const createWebStorage = (type: StorageType) => {
  if (typeof window === 'undefined') {
    return createNoopStorage();
  }

  const storage = window[`${type}Storage` as WebStorageType];

  return {
    getItem: (key: string) => Promise.resolve(storage.getItem(key)),
    setItem: (key: string, value: string) => Promise.resolve(storage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(storage.removeItem(key))
  };
};
