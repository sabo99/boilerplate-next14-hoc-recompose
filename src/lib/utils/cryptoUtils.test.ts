import CryptoJS from 'crypto-js';

import { decrypt, encrypt, generateHash256, generateHash512 } from '@/lib/utils';

jest
  .mock('@/config', () => ({
    secret: {
      crypto: {
        hashedKey: 'testHashedKey',
        encryptedKey: 'testEncryptedKey'
      }
    }
  }))
  .mock('@/lib/utils/stringUtils')
  .mock('crypto-js');

describe('cryptoUtils', () => {
  describe('generateHash256', () => {
    it('should generate a valid SHA256 hash', () => {
      // Arrange
      const input = { username: 'johndoe' };
      const expectedResult = 'hashed256';
      (CryptoJS.HmacSHA256 as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const result = generateHash256(input);

      // Assert
      expect(result).toBe(expectedResult);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('generateHash512', () => {
    it('should generate a valid SHA512 hash', () => {
      // Arrange
      const input = { username: 'johndoe' };
      const expectedResult = 'hashed512';
      (CryptoJS.HmacSHA512 as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const result = generateHash512(input);

      // Assert
      expect(result).toBe(expectedResult);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('encrypt', () => {
    it('should encrypt a value into a ciphertext string', () => {
      // Arrange
      const input = { token: 'abc123' };
      const expectedResult = 'ciphertext';
      (CryptoJS.AES.encrypt as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const result = encrypt(input);

      // Assert
      expect(result).toBe(expectedResult);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('decrypt', () => {
    it('should decrypt a value and return correctly value', () => {
      // Arrange
      const ciphertext = 'ciphertext';
      const expectedResult = { token: 'abc123' };
      (CryptoJS.AES.decrypt as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const result = decrypt(ciphertext);

      // Assert
      expect(result).toBe(expectedResult);
    });
  });
});
