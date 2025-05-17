const Config = {
  defaultValue: {
    description: 'Idle Popup triggered due to inactivity.',
    decriptionOnIdle: (countdown: number) => `Are you still there? IdlePopup will appear in ${countdown} seconds`
  },
    detections: [
      'Mouse movement',
      'Keyboard input',
      'Scrolling',
      'Touch interactions',
      'Tab or window visibility change'
    ]
};

export default Config;