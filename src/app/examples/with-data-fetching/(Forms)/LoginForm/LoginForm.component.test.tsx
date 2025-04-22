import { zodResolver } from '@hookform/resolvers/zod';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import LoginForm from './LoginForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/AppComponents/AppForm', () => jest.fn(MockComponent))
  .mock('@/components/AppComponents/AppForm/InputForm', () => jest.fn(MockComponent));

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
      <LoginForm {...props as any} />
    );
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const { debug } = renderResult;

      debug();
    });
  });
});