import React from 'react';
import { Modal, Button } from 'antd';
import '../../sass/light-theme/listings.scss';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';

interface IProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export const ListingsModal: React.FC<IProps> = (props: IProps) => {
  const { open, onCancel, onDelete } = props;
  return (
    <div>
      <Modal visible={open} footer={null}>
        <p>Remove store-name?</p>
        <p className="danger-text">Please note that if this account has listings, they will be removed.</p>
        <div className="linked-store">
          <p>Linked store</p>
          <img src={flag} alt="Spain's flag" />
          <img src={amazon} alt="Amazon's logo" />
        </div>

        <div className="action-btns">
          <Button onClick={onCancel} className="cancel-btn">Cancel</Button>
          <Button onClick={onDelete} className="delete-btn">Delete</Button>
        </div>
      </Modal>
    </div>
  );
};
