import { zodResolver } from '@hookform/resolvers/zod';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import AppForm from './AppForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/ui/form', () => ({
    Form: jest.fn(MockComponent)
  }));

describe('AppForm', () => {
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
    children: <div>Children</div>,
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(<AppForm {...props} />);
  });
  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const formId = `${screenName}_${name}`;

      const { getByTestId } = renderResult;

      expect(getByTestId(formId)).toBeTruthy();
    });
  });
});