import { Button } from 'antd';
import '../sass/action-btns.scss';

interface Props {
  children: React.ReactNode;
  handleClose?: () => void;
  className?: string;
  disabled?: boolean;
  handleConfirm?: () => void;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id?: string;
  htmlType?: htmlType;
}

type htmlType = 'button' | 'submit' | 'reset';

export const SuccessBtn = ({ children, handleClose }: Props) => (
  <Button className="success-btn" onClick={handleClose}>
    {children}
  </Button>
);

export const ConfirmBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`confirm-btn ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const CancelBtn = ({ children, handleClose, disabled }: Props) => (
  <Button className="cancel-btn" onClick={handleClose} disabled={disabled}>
    {children}
  </Button>
);

export const ResetBtn = ({ children }: Props) => <Button className="reset-btn">{children}</Button>;
export const DangerBtn = ({ children }: Props) => <Button className="danger-btn">{children}</Button>;
export const DeleteBtn = ({ children }: Props) => <Button className="delete-btn">{children}</Button>;
export const WarningBtn = ({ children }: Props) => <Button className="warning-btn">{children}</Button>;
export const TransparentBtn = ({ id, children, className, handleClick }: Props) => (
  <Button id={id} className={`transparent-btn ${className}`} onClick={handleClick}>
    {children}
  </Button>
);
