import { FC, CSSProperties } from 'react';
import { Modal } from 'antd';

interface Props {
  open: boolean;
  children: JSX.Element[] | JSX.Element;
  width?: number;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
  handleClose?: () => void;
}

export const PopupModal: FC<Props> = (props: Props) => {
  const { open, children, width, style, bodyStyle, handleClose } = props;
  return (
    <Modal 
      visible={open}
      footer={null} 
      width={width}
      style={style}
      bodyStyle={bodyStyle}
      onOk={handleClose}
      onCancel={handleClose}
    >
      {' '}
      {children}
    </Modal>
  );
};
