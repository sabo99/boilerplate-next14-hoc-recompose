import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import ExampleLoadingOverlay from './ExampleLoadingOverlay.component';
import ExampleLoadingOverlayConfig from './ExampleLoadingOverlay.config';

const { delay: DELAY, screenName } = ExampleLoadingOverlayConfig;

describe('ExampleLoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const messages = ['default message...'];
  const progress = 0;
  const props = {
    screenName,
    pageTitle: 'Example Loading Overlay',
    messages,
    setMessages: jest.fn(),
    progress,
    setProgress: jest.fn(),
    setLoadingOverlay: jest.fn(),
    isLoadingOverlay: false,
    onHandleSubmit: jest.fn((values, { onBefore, onAfter }) => {
      onBefore();
      onAfter({ delay: 3 });
    })
  };

  beforeEach(() => {
    jest.useFakeTimers();

    renderResult = render(
      <ExampleLoadingOverlay {...props as any} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should be render without crashing', () => {
      const { container } = renderResult;

      expect(container).toBeInTheDocument();
    });

    it('should be render container with correct testId', () => {
      const styledContainerTestId = `${screenName}_StyledContainer`;

      const { getByTestId } = renderResult;

      expect(getByTestId(styledContainerTestId)).toBeTruthy();
    });

    it('should be render form with correct testId', () => {
      const styledFormTestId = `${screenName}_StyledForm`;
      const formLabelMessageTestId = `${screenName}_FormLabel_message`;
      const inputMessageTestId = `${screenName}_Input_message`;
      const formDescriptionMessageTestId = `${screenName}_FormDescription_message`;
      const buttonTestId = `${screenName}_SubmitButton`;

      const { getByTestId } = renderResult;

      expect(getByTestId(styledFormTestId)).toBeTruthy();
      expect(getByTestId(formLabelMessageTestId)).toBeTruthy();
      expect(getByTestId(formLabelMessageTestId)).toHaveTextContent('Message');
      expect(getByTestId(inputMessageTestId)).toBeTruthy();
      expect(getByTestId(inputMessageTestId)).toHaveAttribute('placeholder', 'Input your message');
      expect(getByTestId(formDescriptionMessageTestId)).toBeTruthy();
      expect(getByTestId(formDescriptionMessageTestId)).toHaveTextContent('This is your public message.');
      expect(getByTestId(buttonTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toHaveAttribute('type', 'submit');
    });

    it('should be render table with correct testId', () => {
      const styledTableContainerTestId = `${screenName}_StyledTableContainer`;
      const tableCaptionTestId = `${screenName}_TableCaption`;
      const styledTableHeadTestId = `${screenName}_StyledTableHead`;
      const styledTableCellTestId = `${screenName}_StyledTableCell_0`;

      const { getByTestId } = renderResult;

      expect(getByTestId(tableCaptionTestId)).toBeTruthy();
      expect(getByTestId(styledTableContainerTestId)).toBeTruthy();
      expect(getByTestId(styledTableContainerTestId)).toHaveTextContent('A list of your recent messages.');
      expect(getByTestId(styledTableHeadTestId)).toBeTruthy();
      expect(getByTestId(styledTableHeadTestId)).toHaveTextContent(/List Message/i);
      expect(getByTestId(styledTableCellTestId)).toBeTruthy();
      expect(getByTestId(styledTableCellTestId)).toHaveTextContent(messages[0]);
    });

    it('should render progress bar when progress is between 0 and 100', () => {
      const progressTestId = `${screenName}_Progress`;
      const progress = 50;
      const maxProgress = 100;
      const mockProps = {
        ...props,
        progress
      };
      const { getByTestId, rerender } = renderResult;

      rerender(<ExampleLoadingOverlay {...mockProps as any} />);

      waitFor(() => {
        expect(mockProps.setProgress).toHaveBeenCalled();
      });
      expect(getByTestId(progressTestId)).toBeTruthy();
      expect(getByTestId(progressTestId).children[0])
        .toHaveAttribute('style', `transform: translateX(-${maxProgress - progress}%);`);
    });

    it('should start progress at 5 when onBefore it called', () => {
      act(() => {
        props.setProgress(5);
      });

      expect(props.setProgress).toHaveBeenCalledWith(5);
    });

    it('should increment progress gradually until it reaches 100', () => {
      // Simulate total time until it reaches 100%
      act(() => {
        jest.advanceTimersByTime(1000);
        const updateFn = props.setProgress.mock.calls[0][0]; // Get function passed to setProgress
        updateFn(0); // Simulate initial progress = 0

        jest.advanceTimersByTime(2000);
        const updateFn2 = props.setProgress.mock.calls[1][0]; // Get second update
        updateFn2(100);
      });

      expect(props.setProgress).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should stop incrementing progress once it reaches 100', () => {
      const mockProps = {
        ...props,
        progress: 100
      };
      const { rerender } = renderResult;

      rerender(<ExampleLoadingOverlay {...mockProps as any} />);

      // Move time forward
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(mockProps.setProgress).not.toHaveBeenCalled();
    });
  });

  describe('#onClick', () => {
    it(`should invoke setMessages, setProgress and onHandleSubmit 
      when on form submission button is clicked`, async () => {
      const inputMessageTestId = `${screenName}_Input_message`;
      const inputDelayTestId = `${screenName}_Input_delay`;
      const buttonTestId = `${screenName}_SubmitButton`;
      const payload = {
        values: { delay: DELAY },
        callbacks: { onBefore: expect.any(Function), onAfter: expect.any(Function) }
      };
      const { getByTestId } = renderResult;

      fireEvent.change(getByTestId(inputMessageTestId), { target: { value: 'Test message' } });
      fireEvent.change(getByTestId(inputDelayTestId), { target: { value: 3 } });
      fireEvent.click(getByTestId(buttonTestId));

      await waitFor(() => {
        expect(props.onHandleSubmit).toHaveBeenCalledTimes(1);
        expect(props.onHandleSubmit).toHaveBeenCalledWith(payload.values, payload.callbacks);
        expect(props.setProgress).toHaveBeenCalledWith(5); // onBefore call
        expect(props.setMessages).toHaveBeenCalledWith(expect.any(Function)); // onAfter updates messages
      });
    });

    it('should invoke reset form after submission', async () => {
      const inputMessageTestId = `${screenName}_Input_message`;
      const inputDelayTestId = `${screenName}_Input_delay`;
      const buttonTestId = `${screenName}_SubmitButton`;
      const { getByTestId } = renderResult;

      fireEvent.change(getByTestId(inputMessageTestId), { target: { value: 'Test message' } });
      fireEvent.change(getByTestId(inputDelayTestId), { target: { value: 3 } });
      fireEvent.click(getByTestId(buttonTestId));

      await waitFor(() => {
        expect(getByTestId(inputMessageTestId)).toHaveValue('');
        expect(getByTestId(inputDelayTestId)).toHaveValue(0);
      });
    });
  });
});
