import { testProps, tid } from '@/lib/utils';

describe('testUtils', () => {

  describe('#testProps', () => {
    it('should be return correct test properties', () => {
      const testId = 'test-id';
      const props = testProps(testId);

      expect(props).toEqual({
        'data-testid': testId,
        'aria-label': testId
      });
    });
  });

  describe('#tid', () => {
    it('should be merge test ids correctly with multiple arguments', () => {
      const args = ['arg1', 'arg2', 'arg3'];
      const result = tid(...args);

      expect(result).toBe('arg1_arg2_arg3');
    });

    it('should be merge test ids correctly with empty arguments', () => {
      const args = ['arg1', '', 'arg3'];
      const result = tid(...args);

      expect(result).toBe('arg1__arg3');
    });
  });

});
