import '../../sass/light-theme/action-btns.scss';

import { Button } from 'antd';

interface Props {
  children: React.ReactNode;
  handleClose?: () => void;
  className?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export const SuccessBtn = ({ children, handleClose }: Props) => (
  <Button className="success-btn" onClick={handleClose}>
    {children}
  </Button>
);

export const ConfirmBtn = ({ children, handleClick, className, disabled }: Props) => (
  <Button className={`confirm-btn ${className}`} onClick={handleClick} disabled={disabled}>
    {children}
  </Button>
);

export const CancelBtn = ({ children, handleClose }: Props) => (
  <Button className="cancel-btn" onClick={handleClose}>
    {children}
  </Button>
);

export const ResetBtn = ({ children }: Props) => <Button className="reset-btn">{children}</Button>;
export const DangerBtn = ({ children }: Props) => <Button className="danger-btn">{children}</Button>;
export const DeleteBtn = ({ children }: Props) => <Button className="delete-btn">{children}</Button>;
export const WarningBtn = ({ children }: Props) => <Button className="warning-btn">{children}</Button>;
