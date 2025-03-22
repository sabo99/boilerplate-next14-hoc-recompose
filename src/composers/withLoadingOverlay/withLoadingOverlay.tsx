import { compose } from 'react-recompose';

import AppLoading from '@/components/AppComponents/AppLoading';
import Overlay from '@/components/AppComponents/Overlay';

import Config from './withLoadingOverlay.config';
import { Props } from './withLoadingOverlay.types';

const { withConnectorLoadingOverlay, withStateLoadingOverlay } = Config;

const ComposedLoadingOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      screenName,
      isLoadingOverlay,
      loaderType = 'DOTS'
    } = props;
    const isOpen = isLoadingOverlay;

    return (
      <>
        <ComposedComponent {...props} />
        {isOpen &&
          <Overlay
            screenName={screenName}
            content={
              <AppLoading
                screenName={screenName}
                loaderType={loaderType}
              />
            }
          />
        }
      </>
    );
  };

  return HOC;
};

const withLoadingOverlay = () => compose(
  ...withStateLoadingOverlay,
  withConnectorLoadingOverlay,
  ComposedLoadingOverlay
);

export default withLoadingOverlay;