import React from 'react';

interface props {
  staticValue: boolean;
  handleMobile: boolean;
  setCollapse: (value: boolean) => void;
  children?: JSX.Element | JSX.Element[];
}

export default function SidbarCover(myProps: props) {
  const { staticValue, setCollapse, children, handleMobile } = myProps;
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
      className={`${!staticValue ? `${handleMobile ? 'mobile-sidebar-on' : ''} w-sidebar-toggle` : ''}`}
    >
      {children}
    </div>
  );
}
