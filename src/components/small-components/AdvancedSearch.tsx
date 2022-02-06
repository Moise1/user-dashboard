import { Drawer } from 'antd';
import { ReactNode } from 'react';
import { X as CloseIcon } from 'react-feather';

export interface AdvancedSearchProps {
  visible?: boolean;
  placement?: DrawerPlacement;
  onClose?: () => void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  extra?: ReactNode;
}

type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom';

export const AdvancedSearch = (props: AdvancedSearchProps) => {
  const { visible, placement, onClose, title, children, extra } = props;
  return (
    <Drawer
      title={title}
      visible={visible}
      placement={placement}
      onClose={onClose}
      closeIcon={<CloseIcon />}
      extra={extra}
    >
      {children}
    </Drawer>
  );
};
