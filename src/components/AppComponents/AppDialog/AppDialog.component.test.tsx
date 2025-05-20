import { fireEvent, render } from '@testing-library/react';

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
  .mock('@/components/ui/button', () => ({
    Button: jest.fn(MockComponent)
  }));

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
  });

  describe('#onClick', () => {
    it('should invoke onAfterClose and close the dialog when click dialog close button', () => {
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
  });
});