import React from 'react';
import { CircleDotIcon } from '../common/Icons';
interface props {
  listName: string;
}

const MenuListItem = ({ listName }: props) => {
  return (
    <>
      <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
        <span className="mr-3">
          <CircleDotIcon />
        </span>
        {listName}
      </li>
    </>
  );
};

export default MenuListItem;
