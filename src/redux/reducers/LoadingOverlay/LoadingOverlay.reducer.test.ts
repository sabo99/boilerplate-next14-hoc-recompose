import reducer, { actions } from './LoadingOverlay.reducer';

describe('LoadingOverlayReducer', () => {
  const initialState = {
    isLoadingOverlay: false
  };

  describe('#setLoadingOverlay', () => {
    it('should return the initial state when no action is passed', () => {
      const action = { type: '' };

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });

    it('should return isLoadingOverlay is true', () => {
      const action = { type: actions.setLoadingOverlay.type, payload: true };
      const expectedResult = { isLoadingOverlay: true };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

