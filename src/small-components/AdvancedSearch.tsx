import { Drawer } from 'antd';
import { ReactNode } from 'react';
import { CloseIcon }   from  '../small-components/CloseIcon';

export interface AdvancedSearchProps {
  visible?: boolean;
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
  const { visible, placement, onClose, title, children, extra, width, className } = props;
  return (
    <Drawer
      className={className}
      title={title}
      visible={visible}
      placement={placement}
      onClose={onClose}
      closeIcon={<CloseIcon />}
      extra={extra}
      width={width}
    >
      {children}
    </Drawer>
  );
};
