import { encryptTransform } from 'redux-persist-transform-encrypt';

import { persistor } from '@/redux';

import { createEncryptedTransform } from './encryptedTransform';

jest
  .mock('@/config', () => ({
    secret: { crypto: { encryptedKey: 'encryptedKey' } }
  }))
  .mock('redux-persist-transform-encrypt', () => ({
    encryptTransform: jest.fn()
  }))
  .mock('@/redux', () => ({
    persistor: { purge: jest.fn() }
  }));

describe('encryptedTransform', () => {
  describe('#createEncryptedTransform', () => {
    const mockEncrypt = jest.fn();
    it('should call encryptTransform with correct config', () => {
      (encryptTransform as jest.Mock).mockReturnValue(mockEncrypt);

      const result = createEncryptedTransform();

      expect(encryptTransform).toHaveBeenCalledWith({
        secretKey: 'encryptedKey',
        onError: expect.any(Function)
      });
      expect(result).toBe(mockEncrypt);
    });

    it('should call purge on error', () => {
      const error = new Error('Test error');
      const args = (encryptTransform as jest.Mock).mock.calls[0][0];

      args.onError(error);

      expect(persistor.purge).toHaveBeenCalled();
    });
  });
});