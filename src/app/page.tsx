import { AppBase } from '@/components/AppComponents/AppBase';
import Paths from '@/constants/Paths';

import { StyledAnchor, StyledListItem, StyledOrderList } from './styles';

const examples = [
  { title: 'WithLoadingOverlay', path: Paths.Examples.WithLoadingOverlay }
];

const Home: React.FC = () => {

  const renderContent = () => (
    <StyledOrderList>
      {examples.map((data, index) => (
        <StyledListItem key={index}>
          Example for using
          <StyledAnchor href={data.path}>
            {data.title}
          </StyledAnchor>
        </StyledListItem>
      ))}
    </StyledOrderList>
  );

  return (
    <AppBase
      screenName="Main"
      title="Home"
      description="Home page"
    >
      {renderContent()}
    </AppBase>
  );
};

export default Home;
