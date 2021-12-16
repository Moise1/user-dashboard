import { FC, CSSProperties } from 'react';
import { Modal } from 'antd';

interface Props {
  open: boolean;
  children: JSX.Element[] | JSX.Element;
  width?: number;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
}

export const PopupModal: FC<Props> = ({ open, children, width, style, bodyStyle }: Props) => (
  <Modal visible={open} footer={null} width={width} style={style} bodyStyle={bodyStyle}>
    {' '}
    {children}
  </Modal>
);
