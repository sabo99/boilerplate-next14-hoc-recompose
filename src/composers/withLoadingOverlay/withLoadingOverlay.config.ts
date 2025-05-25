import { withState } from 'react-recompose';

const Config = {
  withLoadingOverlayState: () => withState('isLoadingOverlay', 'setLoadingOverlay', false)
};

export default Config;