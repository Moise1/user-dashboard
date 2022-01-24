import {Drawer} from 'antd';

interface Props {
    visible: boolean;
    placement: DrawerPlacement;
    onClose: () => void;
    title: string;
    children: JSX.Element | JSX.Element[];
}

type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom'; 

export const AdvancedSearch = (props: Props) =>{
  const {visible, placement, onClose, title, children} = props;
  return <Drawer  title={title} visible={visible} placement={placement} onClose={onClose}>{children}</Drawer>;
};