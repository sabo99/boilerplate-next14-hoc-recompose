import { render } from '@testing-library/react';

import ItemList from './ItemList.component';

describe('ItemList', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    items: ['1', '2', '3']
  };

  beforeEach(() => {
    renderResult = render(<ItemList {...props} />);
  });

  describe('#render', () => {
    it('should render component with correctly props', () => {
      const styledListTestId = `${screenName}_StyledList`;
      const styledItemTestId = `${screenName}_StyledItem`;

      const { getByTestId, getAllByTestId } = renderResult;

      expect(getByTestId(styledListTestId)).toBeTruthy();
      expect(getAllByTestId(styledItemTestId)).toBeTruthy();
    });
  });
});