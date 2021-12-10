import { FC, CSSProperties } from 'react';
import { Modal } from 'antd';

interface IProps {
  open: boolean;
  children: JSX.Element[] | JSX.Element;
  width?: number;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
}

export const PopupModal: FC<IProps> = ({ open, children, width,  style , bodyStyle}: IProps) => (
  <Modal visible={open} footer={null} width={width}  style={style} bodyStyle={bodyStyle}>
    {' '}
    {children}
  </Modal>
);
