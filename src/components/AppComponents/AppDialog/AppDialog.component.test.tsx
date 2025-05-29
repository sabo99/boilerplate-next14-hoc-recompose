import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';

import AppDialog from './AppDialog.component';

jest
  .mock('@/components/ui/dialog', () => ({
    Dialog: jest.fn(MockComponent),
    DialogClose: jest.fn(MockComponent),
    DialogContent: jest.fn(MockComponent),
    DialogDescription: jest.fn(MockComponent),
    DialogFooter: jest.fn(MockComponent),
    DialogHeader: jest.fn(MockComponent),
    DialogTitle: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/button');

describe('AppDialog', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isOpen: true
  };
  const dialogTestId = `${screenName}_Dialog`;
  const dialogButtonTestId = `${screenName}_DialogButton`;

  beforeEach(() => {
    renderResult = render(<AppDialog {...props} />);
  });

  describe('#render', () => {
    const dialogContentTestId = `${screenName}_DialogContent`;
    const dialogHeaderTestId = `${screenName}_DialogHeader`;
    const dialogTitleTestId = `${screenName}_DialogTitle`;
    const dialogSubtitleTestId = `${screenName}_DialogDescription`;
    const dialogFooterTestId = `${screenName}_DialogFooter`;
    const dialogCloseTestId = `${screenName}_DialogClose`;

    it('should render component with defaut props and without crash', () => {
      const titleText = 'Are you absolutely sure?';
      const subtitleText = 'This action cannot be undone';
      const buttonText = 'Cancel';

      const { getByTestId } = renderResult;

      expect(getByTestId(dialogTestId)).toBeTruthy();
      expect(getByTestId(dialogHeaderTestId)).toBeTruthy();
      expect(getByTestId(dialogContentTestId)).toBeTruthy();
      expect(getByTestId(dialogTitleTestId)).toBeTruthy();
      expect(getByTestId(dialogTitleTestId)).toHaveTextContent(titleText);
      expect(getByTestId(dialogSubtitleTestId)).toBeTruthy();
      expect(getByTestId(dialogSubtitleTestId)).toHaveTextContent(subtitleText);
      expect(getByTestId(dialogFooterTestId)).toBeTruthy();
      expect(getByTestId(dialogCloseTestId)).toBeTruthy();
      expect(getByTestId(dialogButtonTestId)).toBeTruthy();
      expect(getByTestId(dialogButtonTestId)).toHaveTextContent(buttonText);
    });

    it('should render component with custom title, subtitle and buttons props', () => {
      const titleText = 'Custom Title';
      const subtitleText = 'Custom Subtitle';
      const buttonText = 'Custom Button';
      const button2Text = 'Another Cusom Button';
      const mockProps: any = {
        ...props,
        title: titleText,
        subtitle: subtitleText,
        buttons: [
          {
            withCloseDialog: true,
            type: 'button',
            label: buttonText
          },
          {
            type: 'button',
            label: button2Text
          }
        ]
      };

      const { rerender, getByTestId, queryAllByTestId } = renderResult;
      rerender(<AppDialog {...mockProps} />);

      expect(getByTestId(dialogTitleTestId)).toHaveTextContent(titleText);
      expect(getByTestId(dialogSubtitleTestId)).toHaveTextContent(subtitleText);
      expect(getByTestId(dialogCloseTestId)).toBeTruthy();
      expect(queryAllByTestId(dialogCloseTestId).length).toBe(1);
      expect(queryAllByTestId(dialogButtonTestId).length).toBe(2);
      expect(queryAllByTestId(dialogButtonTestId)[0]).toHaveTextContent(buttonText);
      expect(queryAllByTestId(dialogButtonTestId)[1]).toHaveTextContent(button2Text);
    });

    it('should render content when props `renderContent` is present', () => {
      const mockProps: any = {
        ...props,
        renderContent: () => <div>Children</div>
      };

      const { rerender, queryByText } = renderResult;
      rerender(<AppDialog {...mockProps} />);

      expect(queryByText(/Children/i)).toBeTruthy();

    });

    it('should render without footer when props `withoutFooter` is present', () => {
      const mockProps: any = {
        ...props,
        withoutFooter: true
      };

      const { rerender, queryByTestId } = renderResult;
      rerender(<AppDialog {...mockProps} />);

      expect(queryByTestId(dialogFooterTestId)).not.toBeInTheDocument();
    });
  });

  describe('#onClick', () => {
    it('should called onClick button when button is clicked', () => {
      const onClickButton = jest.fn();
      const mockProps: any = {
        ...props,
        buttons: [
          {
            withCloseDialog: true,
            type: 'button',
            onClick: onClickButton
          },
          {
            type: 'button',
            onClick: onClickButton
          }
        ]
      };
      const { rerender, queryAllByTestId } = renderResult;

      rerender(<AppDialog {...mockProps} />);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[0]);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[1]);

      expect(onClickButton).toHaveBeenCalledTimes(2);
    });

    it('should called onAfterClose and close the dialog when click dialog close button', async () => {
      const onAfterClose = jest.fn();
      const buttonText = 'Custom Button';
      const mockProps = {
        ...props,
        onAfterClose,
        buttons: [
          {
            withCloseDialog: true,
            type: 'button' as any,
            label: buttonText
          }
        ]
      };
      const { rerender, getByTestId } = renderResult;

      rerender(<AppDialog {...mockProps} />);
      fireEvent.click(getByTestId(dialogButtonTestId));

      expect(onAfterClose).toHaveBeenCalled();
    });

    it('should called onClick buttons when props `onAfterClose` is present', () => {
      const onAfterClose = jest.fn();
      const onClickButton = jest.fn();
      const mockProps: any = {
        ...props,
        onAfterClose,
        buttons: [
          {
            withCloseDialog: true,
            type: 'button',
            onClick: onClickButton
          },
          {
            type: 'button',
            onClick: onClickButton
          }
        ]
      };
      const { rerender, queryAllByTestId } = renderResult;

      rerender(<AppDialog {...mockProps} />);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[0]);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[1]);

      expect(onClickButton).toHaveBeenCalledTimes(2);
      expect(onAfterClose).not.toHaveBeenCalled();
    });

    it(`should not called onClick buttons or onAfterClose when
      buttons props without onClick and props "onAfterClose" is not present`, () => {
      const onAfterClose = jest.fn();
      const onClickButton = jest.fn();
      const mockProps: any = {
        ...props,
        buttons: [
          {
            withCloseDialog: true,
            type: 'button'
          },
          {
            type: 'button'
          }
        ]
      };
      const { rerender, queryAllByTestId } = renderResult;

      rerender(<AppDialog {...mockProps} />);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[0]);
      fireEvent.click(queryAllByTestId(dialogButtonTestId)[1]);

      expect(onClickButton).toHaveBeenCalledTimes(0);
      expect(onAfterClose).not.toHaveBeenCalled();
    });

    it('should called handleDialogClose instance of onAfterClose when dialog is closed', async () => {
      const onAfterClose = jest.fn();
      const mockProps: any = {
        ...props,
        isOpen: false,
        onAfterClose
      };
      const { rerender } = renderResult;

      rerender(<AppDialog {...mockProps} />);
      act(() => {
        onAfterClose();
      });

      await waitFor(() => {
        expect(onAfterClose).toHaveBeenCalled();
      });
    });

    it('should not called onAfterClose when dialog is closed and onAfterClose not provided', async () => {
      const onAfterClose = jest.fn();
      const mockProps: any = {
        ...props,
        isOpen: false
      };
      const { rerender } = renderResult;

      rerender(<AppDialog {...mockProps} />);

      await waitFor(() => {
        expect(onAfterClose).not.toHaveBeenCalled();
      });
    });

  });
});