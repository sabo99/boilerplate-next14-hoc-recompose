import { AppBase } from '@/components/AppComponents/AppBase';
import Paths from '@/constants/Paths';

import { StyledAnchor } from './styles';

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
