import { ReactNode } from 'react';
import { CircleDotIcon } from '../common/Icons';
import '../../sass/menu-list-item.scss';
import { Link } from 'react-router-dom';

interface Props {
  listName?: string | ReactNode | JSX.Element;
  route: string | ReactNode | JSX.Element;
}

export const MenuListItem = (props: Props) => {
  const { listName, route } = props;
  return (
    <div className="menu-list">
      <span className="dot-icon">
        <CircleDotIcon />
      </span>
      <Link to={route ? route : '#'}>{listName}</Link>
    </div>
  );
};
