import { compose, withProps } from 'react-recompose';

import withIdlePopupOverlay from '../withIdlePopupOverlay';
import withLoadingOverlay from '../withLoadingOverlay';
import withOverlay from './withOverlay';
import { Options } from './withOverlay.types';

jest.mock('react-recompose')
  .mock('../withIdlePopupOverlay')
  .mock('../withLoadingOverlay');

describe('withOverlay', () => {
  const Component = () => <div>Component</div>;
  const composeCallback = jest.fn();
  const composeResult = {};
  const options: Options = {
    overlayState: 'LOADING',
    loaderType: 'DOTS'
  };

  beforeEach(() => {
    composeCallback.mockReturnValue(composeResult);
    (compose as jest.Mock).mockReturnValue(composeCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#withProps', () => {
    it('should invoke withProps when `options` is present', () => {
      withOverlay(options)(Component);

      expect(withProps).toHaveBeenCalledWith(options);
    });
  });

  describe('#withIdlePopupOverlay', () => {
    it('should invoke withIdlePopupOverlay when `options` overlayState is IDLE', () => {
      const mockOptions: any = {
        ...options,
        overlayState: 'IDLE'
      };

      withOverlay(mockOptions)(Component);

      expect(withIdlePopupOverlay).toHaveBeenCalled();
    });
  });

  describe('#withLoadingOverlay', () => {
    it('should invoke withLoadingOverlay when `options` overlayState is LOADING', () => {
      const mockOptions: any = {
        ...options,
        overlayState: 'LOADING'
      };

      withOverlay(mockOptions)(Component);

      expect(withLoadingOverlay).toHaveBeenCalled();
    });
  });
});