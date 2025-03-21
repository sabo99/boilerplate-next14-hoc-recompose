import { compose } from 'react-recompose';

import LoadingDots from '@/components/AppComponents/LoadingDots';
import LoadingSpinner from '@/components/AppComponents/LoadingSpinner';
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

    const renderContent = () => {
      return loaderType === 'DOTS'
        ? <LoadingDots screenName={screenName} />
        : <LoadingSpinner screenName={screenName} />;
    };

    return (
      <>
        <ComposedComponent {...props} />
        {isOpen &&
          <Overlay
            screenName={screenName}
            content={renderContent()}
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