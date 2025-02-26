import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { mergeTestIds } from '@/lib/utils';
import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';

import ExampleLoadingOverlay from './ExampleLoadingOverlay.component';
import { DELAY, screenName } from './ExampleLoadingOverlay.config';

describe('ExampleLoadingOverlay component', () => {
  let renderResult: ReturnType<typeof render>;
  let store: any;
  const messages = ['default message...'];
  const progress = 0;
  const props = {
    messages,
    setMessages: jest.fn(),
    progress,
    setProgress: jest.fn(),
    setShowLoadingOverlay: jest.fn(),
    showLoadingOverlay: false,
    onHandleSubmit: jest.fn((values, { onBefore, onAfter }) => {
      onBefore();
      onAfter({ message: values.message });
    })
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        loadingOverlay: loadingOverlayReducer
      },
      preloadedState: {
        loadingOverlay: { showLoadingOverlay: false }
      }
    });

    renderResult = render(
      <Provider store={store}>
        <ExampleLoadingOverlay {...props} />
      </Provider>
    );
  });

  describe('#render', () => {
    it('should render without crashing', () => {
      const { container } = renderResult;

      expect(container).toBeInTheDocument();
    });

    it('should be render container with correct testId', () => {
      const styledContainerTestId = mergeTestIds(screenName, 'StyledContainer');

      const { getByTestId } = renderResult;

      expect(getByTestId(styledContainerTestId)).toBeTruthy();
    });

    it('should be render form with correct testId', () => {
      const styledFormTestId = mergeTestIds(screenName, 'StyledForm');
      const formLabelTestId = mergeTestIds(screenName, 'FormLabel');
      const inputTestId = mergeTestIds(screenName, 'Input');
      const formDescriptionTestId = mergeTestIds(screenName, 'FormDescription');
      const buttonTestId = mergeTestIds(screenName, 'SubmitButton');

      const { getByTestId } = renderResult;

      expect(getByTestId(styledFormTestId)).toBeTruthy();
      expect(getByTestId(formLabelTestId)).toBeTruthy();
      expect(getByTestId(formLabelTestId)).toHaveTextContent('Message');
      expect(getByTestId(inputTestId)).toBeTruthy();
      expect(getByTestId(inputTestId)).toHaveAttribute('placeholder', 'Input your message');
      expect(getByTestId(formDescriptionTestId)).toBeTruthy();
      expect(getByTestId(formDescriptionTestId)).toHaveTextContent('This is your public message.');
      expect(getByTestId(buttonTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toHaveAttribute('type', 'submit');
    });

    it('should be render table with correct testId', () => {
      const styledTableTestId = mergeTestIds(screenName, 'StyledTable');
      const tableCaptionTestId = mergeTestIds(screenName, 'TableCaption');
      const styledTableHeadTestId = mergeTestIds(screenName, 'StyledTableHead');
      const styledTableCellTestId = mergeTestIds(screenName, 'StyledTableCell', '0');

      const { getByTestId } = renderResult;

      expect(getByTestId(tableCaptionTestId)).toBeTruthy();
      expect(getByTestId(styledTableTestId)).toBeTruthy();
      expect(getByTestId(styledTableTestId)).toHaveTextContent('A list of your recent messages.');
      expect(getByTestId(styledTableHeadTestId)).toBeTruthy();
      expect(getByTestId(styledTableHeadTestId)).toHaveTextContent(/List Message/i);

      expect(getByTestId(styledTableCellTestId)).toBeTruthy();
      expect(getByTestId(styledTableCellTestId)).toHaveTextContent(messages[0]);
    });

    it('should render progress bar when progress is between 0 and 100', () => {
      const progressTestId = mergeTestIds(screenName, 'Progress');
      const progress = 50;
      const maxProgress = 100;
      const mockProps = {
        ...props,
        progress
      };
      const { getByTestId, rerender } = renderResult;

      rerender(
        <Provider store={store}>
          <ExampleLoadingOverlay {...mockProps} />
        </Provider>
      );

      expect(getByTestId(progressTestId)).toBeTruthy();
      expect(getByTestId(progressTestId).children[0]).toHaveAttribute('style', `transform: translateX(-${maxProgress - progress}%);`);
    });
  });

  describe('#onClick', () => {
    it('should invoke setMessages, setProgress and onHandleSubmit when on form submission button is clicked', async () => {
      const inputTestId = mergeTestIds(screenName, 'Input');
      const buttonTestId = mergeTestIds(screenName, 'SubmitButton');
      const payload = {
        values: { message: 'Open console.log to check sequential process', delay: DELAY },
        callbacks: { onBefore: expect.any(Function), onAfter: expect.any(Function) }
      };
      const { getByTestId } = renderResult;

      fireEvent.change(getByTestId(inputTestId), { target: { value: 'Test message' } });
      fireEvent.click(getByTestId(buttonTestId));

      await waitFor(() => {
        expect(props.onHandleSubmit).toHaveBeenCalledTimes(1);
        expect(props.onHandleSubmit).toHaveBeenCalledWith(payload.values, payload.callbacks);
        expect(props.setProgress).toHaveBeenCalledWith(25); // onBefore call
        expect(props.setProgress).toHaveBeenCalledWith(100); // onAfter call
        expect(props.setMessages).toHaveBeenCalledWith(expect.any(Function)); // onAfter updates messages
      });
    });

    it('should invoke reset form after submission', async () => {
      const inputTestId = mergeTestIds(screenName, 'Input');
      const buttonTestId = mergeTestIds(screenName, 'SubmitButton');
      const { getByTestId } = renderResult;

      fireEvent.change(getByTestId(inputTestId), 'Another test');
      fireEvent.click(getByTestId(buttonTestId));

      await waitFor(() => {
        expect(getByTestId(inputTestId)).toHaveValue('');
      });
    });
  });
});
