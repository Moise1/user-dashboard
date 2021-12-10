import { FC } from 'react';
import { Modal, Button } from 'antd';
import '../../sass/light-theme/listings.scss';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';

interface IProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
  children: JSX.Element;
  checked: boolean;
}

export const ListingsModal: FC<IProps> = (props: IProps) => {
  const { open, onCancel, onDelete, children, checked } = props;
  return (
    <div className="modal">
      <Modal visible={open} footer={null}>
        <h6 className="modal-title">Remove store-name?</h6>
        <p className="danger-text">Please note that if this account has listings, they will be removed.</p>
        <div className="linked-store">
          <p>Linked store</p>
          <img src={flag} alt="Spain's flag" />
          <img src={amazon} alt="Amazon's logo" />
        </div>
        <div className="confirm">
          <div className="checkbox">{children}</div>
          <span className="confirm-text">Yes, I am sure I want to delete this account and all its listings.</span>
        </div>
        <div className="action-btns">
          <Button onClick={onCancel} className="cancel-btn">
            Cancel
          </Button>
          <Button onClick={onDelete} className={!checked ? 'disabled' : 'confirm-btn'} disabled={!checked}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};
