import { FC, CSSProperties, ReactNode } from 'react';
import { Modal } from 'antd';

interface Props {
  open: boolean;
  children: JSX.Element[] | JSX.Element;
  width?: number;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
  handleClose?: () => void;
  title?: ReactNode;
}

export const PopupModal: FC<Props> = (props: Props) => {
  const { open, children, width, style, bodyStyle, handleClose, title } = props;
  return (
    <Modal
      title={title}
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
