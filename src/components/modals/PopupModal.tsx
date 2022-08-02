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
  closable?: boolean;
  footer?: React.ReactNode
}

export const PopupModal: FC<Props> = (props: Props) => {
  const { open, children, width, style, bodyStyle, handleClose, title, closable, footer } = props;
  return (
    <Modal
      title={title}
      visible={open}
      footer={footer}
      width={width}
      style={style}
      bodyStyle={bodyStyle}
      onOk={handleClose}
      onCancel={handleClose}
      closable={closable}
    >
      {children}
    </Modal>
  );
};
