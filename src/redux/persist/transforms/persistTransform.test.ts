import { createPersistTransform } from './persistTransform';
import { transformInboundAuth, transformOutboundAuth } from './stateTransform/authTransform';

jest.mock('./stateTransform/authTransform', () => ({
  transformInboundAuth: jest.fn(),
  transformOutboundAuth: jest.fn()
}));

describe('PersistTransform', () => {

  const whitelist = ['auth'];
  const transform = createPersistTransform(whitelist);

  describe('#createPersistTransform', () => {
    describe('#auth', () => {
      const authState = {
        sessionId: 'abc',
        accessToken: 'token',
        refreshToken: 'refresh',
        userInfo: {}
      };

      it.each([
        ['inbound', transform.in, transformInboundAuth],
        ['outbound', transform.out, transformOutboundAuth]
      ])('should transform %s `auth` state correctly', (_, transformer, transformFn) => {
        const expectedResult = {
          ...authState,
          isAuthenticated: true
        };
        (transformFn as jest.Mock).mockReturnValue(expectedResult);

        const result = transformer(authState, 'auth');

        expect(result).toEqual(expectedResult);
      });
    });

    describe('#default', () => {
      it('should return unmodified when state is `default` keys', () => {
        const defaultState = { data: 'random' };

        const result1 = transform.in(defaultState, 'something');
        const result2 = transform.out(defaultState, 'something');

        expect(result1).toEqual(defaultState);
        expect(result2).toEqual(defaultState);
      });
    });
  });
});