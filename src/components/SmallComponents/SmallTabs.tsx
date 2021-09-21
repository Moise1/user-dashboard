import React from 'react';
interface Props {
  title: string;
  last?: boolean;
  border?: boolean;
}
export default function SmallTabs(props: Props) {
  const { title, last, border } = props;
  console.log(border);
  const cssClass = last
    ? 'col-md col'
    : `col-md col ${border ? 'border-left border-right border-primary text-center' : ''}`;
  return <div className={cssClass}>{title}</div>;
}
