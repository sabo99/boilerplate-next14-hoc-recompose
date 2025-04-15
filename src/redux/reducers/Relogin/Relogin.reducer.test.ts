import reducer, { actions } from './Relogin.reducer';
describe('reloginReducer', () => {
  const initialState = {
    selectedRelogAccount: null
  };

  describe('#setSelectedRelogAccount', () => {
    it('should return selectedRelogAccount when action is setSelectedRelogAccount.type', () => {
      const selectedRelogAccount = { email: 'mail@mail.com' };
      const action = { type: actions.setSelectedRelogAccount.type, payload: selectedRelogAccount };
      const expectedResult = {
        selectedRelogAccount
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#clearSelectedRelogAccount', () => {
    it('should return initialState when action is clearSelectedRelogAccount.type', () => {
      const action = { type: actions.clearSelectedRelogAccount.type };
      const result = reducer(initialState, action);
  
      expect(result).toEqual(initialState);
    });
  });
});