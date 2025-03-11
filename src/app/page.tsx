import AppBase from '@/components/AppComponents/AppBase';
import Constants from '@/constants';

import { StyledAnchor } from './styles';

const { Paths } = Constants;

const Home: React.FC = () => {

  return (
    <AppBase
      screenName="Main"
      title="Home"
      description="Home page"
    >
      Go to the <StyledAnchor href={Paths.Dashboard}> Dashboard </StyledAnchor>
    </AppBase>
  );
};

export default Home;
