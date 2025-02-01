const config = {
  COMPONENT_NAME: 'AppAlertDialog',
  defaultProps: {
    open: true,
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    cancelText: 'Cancel',
    actionText: 'Confirm'
  }
};

export default config;