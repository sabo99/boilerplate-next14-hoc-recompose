import { zodResolver } from '@hookform/resolvers/zod';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { MockComponent } from '@/__mocks__/component';
import { formDefaultValue, formSchema } from '@/fixtures';

import RefetchForm from './RefetchForm.component';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn()
  }))
}))
  .mock('@/components/AppComponents/AppForm', () => jest.fn(MockComponent))
  .mock('@/components/AppComponents/AppForm/InputForm', () => jest.fn(MockComponent));

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
      <RefetchForm {...props as any} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const { debug } = renderResult;

      debug();
    });
  });
});