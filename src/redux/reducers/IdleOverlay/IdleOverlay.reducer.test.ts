import reducer, { actions } from './IdleOverlay.reducer';

describe('LoadingOverlayReducer', () => {
  const initialState = {
    isIdleOverlay: false
  };

  describe('#setIdleOverlay', () => {
    it('should return the initial state when no action is passed', () => {
      const action = { type: '' };

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });

    it('should return isIdleOverlay is true', () => {
      const action = { type: actions.setIdleOverlay.type, payload: true };
      const expectedResult = { isIdleOverlay: true };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

