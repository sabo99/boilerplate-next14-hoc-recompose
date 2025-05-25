import Overlay from '@/components/AppComponents//Overlay';
import AppLoading from '@/components/AppComponents/AppLoading';

import type { Props } from './LoadingOverlay.types';

const LoadingOverlay: React.FC<Props> = ({ isLoadingOverlay: isShow, ...props }) => {
  return isShow && (
    <Overlay
      {...props}
      content={
        <AppLoading {...props} />
      }
    />
  );
};

export default LoadingOverlay;