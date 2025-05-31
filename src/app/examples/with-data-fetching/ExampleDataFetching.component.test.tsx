import { fireEvent, render, waitFor } from '@testing-library/react';

import { products } from '@/fixtures';

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
  const limit = 5;
  const form = expect.any(Object);
  const props = {
    screenName,
    pageTitle,
    products,
    isLoadingProduct: false,
    onHandleRefetchProducts: jest.fn()
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
      const formId = `${screenName}_RefetchForm`;
      const productContainer = `${screenName}_ProductContainer`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(mainContainerId)).toBeTruthy();
      expect(getByTestId(formId)).toBeTruthy();
      expect(getByTestId(productContainer)).toBeTruthy();
      expect(getByText('Welcome to the data fetching page!')).toBeTruthy();
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