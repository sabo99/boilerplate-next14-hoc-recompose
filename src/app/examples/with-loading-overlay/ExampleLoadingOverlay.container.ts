import withPage from '@/composers/withPage';

import WithLoadingOverlay from './ExampleLoadingOverlay.component';
import WithLoadingOverlayHandlers from './ExampleLoadingOverlay.handlers';

export const stateList: [string, string, any][] = [
  ['messages', 'setMessages', ['default message...']],
  ['progress', 'setProgress', 0]
];

export default withPage({
  state: stateList,
  handlers: WithLoadingOverlayHandlers,
  uiSettings: {
    loadingOverlay: {
      enabledLoadingOverlay: true,
      loadingVariant: 'SPINNER'
    }
  }
})(WithLoadingOverlay);
