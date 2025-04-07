import { compose, withState } from 'react-recompose';

import AppLoading from '@/components/AppComponents/AppLoading';
import Overlay from '@/components/AppComponents/Overlay';

import { Props } from './withLoadingOverlay.types';

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
  withState('isLoadingOverlay', 'setLoadingOverlay', false),
  ComposedLoadingOverlay
);

export default withLoadingOverlay;