import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withLoadingOverlay from '../withLoadingOverlay';
import withPreventRefresh from '../withPreventRefresh';
import withPage from './withPage';

jest.mock('react-recompose')
  .mock('react-redux')
  .mock('../withLoadingOverlay')
  .mock('../withPreventRefresh');

describe('withPage', () => {
  const Component = () => <div>Component</div>;
  const composeCallback = jest.fn();
  const composeResult = {};

  beforeEach(() => {
    composeCallback.mockReturnValue(composeResult);
    (compose as jest.Mock).mockReturnValue(composeCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#compose', () => {
    it('should invoke composeCallback and return composeResult', () => {
      const options = {};

      const result = withPage(options)(Component);

      expect(composeCallback).toHaveBeenCalledWith(Component);
      expect(result).toEqual(composeResult);
    });

    it('should invoke compose with empty and without enhancers when enhancers is empty', () => {
      const options = {};
      // const enhancers: any[] = [];

      withPage(options)(Component);

      expect(compose).toHaveBeenCalled();
    });
  });

  describe('#withProps', () => {
    it('should invoke withProps when `props` is present', () => {
      const options = { props: {} };

      withPage(options)(Component);

      expect(withProps).toHaveBeenCalledWith(options.props);
    });

    it('should not invoke withProps when `props` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withProps).not.toHaveBeenCalled();
    });
  });

  describe('#connectRedux', () => {
    it('should invoke connect redux when `connect` is present and is object includes mapStateToProps and mapDispatchToProps', () => {
      const options = {
        connect: {
          mapStateToProps: {
            isLoading: true
          },
          mapDispatchToProps: {
            setLoading: jest.fn()
          }
        }
      };

      withPage(options)(Component);

      expect(connect).toHaveBeenCalled();
    });

    it('should not invoke connect redux when `connect` is present but empty object', () => {
      const options = {
        connect: {}
      };

      withPage(options)(Component);

      expect(connect).not.toHaveBeenCalled();
    });

    it('should not invoke connect redux when `connect` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(connect).not.toHaveBeenCalled();
    });
  });

  describe('#withState', () => {
    it('should invoke withState when `state` is present', () => {
      const options: any = {
        state: [
          ['isLoading', 'setLoading', false]
        ]
      };

      withPage(options)(Component);

      expect(withState).toHaveBeenCalled();
    });

    it('should not invoke withState when `state` is present but empty array', () => {
      const options: any = {
        state: []
      };

      withPage(options)(Component);

      expect(withState).not.toHaveBeenCalled();
    });
  });

  describe('#withHandlers', () => {
    it('should invoke withHandlers when `handlers` is present', () => {
      const options = { handlers: {} };

      withPage(options)(Component);

      expect(withHandlers).toHaveBeenCalledWith(options.handlers);
    });

    it('should not invoke withHandlers when `handlers` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withHandlers).not.toHaveBeenCalled();
    });
  });

  describe('#withPreventRefresh', () => {
    it('should invoke withPreventRefresh when uiSettings has `preventRefresh` include redirectPath is present', () => {
      const options = {
        uiSettings: {
          preventRefresh: { redirectPath: '/home' }
        }
      };

      withPage(options)(Component);

      expect(withPreventRefresh).toHaveBeenCalledWith(options.uiSettings.preventRefresh);
    });

    it('should not invoke withPreventRefresh when uiSettings has `preventRefresh` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withPreventRefresh).not.toHaveBeenCalled();
    });
  });

  describe('#withLoadingOverlay', () => {
    it('should invoke withLoadingOverlay when uiSettings has `loadingOverlay` includes enabled loading overlay is true', () => {
      const options: any = {
        uiSettings: {
          loadingOverlay: {
            enabledLoadingOverlay: true,
            loadingVariant: 'DOTS'
          }
        }
      };

      withPage(options)(Component);

      expect(withLoadingOverlay).toHaveBeenCalled();
    });

    it('should not invoke withLoadingOverlay when uiSettings has `loadingOverlay` includes enabled loading overlay is true', () => {
      const options: any = {
        uiSettings: {
          loadingOverlay: {
            enabledLoadingOverlay: false,
            loadingVariant: 'DOTS'
          }
        }
      };

      withPage(options)(Component);

      expect(withLoadingOverlay).not.toHaveBeenCalled();
    });
  });
});