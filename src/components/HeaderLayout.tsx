import React from 'react';
interface Props {
  children: React.ReactNode;
}
function HeaderLayout(props: Props) {
  return (
    <div className="bg-trans" style={{ padding: 0 }}>
      <div className="plx-lg-4 px-md-3 px-2">{props.children}</div>
    </div>
  );
}

export default HeaderLayout;
