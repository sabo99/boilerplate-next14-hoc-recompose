import LoadingDots from '@/components/AppComponents/LoadingDots';
import LoadingSpinner from '@/components/AppComponents/LoadingSpinner';

import type { Props } from './AppLoading.types';

const Loading: React.FC<Props> = ({ screenName, loaderType }) => {
  return loaderType === 'SPINNER'
    ? <LoadingSpinner screenName={screenName} />
    : <LoadingDots screenName={screenName} />;
};

export default Loading;