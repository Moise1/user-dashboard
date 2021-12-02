import React from 'react';

interface props {
  staticValue: boolean;
  setCollapse: (value: boolean) => void;
  children?: JSX.Element | JSX.Element[];
}

const  SidebarCover = (myProps: props) => {
  const { staticValue, setCollapse, children } = myProps;
  return (
    <div
      onMouseEnter={() => {
        if (!staticValue) {
          setCollapse(false);
          return;
        }
      }}
      onMouseLeave={() => {
        if (!staticValue) {
          setCollapse(true);
          return;
        }
      }}
      className={`${!staticValue ? 'w-sidebar-toggle' : ''}`}
    >
      {children}
    </div>
  );
};

export default SidebarCover;