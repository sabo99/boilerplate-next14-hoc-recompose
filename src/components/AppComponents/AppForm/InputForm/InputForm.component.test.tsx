import { zodResolver } from '@hookform/resolvers/zod';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import InputForm from './InputForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: jest.fn()
  }))
}))
  .mock('@/components/ui/form', () => ({
    FormField: jest.fn(MockComponent),
    FormItem: jest.fn(MockComponent),
    FormLabel: jest.fn(MockComponent),
    FormControl: jest.fn(MockComponent),
    FormDescription: jest.fn(MockComponent),
    FormMessage: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/input', () => ({
    Input: jest.fn(MockComponent)
  }));

describe('InputForm', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const name = 'Username';
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue
  });
  const props = {
    screenName,
    name,
    label: 'Username',
    description: 'Description',
    placeholder: 'placeholder',
    control: form.control
  };

  beforeEach(() => {
    renderResult = render(
      <InputForm {...props as any} />
    );
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const testId = `${screenName}_${name}_FormField`;

      const { getByTestId } = renderResult;

      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});