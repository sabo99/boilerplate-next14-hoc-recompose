import { compose, withHandlers, withProps } from "react-recompose";

import withLoadingOverlay from "../withLoadingOverlay";
import withPreventRefresh from "../withPreventRefresh";
import withPage from "./withPage";

jest.mock('react-recompose')
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

  describe('withProps', () => {
    it('should call withProps when `props` is present', () => {
      const options = { props: {} };

      withPage(options)(Component);

      expect(withProps).toHaveBeenCalledWith(options.props);
    });

    it('should not call withProps when `props` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withProps).not.toHaveBeenCalled();
    });
  });

  describe('withHandlers', () => {
    it('should call withHandlers when `handlers` is present', () => {
      const options = { handlers: {} };

      withPage(options)(Component);

      expect(withHandlers).toHaveBeenCalledWith(options.handlers);
    });

    it('should not call withHandlers when `handlers` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withHandlers).not.toHaveBeenCalled();
    });
  });

  describe('withPreventRefresh', () => {
    it('should call withPreventRefresh when `preventRefresh` include redirectPath is present', () => {
      const options = { preventRefresh: { redirectPath: '/home' } };

      withPage(options)(Component);

      expect(withPreventRefresh).toHaveBeenCalledWith(options.preventRefresh);
    });

    it('should not call withPreventRefresh when `preventRefresh` is not present', () => {
      const options = {};

      withPage(options)(Component);

      expect(withPreventRefresh).not.toHaveBeenCalled();
    });
  });

  describe('withLoadingOverlay', () => {
    it('should call withLoadingOverlay when `loadingOverlay` is true', () => {
      const options = { loadingOverlay: true };

      withPage(options)(Component);

      expect(withLoadingOverlay).toHaveBeenCalled();
    });

    it('should not call withLoadingOverlay when `loadingOverlay` is false', () => {
      const options = { loadingOverlay: false };

      withPage(options)(Component);

      expect(withLoadingOverlay).not.toHaveBeenCalled();
    });
  });
});