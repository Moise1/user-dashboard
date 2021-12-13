interface props {
  staticValue: boolean;
  setCollapsed: (value: boolean) => void;
  children?: JSX.Element | JSX.Element[];
}

const  SidebarCover = (myProps: props) => {
  const { staticValue, setCollapsed, children } = myProps;
  return (
    <div
      onMouseEnter={() => {
        if (!staticValue) {
          setCollapsed(false);
          return;
        }
      }}
      onMouseLeave={() => {
        if (!staticValue) {
          setCollapsed(true);
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