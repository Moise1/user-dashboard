import { CheckIcon, TrashIcon, RefreshIcon } from '../common/Icons';
import '../../sass/light-theme/action-btns.scss';

import { Button } from 'antd';

interface props {
  children: React.ReactNode;
  handleClose?: () => void;
}

export const SuccessBtn = ({ children, handleClose }: props) => (
  <Button className="success-btn" onClick={handleClose}>
    <CheckIcon />
    <span>{children}</span>
  </Button>
);

export const CancelBtn = ({ children, handleClose }: props) => (
  <Button className="cancel-btn" onClick={handleClose}>
    <span>{children}</span>
  </Button>
);

export const ResetBtn = ({ children,  }: props) => (
  <Button className="reset-btn">
    <span>{children}</span>
  </Button>
);
export const DangerBtn = ({ children }: props) => (
  <Button className="danger-btn">
    <CheckIcon />
    <span>{children}</span>
  </Button>
);
export const DeleteBtn = ({ children }: props) => (
  <Button className="delete-btn">
    <TrashIcon />
    <span>{children}</span>
  </Button>
);
export const WarningBtn = ({ children }: props) => (
  <Button className="warning-btn">
    <RefreshIcon />
    <span>{children}</span>
  </Button>
);
