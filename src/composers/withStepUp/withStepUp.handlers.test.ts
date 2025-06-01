import { cleanup } from '@testing-library/react';

import withStepUpHandlers from '@/composers/withStepUp/withStepUp.handlers';

const { onHandleSubmitStepUpPassword } = withStepUpHandlers;

describe('withStepUpHandlers', () => {
  const props = {
    verifyStepUpPassword: jest.fn(),
    setLoadingOverlay: jest.fn()
  };
  const form = {
    setError: jest.fn(),
    reset: jest.fn()
  };
  const options: any = { form };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#onHandleSubmitStepUpPassword', () => {
    it('should called form.reset and return true when verifyStepUpPassword success', async () => {
      const payload = { username: 'user', password: 'correctpass' };
      props.verifyStepUpPassword.mockResolvedValue({ data: 'success' });

      const result = await onHandleSubmitStepUpPassword(props as any)(payload, options);

      expect(props.verifyStepUpPassword).toHaveBeenCalledWith({ payload });
      expect(form.reset).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it('should called form.setError and return false when verifyStepUpPassword has an error', async () => {
      const payload = { username: 'user', password: 'wrongpass' };
      const error = { message: 'Invalid credentials' };
      props.verifyStepUpPassword.mockResolvedValue({ error });

      const result = await onHandleSubmitStepUpPassword(props as any)(payload, options);

      expect(props.verifyStepUpPassword).toHaveBeenCalledWith({ payload });
      expect(form.setError).toHaveBeenCalledWith('password', error);
      expect(result).toBeFalsy();
    });
  });
});