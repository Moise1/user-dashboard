import { ReactNode } from 'react';
import { CircleDotIcon } from '../common/Icons';
interface props {
  listName: string | ReactNode;
  onClick?: () => void;
}

const MenuListItem = (props: props) => {
  const { listName, onClick } = props;
  return (
    <li className="list-unstyled list-items-hover m-0 h-25 leading-25" onClick={onClick}>
      <span className="mr-3">
        <CircleDotIcon />
      </span>
      {listName}
    </li>
  );
};

export default MenuListItem;
