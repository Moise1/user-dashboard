import { ReactNode } from 'react';
import { CircleDotIcon } from '../common/Icons';
import '../../sass/menu-list-item.scss';

interface props {
  listName?: string | ReactNode | JSX.Element;
  onClick?: () => void;
}

export const MenuListItem = (props: props) => {
  const { listName, onClick } = props;
  return (
    <li className="menu-list" onClick={onClick}>
      <span className="dot-icon">
        <CircleDotIcon />
      </span>
      {listName}
    </li>
  );
};

