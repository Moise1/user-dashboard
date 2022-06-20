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
  cancelFiltering?: () => void;
}

type htmlType = 'button' | 'submit' | 'reset';

export const ProgressBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`progress-btn  ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const WarningBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`warning-btn  ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const ConfirmBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`confirm-btn ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const SuccessBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`success-btn ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const DangerBtn = ({ children, handleConfirm, className, disabled, htmlType }: Props) => (
  <Button className={`danger-btn ${className}`} onClick={handleConfirm} disabled={disabled} htmlType={htmlType}>
    {children}
  </Button>
);

export const CancelBtn = ({ children, disabled, cancelFiltering, handleClose }: Props) => (
  <Button className="cancel-btn" onClick={cancelFiltering ? cancelFiltering : handleClose} disabled={disabled}  >
    {children}
  </Button>
);

export const ShowVisibleColBtn = ({ children, handleClose, disabled }: Props) => (
  <Button className="showVisibleCol-btn" onClick={handleClose} disabled={disabled}>
    {children}
  </Button>
);

export const ResetBtn = ({ children }: Props) => <Button className="reset-btn">{children}</Button>;
export const DeleteBtn = ({ children }: Props) => <Button className="delete-btn">{children}</Button>;
export const TransparentBtn = ({ id, children, className, handleClick }: Props) => (
  <Button id={id} className={`transparent-btn ${className}`} onClick={handleClick}>
    {children}
  </Button>
);
