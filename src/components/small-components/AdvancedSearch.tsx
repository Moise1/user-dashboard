import {Drawer} from 'antd';
import {X as CloseIcon} from 'react-feather';

export interface AdvancedSearchProps {
    visible?: boolean;
    placement?: DrawerPlacement;
    onClose?: () => void;
    title?: string;
    children?: JSX.Element | JSX.Element[];
}

type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom'; 

export const AdvancedSearch = (props: AdvancedSearchProps) =>{
  const {visible, placement, onClose, title, children} = props;
  return <Drawer  
    title={title} 
    visible={visible} 
    placement={placement} 
    onClose={onClose} 
    closeIcon={<CloseIcon/>}>
    {children}
  </Drawer>;
};