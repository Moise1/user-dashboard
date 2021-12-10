import { ReactNode } from 'react';
import { CircleDotIcon } from '../common/Icons';
import '../../sass/light-theme/small-components/menu-list-item.scss';

interface props {
  listName?: string | ReactNode;
  onClick?: () => void;
}

const MenuListItem = (props: props) => {
  const { listName, onClick } = props;
  return (
    //put this style on separated file with custom classes
    <li className="menu-list" onClick={onClick}>
      <span className="dot-icon">
        <CircleDotIcon />
      </span>
      {listName}
    </li>
  );
};

export default MenuListItem;
