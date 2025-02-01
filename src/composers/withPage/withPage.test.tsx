/* eslint-disable @typescript-eslint/no-explicit-any */
import { compose, withHandlers, withProps } from "react-recompose";

import withPage from "./withPage";

jest.mock('react-recompose');

describe('withPage', () => {
  const component = 'Component';
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

    const result = withPage(options)(component);

    expect(composeCallback).toHaveBeenCalledWith(component);
    expect(result).toEqual(composeResult);
  });

  it('should invoke compose with empty and without enhancers when enhancers is empty', () => {
    const options = {};
    // const enhancers: any[] = [];

    withPage(options)(component);

    expect(compose).toHaveBeenCalled();
  });

  describe('withProps', () => {
    it('should call withProps when `props` is present', () => {
      const options = { props: {} };

      withPage(options)(component);

      expect(withProps).toHaveBeenCalledWith(options.props);
    });

    it('should not call withProps when `props` is not present', () => {
      const options = {};

      withPage(options)(component);

      expect(withProps).not.toHaveBeenCalled();
    });
  });

  describe('withHandlers', () => {
    it('should call withHandlers when `handlers` is present', () => {
      const options = { handlers: {} };

      withPage(options)(component);

      expect(withHandlers).toHaveBeenCalledWith(options.handlers);
    });

    it('should not call withHandlers when `handlers` is not present', () => {
      const options = {};

      withPage(options)(component);

      expect(withHandlers).not.toHaveBeenCalled();
    });
  });
});