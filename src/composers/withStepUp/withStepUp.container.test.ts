import { mapStepUpPasswordToProps } from './withStepUp.container';
describe('withStepUpPasswordContainer', () => {
  describe('#mapStepUpPasswordToProps', () => {
    const axiosApiInstance = {
      request: {
        send: jest.fn()
      },
      response: {
        loading: false,
        error: null,
        data: 'success'
      }
    };

    it('should return the correct mapStepUpPasswordToProps', () => {
      const expectedResult = {
        verifyStepUpPassword: expect.any(Function)
      };
      const params = { apiOptions: { params: { limit: 10 } } };

      const result = mapStepUpPasswordToProps(axiosApiInstance);
      result.verifyStepUpPassword(params);

      expect(result).toEqual(expectedResult);
      expect(axiosApiInstance.request.send).toHaveBeenCalled();
    });
  });
});