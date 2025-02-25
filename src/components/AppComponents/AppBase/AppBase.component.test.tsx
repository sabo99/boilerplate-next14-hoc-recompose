import { cleanup, render } from "@testing-library/react";

import AppBase from "./AppBase.component";
import config from "./AppBase.config";

describe('AppBase', () => {
  let renderResult: ReturnType<typeof render>;
  const { screenName } = config;
  const props = {
    title: 'Title',
    description: 'Desc'
  };

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
      const containerTestId = `${screenName}_StyledContainer`;
      const cardTestId = `${screenName}_StyledCard`;
      const cardTitleTestId = `${screenName}_CardTitle`;
      const cardDescriptionTestId = `${screenName}_CardDescription`;
      const iconTestId = `${screenName}_LinkIcon`;
      const anchorTestId = `${screenName}_StyledAnchor`;

      const { getByTestId } = renderResult;

      expect(getByTestId(containerTestId)).toBeTruthy();
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