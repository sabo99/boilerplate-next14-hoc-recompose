import { fireEvent, render, waitFor } from '@testing-library/react';

import { session } from '@/fixtures';

import ExampleAuthentication from './ExampleAuthentication.component';

describe('ExampleAuthentication', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const pageTitle = 'Example with Authentication';
  const props = {
    screenName,
    pageTitle,
    permissions: [],
    session: {
      ...session,
      isAuthenticated: false
    },
    setSession: jest.fn(),
    setActiveAccount: jest.fn(),
    setAccounts: jest.fn(),
    clearSession: jest.fn(),
    clearAllSession: jest.fn(),
    setSelectedRelogAccount: jest.fn(),
    clearSelectedRelogAccount: jest.fn(),
    onHandleLogin: jest.fn(),
    onHandleLogout: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(<ExampleAuthentication {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render login form when is not authenticated', () => {
      const mainContainerId = `${screenName}_MainContainer`;
      const formId = `${screenName}_LoginForm`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(mainContainerId)).toBeTruthy();
      expect(getByTestId(formId)).toBeTruthy();
      expect(getByText('Please log in to access the page.')).toBeTruthy();
    });

    it('should render authenticated content when is authenticated', () => {
      const mainContainerId = `${screenName}_MainContainer`;
      const buttonId = `${screenName}_LogoutButton`;
      const mockProps = {
        ...props,
        session
      };

      const { rerender, getByTestId, getByText } = renderResult;
      rerender(<ExampleAuthentication {...mockProps} />);

      expect(getByTestId(mainContainerId)).toBeTruthy();
      expect(getByTestId(buttonId)).toBeTruthy();
      expect(getByText('Welcome to the authenticated page!')).toBeTruthy();
    });
  });

  describe('#onClick', () => {
    it('should call onHandleLogout when button logout is clicked', async () => {
      const buttonId = `${screenName}_LogoutButton`;
      const mockProps = {
        ...props,
        session
      };
      const { rerender, getByTestId } = renderResult;
      const expectedResult = expect.objectContaining({ form: expect.any(Object) });

      rerender(<ExampleAuthentication {...mockProps} />);
      fireEvent.click(getByTestId(buttonId));

      await waitFor(() => {
        expect(props.onHandleLogout).toHaveBeenCalledWith(expectedResult);
      });
    });
  });

  it('should call onHandleLogin when login form is submitted', async () => {
    const { getByLabelText, getByRole } = renderResult;
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByRole('button', { name: /login/i });
    const expectedResult = [
      { username: 'account123', password: 'password123' },
      expect.objectContaining({ form: expect.any(Object) })
    ];

    fireEvent.change(usernameInput, { target: { value: 'account123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(props.onHandleLogin).toHaveBeenCalledWith(...expectedResult);
    });
  });
});