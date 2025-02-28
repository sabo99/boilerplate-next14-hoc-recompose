import { cn, joinWith, testProps, tid } from './utils';

describe('utils', () => {

  describe('#cn', () => {
    it('should merge multiple class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should ignore false values', () => {
      expect(cn('class1', false && 'class2')).toBe('class1');
    });

    it('should ignore boolean values', () => {
      expect(cn('class1', true, 'class2')).toBe('class1 class2');
      expect(cn('class1', false, 'class2')).toBe('class1 class2');
    });

    it('should ignore empty strings', () => {
      expect(cn('class1', '', 'class2')).toBe('class1 class2');
    });

    it('should ignore undefined values', () => {
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
    });

    it('should ignore null values', () => {
      expect(cn('class1', null, 'class2')).toBe('class1 class2');
    });
  });

  describe('#testProps', () => {
    it('should return correct test properties', () => {
      const testId = 'test-id';
      const props = testProps(testId);

      expect(props).toEqual({
        'data-testid': testId,
        'aria-label': testId
      });
    });
  });

  describe('#joinWith', () => {
    it('should join strings using a custom separator', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = joinWith(args, '_');

      expect(result).toBe('arg1_arg2_arg3');
    });

    it('should join strings using the default separator when none is provided', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = joinWith(args);

      expect(result).toBe('arg1-arg2-arg3');
    });
  });

  describe('#createTestId', () => {
    it('should merge test ids correctly with multiple arguments', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = tid(...args);

      expect(result).toBe('arg1_arg2_arg3');
    });

    it('should merge test ids correctly with empty arguments', () => {
      const args = ['arg1', '', 'arg3'];
      const result = tid(...args);

      expect(result).toBe('arg1__arg3');
    });
  });

});
