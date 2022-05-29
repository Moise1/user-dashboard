import { Drawer } from 'antd';
import { ReactNode } from 'react';

export interface AdvancedSearchProps {
  visible?: boolean;
  closable?: boolean;
  placement?: DrawerPlacement;
  onClose?: () => void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  extra?: ReactNode;
  width?: number | string;
  className?: string;
}

type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom';

export const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { visible, placement, onClose, title, children, extra, width, className, closable } = props;
  return (
    <Drawer
      className={className}
      title={title}
      visible={visible}
      placement={placement}
      onClose={onClose}
      closable={closable}
      extra={extra}
      width={width}
    >
      {children}
    </Drawer>
  );
};
