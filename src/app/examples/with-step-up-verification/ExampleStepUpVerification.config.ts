const Config = {
  buttons: [
    {
      stepUpType: 'PASSWORD',
      text: 'StepUp Password',
      appDialogOption: {
        title: 'Step-Up Password Verification',
        subtitle: 'Please enter your password'
      }
    },
    {
      stepUpType: 'PIN',
      text: 'StepUp PIN',
      appDialogOption: {
        title: 'Step-Up PIN Verification',
        subtitle: 'Please enter your PIN'
      }
    },
    {
      stepUpType: 'OTP',
      text: 'StepUp OTP',
      appDialogOption: {
        title: 'Step-Up OTP Verification',
        subtitle: 'Please enter otp code'
      }
    }
  ]
};

export default Config;