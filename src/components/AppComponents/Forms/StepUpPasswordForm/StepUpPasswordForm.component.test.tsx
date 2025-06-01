import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockFormComponent, MockInputComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import StepUpPasswordForm from './StepUpPasswordForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/AppComponents/AppForm', () => jest.fn(MockFormComponent))
  .mock('@/components/AppComponents/AppForm/InputForm', () => jest.fn(MockInputComponent));

describe('StepUpPasswordForm', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const name = 'StepUpPasswordForm';
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue
  });
  const props = {
    screenName,
    name,
    form,
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(
      <StepUpPasswordForm {...props} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const appFormTestId = `${screenName}_${name}_AppForm`;
      const inputFormTestId = `${screenName}_${name}_InputForm_Password`;

      const { getByTestId } = renderResult;

      expect(getByTestId(appFormTestId)).toBeTruthy();
      expect(getByTestId(inputFormTestId)).toBeTruthy();
    });

    it('should render buttons when appDialogOption is provided and has buttons', () => {
      const label = 'Confirm';
      const confirmActionButtonTestId = `${screenName}_${name}_${label}_ActionButton`;
      const mockProps = {
        ...props,
        appDialogOption: {
          buttons: [
            {
              variant: 'default',
              type: 'submit',
              label
            }
          ]
        }
      };

      const { rerender, getByTestId } = renderResult;
      rerender(<StepUpPasswordForm {...mockProps as any} />);

      expect(getByTestId(confirmActionButtonTestId)).toBeTruthy();
    });
  });

  describe('#onSubmit', () => {
    it('should trigger onSubmit callback when submit button is clicked', () => {
      const label = 'Confirm';
      const confirmActionButtonTestId = `${screenName}_${name}_${label}_ActionButton`;
      const mockProps = {
        ...props,
        appDialogOption: {
          buttons: [
            {
              variant: 'default',
              type: 'submit',
              label
            }
          ]
        }
      };
      const { rerender, getByTestId } = renderResult;

      rerender(<StepUpPasswordForm {...mockProps as any} />);
      fireEvent.click(getByTestId(confirmActionButtonTestId));

      expect(props.onSubmit).toHaveBeenCalled();
    });
  });

  describe('#onClick', () => {
    it('should invoke button onClick callback when action button is clicked', () => {
      const onClickCallbacks = jest.fn();
      const label = 'Confirm';
      const confirmActionButtonTestId = `${screenName}_${name}_${label}_ActionButton`;
      const mockProps = {
        ...props,
        appDialogOption: {
          buttons: [
            {
              onClick: onClickCallbacks,
              label
            }
          ]
        }
      };
      const { rerender, getByTestId } = renderResult;

      rerender(
        <StepUpPasswordForm {...mockProps as any} />
      );
      fireEvent.click(getByTestId(confirmActionButtonTestId));

      expect(onClickCallbacks).toHaveBeenCalled();
    });
  });

  describe('#onChange', () => {
    it('should change value on input password when user types', () => {
      const inputFormTestId = `${screenName}_${name}_InputForm_Password`;
      const passwordValue = 'anotherpass';
      const { getByTestId } = renderResult;

      fireEvent.change(getByTestId(inputFormTestId), { target: { value: passwordValue } });

      expect(getByTestId(inputFormTestId)).toHaveValue(passwordValue);
    });
  });
});