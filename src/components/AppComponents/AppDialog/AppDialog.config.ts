const Config = {
  defaultProps: {
    title: 'Are you absolutely sure?',
    subtitle: 'This action cannot be undone',
    buttons: [
      {
        withCloseDialog: true,
        type: 'button',
        label: 'Cancel'
      }
    ]
  }
};

export default Config;