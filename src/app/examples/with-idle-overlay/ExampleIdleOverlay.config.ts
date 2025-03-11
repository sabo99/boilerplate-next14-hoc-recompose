const Config = {
  screenName: 'ExampleIdleOverlay',
  delayInterval: 1000,
  defaultValue: {
    idleDescription: 'Idle popup triggered due to inactivity.',
    idleCountdownDescription: (countdown: number) => `Idle popup will appear in ${countdown} seconds due to inactivity.`
  }
};

export default Config;