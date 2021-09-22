import React from "react";
import { CircleDotIcon } from "../common/Icons";

const MenuListItem = () => {
  return (
    <>
      <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
        <span className="mr-3">
          <CircleDotIcon />
        </span>
        Channel
      </li>
    </>
  );
};

export default MenuListItem;

//   {
//     listArray.map((obj) => (
//       <Menu.Item key={obj.key}>
//         <MenuListItem valueList={obj} />
//       </Menu.Item>
//     ));
//   }
