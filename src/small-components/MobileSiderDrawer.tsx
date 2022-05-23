import { Drawer } from 'antd';

interface Props {
  visible: boolean;
  placement: placementType;
  closable: boolean;
  onClose: () => void;
  key: string;
  children: JSX.Element;
}

type placementType = 'left' | 'right' | 'bottom' | 'top';

export const MobileSiderDrawer = (props: Props) => {
  const { visible, placement, closable, onClose, key, children } = props;
  return (
    <Drawer visible={visible} placement={placement} closable={closable} key={key} onClose={onClose}>
      {children}
    </Drawer>
  );
};
