import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockFormComponent, MockInputComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import RefetchForm from './RefetchForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/AppComponents/AppForm', () => jest.fn(MockFormComponent))
  .mock('@/components/AppComponents/AppForm/InputForm', () => jest.fn(MockInputComponent));

describe('RefetchForm', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const name = 'RefetchForm';
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
      <RefetchForm {...props} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const formTestId = `${screenName}_${name}`;
      const inputLimitTestId = `${screenName}_${name}_InputForm_Limit`;
      const buttonTestId = `${screenName}_${name}_RefetchButton`;

      const { getByTestId } = renderResult;

      expect(getByTestId(formTestId)).toBeTruthy();
      expect(getByTestId(inputLimitTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toBeTruthy();
    });

    it('should render input limit with correct attributes', () => {
      const inputLimitTestId = `${screenName}_${name}_InputForm_Limit`;
      const descriptionText = 'By default limit 10, you can adjust what you want.';
      const placeholderText = 'Input limit refetch data';
      const labelText = 'Limit';
      const nameText = 'limit';

      const { getByTestId } = renderResult;

      expect(getByTestId(inputLimitTestId)).toHaveAttribute('description', descriptionText);
      expect(getByTestId(inputLimitTestId)).toHaveAttribute('placeholder', placeholderText);
      expect(getByTestId(inputLimitTestId)).toHaveAttribute('label', labelText);
      expect(getByTestId(inputLimitTestId)).toHaveAttribute('name', nameText);
    });

    it('should render button with correct attributes', () => {
      const buttonTestId = `${screenName}_${name}_RefetchButton`;
      const typeText = 'submit';
      const buttonText = 'Refetch Data';

      const { getByTestId } = renderResult;

      expect(getByTestId(buttonTestId)).toHaveAttribute('type', typeText);
      expect(getByTestId(buttonTestId)).toHaveTextContent(buttonText);
    });
  });

  describe('#onSubmit', () => {
    it('should call onSubmit when button is clicked', () => {
      const buttonTestId = `${screenName}_${name}_RefetchButton`;
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(buttonTestId));

      expect(props.onSubmit).toHaveBeenCalled();
    });
  });
});