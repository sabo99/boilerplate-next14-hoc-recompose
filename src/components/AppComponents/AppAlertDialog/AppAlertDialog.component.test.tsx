import { cleanup, render } from '@testing-library/react';

import AppAlertDialog from "./AppAlertDialog.component";
import config from './AppAlertDialog.config';

const { COMPONENT_NAME } = config;

describe('AppAlertDialog', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'Screen';
  const testId = `${screenName}_${COMPONENT_NAME}`;
  const titleTestId = `${testId}_Title`;
  const descTestId = `${testId}_Description`;
  const cancelTestId = `${testId}_Cancel`;
  const actionTestId = `${testId}_Action`;

  beforeEach(() => {
    renderResult = render(<AppAlertDialog screenName={screenName}/>);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should open alert dialog with title, description, cancel button and action button when with default props', () => {
      const { getByTestId, queryAllByTestId } = renderResult;

      expect(queryAllByTestId(/AppAlertDialog/i)).toBeTruthy();
      expect(getByTestId(titleTestId)).toBeTruthy();
      expect(getByTestId(descTestId)).toBeTruthy();
      expect(getByTestId(cancelTestId)).toBeTruthy();
      expect(getByTestId(actionTestId)).toBeTruthy();
    });

    it('should open alert dialog with custom title, description, cancel button and action button when with custom props', () => {
      const title = 'Custom Title';
      const description = 'Custom Description';
      const cancelText = 'Custom Cancel';
      const actionText = 'Custom Action';

      renderResult.rerender(
        <AppAlertDialog
          screenName={screenName}
          title={title}
          description={description}
          cancelText={cancelText}
          actionText={actionText}
        />
      );

      const { getByTestId } = renderResult;

      expect(getByTestId(titleTestId)).toHaveTextContent(title);
      expect(getByTestId(descTestId)).toHaveTextContent(description);
      expect(getByTestId(cancelTestId)).toHaveTextContent(cancelText);
      expect(getByTestId(actionTestId)).toHaveTextContent(actionText);
    });

    it('should call onAction when action button is clicked', () => {
      const onAction = jest.fn();

      renderResult.rerender(
        <AppAlertDialog
          screenName={screenName}
          onAction={onAction}
        />
      );
      renderResult.getByTestId(actionTestId).click();

      expect(onAction).toHaveBeenCalled();
    });

    it('should call onCancel when cancel button is clicked', () => {
      const onCancel = jest.fn();

      renderResult.rerender(
        <AppAlertDialog
          screenName={screenName}
          onCancel={onCancel}
        />
      );
      renderResult.getByTestId(cancelTestId).click();

      expect(onCancel).toHaveBeenCalled();
    });
  });

});