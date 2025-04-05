import { cn, getInitials, joinWith } from '@/lib/utils';

describe('stringUtils', () => {

  describe('#cn', () => {
    it('should be merge multiple class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should be ignore false values', () => {
      expect(cn('class1', false && 'class2')).toBe('class1');
    });

    it('should be ignore boolean values', () => {
      expect(cn('class1', true, 'class2')).toBe('class1 class2');
      expect(cn('class1', false, 'class2')).toBe('class1 class2');
    });

    it('should be ignore empty strings', () => {
      expect(cn('class1', '', 'class2')).toBe('class1 class2');
    });

    it('should be ignore undefined values', () => {
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
    });

    it('should be ignore null values', () => {
      expect(cn('class1', null, 'class2')).toBe('class1 class2');
    });
  });

  describe('#joinWith', () => {
    it('should be join strings using a custom separator', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = joinWith(args, '_');

      expect(result).toBe('arg1_arg2_arg3');
    });

    it('should be join strings using the default separator when none is provided', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = joinWith(args);

      expect(result).toBe('arg1-arg2-arg3');
    });
  });

  describe('#getInitials', () => {
    it('should return initials of the first word', () => {
      const value = 'Bob';
      const expectedResult = 'B';

      const result = getInitials(value);

      expect(result).toEqual(expectedResult);
    });

    it('should return initials of the first two words', () => {
      const value = 'Bob Marley Handler';
      const expectedResult = 'BM';

      const result = getInitials(value);

      expect(result).toEqual(expectedResult);
    });
  });
});
