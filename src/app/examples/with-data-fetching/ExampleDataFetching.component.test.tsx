import { fireEvent, render, waitFor } from '@testing-library/react';

import { products, session } from '@/fixtures';

import ExampleDataFetching from './ExampleDataFetching.component';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn()
  }))
}));

describe('ExampleDataFetching', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const pageTitle = 'Example Data Fetching';
  const username = 'userRandom123';
  const password = 'userRandom123pass';
  const limit = 5;
  const form = expect.any(Object);
  const props = {
    screenName,
    pageTitle,
    products,
    isLoadingProduct: false,
    session,
    onHandleLogin: jest.fn(),
    onHandleRefetchProducts: jest.fn(),
    onHandleLogout: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(
      <ExampleDataFetching {...props as any} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const mainContainerId = `${screenName}_MainContainer`;

      const { getByTestId } = renderResult;

      expect(getByTestId(mainContainerId)).toBeTruthy();
    });

    it('should render unauthenticated content when session.isAuthenticated is false or null', () => {
      const formId = `${screenName}_LoginForm`;
      const mockProps = {
        ...props,
        session: { isAuthenticated: false }
      };

      const { getByTestId, getByText, rerender } = renderResult;
      rerender(<ExampleDataFetching {...mockProps as any} />);

      expect(getByTestId(formId)).toBeTruthy();
      expect(getByText('Please log in to access the page.')).toBeTruthy();
    });

    it('should render authenticated content when session.isAuthenticated is true', () => {
      const formId = `${screenName}_RefetchForm`;
      const logoutBtnId = `${screenName}_LogoutButton`;
      const productContainer = `${screenName}_ProductContainer`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(formId)).toBeTruthy();
      expect(getByTestId(logoutBtnId)).toBeTruthy();
      expect(getByTestId(productContainer)).toBeTruthy();
      expect(getByText('Welcome to the authenticated page!')).toBeTruthy();
      expect(getByText('You are logged in.')).toBeTruthy();
    });

    it('should render loading product when isLoadingProduct is true', () => {
      const loadingId = `${screenName}_LoadingProduct`;
      const mockProps = {
        ...props,
        isLoadingProduct: true
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<ExampleDataFetching {...mockProps as any} />);

      expect(getByTestId(loadingId)).toBeTruthy();
    });

    it('should render products when isLoadingProduct is false', () => {
      const product = products[0];

      const { getByText } = renderResult;

      expect(getByText(product.title)).toBeTruthy();
      expect(getByText(product.description)).toBeTruthy();
    });
  });

  describe('#onSubmit', () => {
    it('should called onHandleLogin and onHandleRefetchProducts when LoginForm onSubmit', async () => {
      const usernameLabel = /username/i;
      const passwordLabel = /password/i;
      const btnId = `${screenName}_LoginForm_LoginButton`;
      const mockProps = {
        ...props,
        session: { isAuthenticated: false }
      };
      const payload = { username, password };
      const options = { form };

      const { rerender, getByLabelText, getByTestId } = renderResult;
      rerender(<ExampleDataFetching {...mockProps as any} />);
      fireEvent.change(getByLabelText(usernameLabel), { target: { value: username } });
      fireEvent.change(getByLabelText(passwordLabel), { target: { value: password } });
      fireEvent.click(getByTestId(btnId));

      await waitFor(() => {
        expect(props.onHandleLogin).toHaveBeenCalledWith(payload, options);
        expect(props.onHandleRefetchProducts).toHaveBeenCalled();

      });
    });

    it('should called onHandleLogout when LogoutButton is clicked', async () => {
      const btnId = `${screenName}_LogoutButton`;

      const { getByTestId } = renderResult;
      fireEvent.click(getByTestId(btnId));

      await waitFor(() => {
        expect(props.onHandleRefetchProducts).toHaveBeenCalledTimes(1);
      });
    });

    it('should called onHandleRefetchProducts when RefrechForm onSubmit', async () => {
      const limitLabel = /limit/i;
      const btnId = `${screenName}_RefetchForm_RefetchButton`;
      const payload = { limit };
      const options = { form };

      const { getByLabelText, getByTestId } = renderResult;
      fireEvent.change(getByLabelText(limitLabel), { target: { value: limit } });
      fireEvent.click(getByTestId(btnId));

      await waitFor(() => {
        expect(props.onHandleRefetchProducts).toHaveBeenCalledWith(payload, options);
      });
    });
  });
});