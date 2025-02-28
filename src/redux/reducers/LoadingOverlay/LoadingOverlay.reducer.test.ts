import reducer, { actions } from './LoadingOverlay.reducer';

describe('LoadingOverlay Reducer', () => {
  const initialState = {
    isLoadingOverlay: false
  };

  describe('#setShowLoadingOverlay', () => {
    it('should return the initial state when no action is passed', () => {
      const action = { type: '' };

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });

    it('should return showLoadingOverlay is true', () => {
      const action = { type: actions.setLoadingOverlay.type, payload: true };
      const expectedResult = { isLoadingOverlay: true };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

