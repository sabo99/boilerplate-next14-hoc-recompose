import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockFormComponent, MockInputComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import LoginForm from './LoginForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/AppComponents/AppForm', () => jest.fn(MockFormComponent))
  .mock('@/components/AppComponents/AppForm/InputForm', () => jest.fn(MockInputComponent));

describe('LoginForm', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const name = 'LoginForm';
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
      <LoginForm {...props} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const formTestId = `${screenName}_${name}`;
      const inputUsernameTestId = `${screenName}_${name}_InputForm_Username`;
      const inputPasswordTestId = `${screenName}_${name}_InputForm_Password`;
      const buttonTestId = `${screenName}_${name}_LoginButton`;

      const { getByTestId } = renderResult;

      expect(getByTestId(formTestId)).toBeTruthy();
      expect(getByTestId(inputUsernameTestId)).toBeTruthy();
      expect(getByTestId(inputPasswordTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toBeTruthy();
    });

    it('should render input username with correct attributes', () => {
      const inputUsernameTestId = `${screenName}_${name}_InputForm_Username`;
      const descriptionText = 'Choose a username that is unique and easy to remember. Example: `emilys`';
      const placeholderText = 'Input your username';
      const labelText = 'Username';
      const nameText = 'username';

      const { getByTestId } = renderResult;

      expect(getByTestId(inputUsernameTestId)).toHaveAttribute('description', descriptionText);
      expect(getByTestId(inputUsernameTestId)).toHaveAttribute('placeholder', placeholderText);
      expect(getByTestId(inputUsernameTestId)).toHaveAttribute('label', labelText);
      expect(getByTestId(inputUsernameTestId)).toHaveAttribute('name', nameText);
    });

    it('should render input password with correct attributes', () => {
      const inputPasswordTestId = `${screenName}_${name}_InputForm_Password`;
      const descriptionText = 'Enter a secure password. Example: `emilyspass`';
      const placeholderText = 'Input your password';
      const labelText = 'Password';
      const nameText = 'password';

      const { getByTestId } = renderResult;

      expect(getByTestId(inputPasswordTestId)).toHaveAttribute('description', descriptionText);
      expect(getByTestId(inputPasswordTestId)).toHaveAttribute('placeholder', placeholderText);
      expect(getByTestId(inputPasswordTestId)).toHaveAttribute('label', labelText);
      expect(getByTestId(inputPasswordTestId)).toHaveAttribute('name', nameText);
    });

    it('should render button with correct attributes', () => {
      const buttonTestId = `${screenName}_${name}_LoginButton`;
      const typeText = 'submit';
      const buttonText = 'Login';

      const { getByTestId } = renderResult;

      expect(getByTestId(buttonTestId)).toHaveAttribute('type', typeText);
      expect(getByTestId(buttonTestId)).toHaveTextContent(buttonText);
    });
  });

  describe('#onSubmit', () => {
    it('should call onSubmit when button is clicked', () => {
      const buttonTestId = `${screenName}_${name}_LoginButton`;
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(buttonTestId));

      expect(props.onSubmit).toHaveBeenCalled();
    });
  });
});