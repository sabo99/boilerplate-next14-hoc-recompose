import { stateList } from "./ExampleLoadingOverlay.container";

describe('ExampleLoadingOverlayContainer', () => {
  describe('#stateList', () => {
    it('should be return the correct stateList', () => {
      const expectedResult = [
        ['messages', 'setMessages', ['default message...']],
        ['progress', 'setProgress', 0]
      ];

      expect(stateList).toEqual(expectedResult);
    });
    it('should be return the incorrect stateList', () => {
      const expectedResult = [
        ['messages', 'setMessages', ['default message...']]
      ];

      expect(stateList).not.toEqual(expectedResult);
    });
  });
});