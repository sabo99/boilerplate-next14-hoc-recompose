import { cleanup, render } from '@testing-library/react';

import AppBase from './AppBase.component';
import AppBaseConfig from './AppBase.config';

const { componentName } = AppBaseConfig;

describe('AppBase', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestPage';
  const props = {
    screenName,
    title: 'Title',
    description: 'Desc'
  };
  const testId = `${screenName}_${componentName}`;

  beforeEach(() => {
    renderResult = render(
      <AppBase {...props}>
        <div>Content</div>
      </AppBase>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should be render component with testId correctly', () => {
      const containerTestId = `${testId}_StyledContainer`;
      const cardTestId = `${testId}_StyledCard`;
      const cardTitleTestId = `${testId}_CardTitle`;
      const cardDescriptionTestId = `${testId}_CardDescription`;
      const iconTestId = `${testId}_LinkIcon`;
      const anchorTestId = `${testId}_StyledAnchor`;

      const { getByTestId } = renderResult;

      expect(getByTestId(containerTestId)).toBeTruthy();
      expect(getByTestId(containerTestId).children[0]).toHaveTextContent(/content/i);
      expect(getByTestId(cardTestId)).toBeTruthy();
      expect(getByTestId(cardTitleTestId)).toBeTruthy();
      expect(getByTestId(cardTitleTestId)).toHaveTextContent(props.title);
      expect(getByTestId(cardDescriptionTestId)).toBeTruthy();
      expect(getByTestId(cardDescriptionTestId)).toHaveTextContent(props.description);
      expect(getByTestId(iconTestId)).toBeTruthy();
      expect(getByTestId(anchorTestId)).toBeTruthy();
      expect(getByTestId(anchorTestId)).toHaveTextContent('@shadcn/ui');
    });
  });

});