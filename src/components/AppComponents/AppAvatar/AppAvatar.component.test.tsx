import { render, waitFor } from '@testing-library/react';

import AppAvatar from './AppAvatar.component';

describe('AppAvatar', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    src: 'https://github.com/shadcn.png',
    alt: 'Profile',
    fallback: <div>CN</div>
  };

  beforeEach(() => {
    renderResult = render(<AppAvatar {...props} />);
  });
  describe('#render', () => {
    it('should return ', () => {
      const avatarTestId = `${screenName}_Avatar`;
      const avatarImageTestId = `${screenName}_AvatarImage`;
      const avatarFallbackTestId = `${screenName}_AvatarFallback`;

      const { getByTestId } = renderResult;

      waitFor(() => {
        expect(getByTestId(avatarTestId)).toBeTruthy();
        expect(getByTestId(avatarImageTestId)).toBeTruthy();
        expect(getByTestId(avatarImageTestId)).toHaveAttribute('src', props.src);
        expect(getByTestId(avatarFallbackTestId)).toBeTruthy();
        expect(getByTestId(avatarFallbackTestId).children[0]).toHaveTextContent('CN');
      });
    });
  });
});