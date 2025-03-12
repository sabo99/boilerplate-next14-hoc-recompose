const config = {
  componentName: 'AppAlertDialog',
  defaultProps: {
    open: true,
    title: 'Are You Still Active?',
    message: `You’ve been inactive for a while. To ensure security,
    your session will automatically end soon. Do you want to continue your session?`,
    cancelText: 'Cancel',
    confirmText: 'Continue'
  }
};

export default config;