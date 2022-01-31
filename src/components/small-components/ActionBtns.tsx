import { CheckIcon, TrashIcon, RefreshIcon } from '../common/Icons';
import '../../sass/light-theme/action-btns.scss';

import { Button } from 'antd';

interface Props {
  children: React.ReactNode;
  handleClose?: () => void;
  className?: string;
  disabled?: boolean;
}

export const SuccessBtn = ({ children, handleClose }: Props) => (
  <Button className="success-btn" onClick={handleClose}>
    <CheckIcon />
    <span>{children}</span>
  </Button>
);

export const ConfirmBtn = ({ children, handleClose, className, disabled }: Props) => (
  <Button className={className} onClick={handleClose}  disabled={disabled}>
    <span>{children}</span>
  </Button>
);

export const CancelBtn = ({ children, handleClose }: Props) => (
  <Button className="cancel-btn" onClick={handleClose}>
    <span>{children}</span>
  </Button>
);

export const ResetBtn = ({ children,  }: Props) => (
  <Button className="reset-btn">
    <span>{children}</span>
  </Button>
);
export const DangerBtn = ({ children }: Props) => (
  <Button className="danger-btn">
    <CheckIcon />
    <span>{children}</span>
  </Button>
);
export const DeleteBtn = ({ children }: Props) => (
  <Button className="delete-btn">
    <TrashIcon />
    <span>{children}</span>
  </Button>
);
export const WarningBtn = ({ children }: Props) => (
  <Button className="warning-btn">
    <RefreshIcon />
    <span>{children}</span>
  </Button>
);
