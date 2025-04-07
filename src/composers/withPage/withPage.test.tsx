import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withAxiosApi from '../withAxiosApi';
import withLoadingOverlay from '../withLoadingOverlay';
import withOverlay from '../withOverlay';
import withPreventRefresh from '../withPreventRefresh';
import withSidebar from '../withSidebar';
import withPage from './withPage';

jest.mock('react-recompose')
  .mock('react-redux')
  .mock('../withAuth')
  .mock('../withSidebar')
  .mock('../withOverlay')
  .mock('../withLoadingOverlay')
  .mock('../withAxiosApi')
  .mock('../withPreventRefresh');

describe('withPage', () => {
  const Component = () => <div>Component</div>;
  const composeCallback = jest.fn();
  const composeResult = {};
  const uiSettings = {
    sidebar: {
      isAuthenticated: true
    },
    overlay: {
      overlayState: 'LOADING',
      loaderType: 'DOTS'
    }
  };
  const defaultProps = {
    screenName: 'ScreenName',
    pageTitle: 'PageTitle',
    permissions: ['VIEW_MENU']
  };

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

      withPage(options)(Component);

      expect(compose).toHaveBeenCalled();
    });
  });

  // describe('#withAuth', () => {
  //   it('should invoke withAuth when withPage is called', () => {
  //     const options = {};

  //     withPage(options)(Component);

  //     expect(withAuth).toHaveBeenCalled();
  //   });
  // })

  describe('#withProps', () => {
    it('should invoke withProps when `props` is present', () => {
      const options = { props: defaultProps };

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
    it(`should invoke connect redux when 'connect' is present
      and is object includes mapStateToProps and mapDispatchToProps`, () => {
      const options: any = {
        uiSettings,
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

  describe('#withSidebar', () => {
    it('should invoke withSidebar when uiSettings has `sidebar` includes isAuthenticated is true', () => {
      const options: any = {
        uiSettings: {
          sidebar: uiSettings.sidebar
        }
      };

      withPage(options)(Component);

      expect(withSidebar).toHaveBeenCalled();
    });

    it('should not invoke withSidebar when uiSettings does not have `sidebar`', () => {
      const options: any = {
        uiSettings: {}
      };

      withPage(options)(Component);

      expect(withSidebar).not.toHaveBeenCalled();
    });

  });

  describe('#withOverlay', () => {
    it('should invoke withOverlay when uiSettings has `overlay` includes overlayState and loaderType', () => {
      const options: any = {
        uiSettings: {
          overlay: uiSettings.overlay
        }
      };

      withPage(options)(Component);

      expect(withOverlay).toHaveBeenCalled();
    });

    it('should not invoke withOverlay when uiSettings does not have `overlay`', () => {
      const options = {
        uiSettings: {}
      };

      withPage(options)(Component);

      expect(withOverlay).not.toHaveBeenCalled();
    });
  });

  describe('#withPreventRefresh', () => {
    it('should invoke withPreventRefresh when uiSettings has `preventRefresh` include redirectPath is present', () => {
      const options: any = {
        uiSettings: {
          ...uiSettings,
          preventRefresh: { redirectPath: '/home' }
        }
      };

      withPage(options)(Component);

      expect(withPreventRefresh).toHaveBeenCalledWith(options.uiSettings.preventRefresh);
    });

    it('should not invoke withPreventRefresh when uiSettings has `preventRefresh` is not present', () => {
      const options: any = { uiSettings };

      withPage(options)(Component);

      expect(withPreventRefresh).not.toHaveBeenCalled();
    });
  });

  describe('#withAxiosApi', () => {
    it('should invoke withLoadingOverlay and withAxiosApi when `api` is present', () => {
      const options: any = {
        api: [
          {
            url: '/products',
            method: 'GET',
            mapProps: jest.fn(),
            options: {
              skipApiOnRender: true,
              params: { limit: 10 }
            }
          },
          {
            url: '/carts',
            method: 'GET',
            mapProps: jest.fn(),
            options: {
              headers: { 'Content-Type': 'application/json' }
            }
          }
        ]
      };

      withPage(options)(Component);

      expect(withLoadingOverlay).toHaveBeenCalled();
      expect(withAxiosApi).toHaveBeenNthCalledWith(1, options.api[0]);
      expect(withAxiosApi).toHaveBeenNthCalledWith(2, options.api[1]);
    });
  });

  describe('#withHandlers', () => {
    it('should invoke withHandlers when `handlers` is present', () => {
      const options = { handlers: { setLoading: jest.fn() } };

      withPage(options)(Component);

      expect(withHandlers).toHaveBeenCalledWith(options.handlers);
    });

    it('should not invoke withHandlers when `handlers` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withHandlers).not.toHaveBeenCalled();
    });
  });
});