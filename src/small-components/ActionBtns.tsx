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


export const ProgressBtn = (props: Props) => {
  const { children, handleConfirm, className, disabled, htmlType } = props;
  return (<Button
    className={`progress-btn  ${className}`}
    onClick={handleConfirm}
    disabled={disabled}
    htmlType={htmlType}>
    {children}
  </Button>);
};

export const WarningBtn = (props: Props) => {
  const { children, handleConfirm, className, disabled, htmlType } = props;
  return (
    <Button className={`warning-btn  ${className}`}
      onClick={handleConfirm}
      disabled={disabled}
      htmlType={htmlType}>
      {children}
    </Button>
  );
};

export const ConfirmBtn = (props: Props) => {
  const { children, handleConfirm, className, disabled, htmlType } = props;
  return (
    <Button
      className={`confirm-btn ${className}`}
      onClick={handleConfirm}
      disabled={disabled}
      htmlType={htmlType}>
      {children}
    </Button>
  );
};

export const SuccessBtn = (props: Props) => {
  const { children, handleConfirm, className, disabled, htmlType, handleClose } = props;
  return (
    <Button
      className={`success-btn ${className}`}
      onClick={handleConfirm ? handleConfirm : handleClose}
      disabled={disabled}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};

export const DangerBtn = (props: Props) => {
  const { children, handleConfirm, className, disabled, htmlType } = props;
  return (
    <Button
      className={`danger-btn ${className}`}
      onClick={handleConfirm}
      disabled={disabled}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};

export const CancelBtn = (props: Props) => {
  const { children, disabled, cancelFiltering, handleClose } = props;
  return (
    <Button
      className="cancel-btn"
      onClick={cancelFiltering ? cancelFiltering : handleClose}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export const ShowVisibleColBtn = (props: Props) => {
  const { children, handleClose, disabled } = props;
  return (
    <Button
      className="showVisibleCol-btn"
      onClick={handleClose}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export const ResetBtn = ({ children }: Props) => <Button className="reset-btn">{children}</Button>;
export const DeleteBtn = ({ children }: Props) => <Button className="delete-btn">{children}</Button>;
export const TransparentBtn = (props: Props) => {
  const { id, children, className, handleClick, htmlType } = props;
  return (
    <Button
      id={id}
      className={`transparent-btn ${className}`}
      onClick={handleClick}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};
