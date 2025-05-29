import { cleanup } from '@testing-library/react';
import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withAuth from '@/composers/withAuth';
import withAxiosApiLifecycle from '@/composers/withAxiosApiLifecycle';
import withComposed from '@/composers/withComposed';
import withOverlay from '@/composers/withOverlay';
import withPreventRefresh from '@/composers/withPreventRefresh';
import withSidebar from '@/composers/withSidebar';

jest.mock('react-recompose')
  .mock('react-redux')
  .mock('@/composers/withAuth')
  .mock('@/composers/withSidebar')
  .mock('@/composers/withOverlay')
  .mock('@/composers/withAxiosApiLifecycle')
  .mock('@/composers/withPreventRefresh');

describe('withComposed', () => {
  type Props = { text: string };
  const Component = (props: Props) => <div>{props.text}</div>;
  const composeCallback = jest.fn();
  const composeResult = expect.any(Function);
  const uiSettings = {
    sidebar: true,
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
    cleanup();
    jest.clearAllMocks();
  });

  describe('#compose', () => {
    it('should invoke composeCallback and return composeResult', () => {
      const options = {};

      const result = withComposed<Props>(options)(Component);

      expect(composeCallback).toHaveBeenCalledWith(Component);
      expect(result).toEqual(composeResult);
    });

    it('should invoke compose with empty and without enhancers when enhancers is empty', () => {
      const options = {};

      withComposed<Props>(options)(Component);

      expect(compose).toHaveBeenCalled();
    });
  });

  describe('#withAuth', () => {
    it('should call withAuth enhancer when props `withAuthEnabled` is true', () => {
      const options = { withAuthEnabled: true };

      withComposed<Props>(options)(Component);

      expect(withAuth).toHaveBeenCalled();
    });

    it('should not call withAuth enhancer when props `withAuthEnabled` is false', () => {
      const options = { withAuthEnabled: false };

      withComposed<Props>(options)(Component);

      expect(withAuth).not.toHaveBeenCalled();
    });

    it('should not call withAuth enhancer when props `withAuthEnabled` not provided', () => {
      const options = {};

      withComposed<Props>(options)(Component);

      expect(withAuth).not.toHaveBeenCalled();
    });
  });

  describe('#withProps', () => {
    it('should invoke withProps when `props` is present', () => {
      const options = { props: defaultProps };

      withComposed<Props>(options)(Component);

      expect(withProps).toHaveBeenCalledWith(options.props);
    });

    it('should not invoke withProps when `props` is not present', () => {
      const options = {};

      withComposed<Props>(options)(Component);

      expect(withProps).not.toHaveBeenCalled();
    });
  });

  describe('#connectRedux', () => {
    it(`should invoke connect redux when 'connect' is present
      and is object includes mapStateToProps and mapDispatchToProps`, () => {
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

      withComposed<Props>(options)(Component);

      expect(connect).toHaveBeenCalled();
    });

    it('should not invoke connect redux when `connect` not present', () => {
      const options = {};

      withComposed<Props>(options)(Component);

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

      withComposed<Props>(options)(Component);

      expect(withState).toHaveBeenCalled();
    });

    it('should not invoke withState when `state` is present but empty array', () => {
      const options: any = {
        state: []
      };

      withComposed<Props>(options)(Component);

      expect(withState).not.toHaveBeenCalled();
    });
  });

  describe('#withSidebar', () => {
    it('should call withSidebar when uiSettings has `sidebar` is true', () => {
      const options = {
        uiSettings: {
          sidebar: true
        }
      };

      withComposed<Props>(options)(Component);

      expect(withSidebar).toHaveBeenCalled();
    });

    it('should not invoke withSidebar when uiSettings does not have `sidebar`', () => {
      const options: any = {
        uiSettings: {}
      };

      withComposed<Props>(options)(Component);

      expect(withSidebar).not.toHaveBeenCalled();
    });
  });

  describe('#withOverlay', () => {
    it('should call withOverlay when uiSettings has `overlay` includes overlayState and loaderType', () => {
      const options: any = {
        uiSettings: {
          overlay: uiSettings.overlay
        }
      };

      withComposed<Props>(options)(Component);

      expect(withOverlay).toHaveBeenCalled();
    });

    it('should not invoke withOverlay when uiSettings does not have `overlay`', () => {
      const options = {
        uiSettings: {}
      };

      withComposed<Props>(options)(Component);

      expect(withOverlay).not.toHaveBeenCalled();
    });
  });

  describe('#withPreventRefresh', () => {
    it('should call withPreventRefresh when uiSettings has `preventRefresh` include redirectPath is present', () => {
      const options: any = {
        uiSettings: {
          ...uiSettings,
          preventRefresh: { redirectPath: '/home' }
        }
      };

      withComposed<Props>(options)(Component);

      expect(withPreventRefresh).toHaveBeenCalledWith(options.uiSettings.preventRefresh);
    });

    it('should not call withPreventRefresh when uiSettings has `preventRefresh` is not present', () => {
      const options: any = { uiSettings };

      withComposed<Props>(options)(Component);

      expect(withPreventRefresh).not.toHaveBeenCalled();
    });
  });

  describe('#withAxiosApiLifecycle', () => {
    it('should invoke withAxiosApiLifecycle when `api` is present', () => {
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

      withComposed<Props>(options)(Component);

      expect(withAxiosApiLifecycle).toHaveBeenCalledWith({ apiOptions: options.api });
    });

    it('should not invoke withAxiosApiLifecycle when `api` is present but empty array', () => {
      const options: any = {
        api: []
      };

      withComposed<Props>(options)(Component);

      expect(withAxiosApiLifecycle).not.toHaveBeenCalledWith({ apiOptions: options.api });
    });
  });

  describe('#withHandlers', () => {
    it('should invoke withHandlers when `handlers` is present', () => {
      const options = { handlers: { setFunction: jest.fn() } };

      withComposed<Props>(options)(Component);

      expect(withHandlers).toHaveBeenCalledWith(options.handlers);
    });

    it('should not invoke withHandlers when `handlers` is not present', () => {
      const options = {};

      withComposed<Props>(options)(Component);

      expect(withHandlers).not.toHaveBeenCalled();
    });
  });

});
