import { ReactNode } from 'react';
import { CircleDotIcon } from '../common/Icons';
import '../../sass/menu-list-item.scss';

interface Props {
  listName?: string | ReactNode | JSX.Element;
  onClick?: () => void;
}

export const MenuListItem = (props: Props) => {
  const { listName, onClick } = props;
  return (
    <div className="menu-list" onClick={onClick}>
      <span className="dot-icon">
        <CircleDotIcon />
      </span>
      {listName}
    </div>
  );
};
