import { testProps, tid } from '@/lib/utils';

import { StyledItem, StyledList } from './ItemList.styles';
import type { Props } from './ItemList.types';

const ItemList: React.FC<Props> = ({ screenName, items }) => {
  return (
    <StyledList {...testProps(tid(screenName, 'StyledList'))}>
      {items.map((item, idx) => (
        <StyledItem
          key={idx}
          text={item}
          {...testProps(tid(screenName, 'StyledItem'))}
        />
      ))}
    </StyledList>
  );
};

export default ItemList;