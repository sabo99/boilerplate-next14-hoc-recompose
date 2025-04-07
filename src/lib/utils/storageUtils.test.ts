import { createWebStorage } from '@/lib/utils';

describe('storageUtils', () => {
  describe('createWebStorage', () => {
    const mockStorage = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: () => {
          store = {};
        }
      };
    })();

    beforeEach(() => {
      (global as any).window = {
        localStorage: mockStorage,
        sessionStorage: mockStorage
      };
    });

    afterEach(() => {
      delete (global as any).window;
      mockStorage.clear();
      jest.clearAllMocks();
    });

    it('should return noop storage when window is undefined', async () => {
      // Arrange
      delete (global as any).window;
      const storage = createWebStorage('local');

      // Act
      const get = await storage.getItem('key');
      const set = await storage.setItem('key', 'value');
      const remove = await storage.removeItem('key');

      // Assert
      expect(get).toBe(null);
      expect(set).toBeUndefined();
      expect(remove).toBeUndefined();
    });

    it('should use localStorage when type is "local"', async () => {
      // Arrange
      const storage = createWebStorage('local');

      // Act
      await storage.setItem('key', 'value');
      const value = await storage.getItem('key');
      await storage.removeItem('key');

      // Assert
      expect(mockStorage.setItem).toHaveBeenCalledWith('key', 'value');
      expect(value).toBe('value');
      expect(mockStorage.removeItem).toHaveBeenCalledWith('key');
    });

    it('should use sessionStorage when type is "session"', async () => {
      // Arrange
      const storage = createWebStorage('session');

      // Act
      await storage.setItem('sessionKey', 'sessionValue');
      const value = await storage.getItem('sessionKey');
      await storage.removeItem('sessionKey');

      // Assert
      expect(mockStorage.setItem).toHaveBeenCalledWith('sessionKey', 'sessionValue');
      expect(value).toBe('sessionValue');
      expect(mockStorage.removeItem).toHaveBeenCalledWith('sessionKey');
    });
  });
});
