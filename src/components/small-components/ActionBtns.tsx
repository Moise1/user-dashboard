import { CheckIcon, TrashIcon, RefreshIcon} from '../common/Icons';
import '../../sass/light-theme/action-btns.scss';

import { Button } from 'antd';

interface props {
  children: React.ReactNode;
}

export const SuccessBtn = ({ children }: props) => (
  <Button className="success-btn">
    <CheckIcon />
    <span>{children}</span>
  </Button>
);

export const ResetBtn = ({ children }: props) => (
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
