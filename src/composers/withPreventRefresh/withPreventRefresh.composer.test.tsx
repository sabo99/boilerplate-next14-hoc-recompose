import { cleanup, render } from '@testing-library/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useBeforeunload } from 'react-beforeunload';

import withPreventRefresh from './withPreventRefresh.composer';

jest
  .mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    redirect: jest.fn()
  }))
  .mock('react-beforeunload', () => ({
    useBeforeunload: jest.fn()
  }));

describe('withPreventRefresh', () => {
  const Component = () => <div>Component</div>;
  const options = {
    redirectPath: '/redirect'
  };
  const router = {
    prefetch: jest.fn()
  };
  const pathname = '/redirect';
  const eventBeforeunload = {
    preventDefault: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should prevent refresh when user tries to refresh the page', () => {
    const WrappedComponent = withPreventRefresh(options)(Component);

    render(<WrappedComponent />);

    expect(useBeforeunload).toHaveBeenCalled();
  });

  it('should redirect to the specified path', () => {
    const WrappedComponent = withPreventRefresh(options)(Component);

    render(<WrappedComponent />);

    expect(redirect).toHaveBeenCalledWith(options.redirectPath);
  });

  it('should invoke router.prefetch when pathname equal to redirectPath', () => {
    const WrappedComponent = withPreventRefresh(options)(Component);
    (usePathname as jest.Mock).mockReturnValue(pathname);

    render(<WrappedComponent />);

    expect(router.prefetch).toHaveBeenCalledWith(options.redirectPath);
    expect(redirect).not.toHaveBeenCalledWith(options.redirectPath);
  });

  it('should invoke redirect when pathname not equal to redirectPath', () => {
    const WrappedComponent = withPreventRefresh(options)(Component);
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<WrappedComponent />);

    expect(router.prefetch).not.toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(options.redirectPath);
  });

  it('should not invoke prevent unload when alertDialogOption is provided with default options', () => {
    const options = {
      redirectPath: '/test',
      alertDialogOption: {
        onAction: jest.fn()
      }
    };
    const WrappedComponent = withPreventRefresh(options)(Component);

    (useBeforeunload as jest.Mock).mockImplementation((callback) => {
      callback(eventBeforeunload);
    });

    const { queryAllByTestId } = render(<WrappedComponent />);

    expect(queryAllByTestId(/PreventRefresh/i)).toBeTruthy();
    expect(queryAllByTestId(/AppAlertDialog/i)).toBeTruthy();
    expect(queryAllByTestId('Warning')).toBeTruthy();
    expect(queryAllByTestId('Are you sure you want to leave this page?')).toBeTruthy();
    expect(queryAllByTestId('Leave')).toBeTruthy();
    expect(eventBeforeunload.preventDefault).not.toHaveBeenCalled();
    expect(options.alertDialogOption.onAction).not.toHaveBeenCalled();
  });

  it('should not invoke prevent unload when alertDialogOption is provided with custom options', () => {
    const options = {
      redirectPath: '/test',
      alertDialogOption: {
        title: 'Title',
        description: 'Description',
        actionText: 'Action',
        onAction: jest.fn()
      }
    };
    const WrappedComponent = withPreventRefresh(options)(Component);

    (useBeforeunload as jest.Mock).mockImplementation((callback) => {
      callback(eventBeforeunload);
    });

    const { queryAllByTestId } = render(<WrappedComponent />);

    expect(queryAllByTestId(/PreventRefresh/i)).toBeTruthy();
    expect(queryAllByTestId(/AppAlertDialog/i)).toBeTruthy();
    expect(queryAllByTestId(options.alertDialogOption.title)).toBeTruthy();
    expect(queryAllByTestId(options.alertDialogOption.description)).toBeTruthy();
    expect(queryAllByTestId(options.alertDialogOption.actionText)).toBeTruthy();
    expect(eventBeforeunload.preventDefault).not.toHaveBeenCalled();
    expect(options.alertDialogOption.onAction).not.toHaveBeenCalled();
  });

  it('should invoke prevent unload when alertDialogOption is not provided', () => {
    const WrappedComponent = withPreventRefresh(options)(Component);

    (useBeforeunload as jest.Mock).mockImplementation((callback) => {
      callback(eventBeforeunload);
    });

    render(<WrappedComponent />);

    expect(eventBeforeunload.preventDefault).toHaveBeenCalled();
  });
});
