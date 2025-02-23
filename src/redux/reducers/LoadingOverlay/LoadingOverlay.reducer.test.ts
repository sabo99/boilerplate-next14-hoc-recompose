import reducer, { actions } from './LoadingOverlay.reducer';

describe('LoadingOverlay Reducer', () => {
  const initialState = {
    showLoadingOverlay: false
  };

  describe('#setShowLoadingOverlay', () => {
    it('should return the initial state when no action is passed', () => {
      const action = { type: '' };

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });

    it('should return showLoadingOverlay is true', () => {
      const action = { type: actions.setShowLoadingOverlay.type, payload: true };
      const expectedResult = { showLoadingOverlay: true };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

