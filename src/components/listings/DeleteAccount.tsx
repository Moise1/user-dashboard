import { FC } from 'react';
import { Checkbox, Button } from 'antd';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import '../../sass/light-theme/listings.scss';

interface IProps {
  checked: boolean;
  handleCheck: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
}

export const DeleteAccount: FC<IProps> = (props: IProps) => {
  const { checked, handleCancel, handleCheck, handleDelete } = props;
  return (
    <>
      <h6 className="modal-title">Remove store-name?</h6>
      <p className="danger-text">Please note that if this account has listings, they will be removed.</p>
      <div className="linked-store">
        <p>Linked store</p>
        <img src={flag} alt="Spain's flag" />
        <img src={amazon} alt="Amazon's logo" />
      </div>
      <div className="confirm">
        <div className="checkbox">
          {' '}
          <Checkbox checked={checked} onChange={handleCheck} />
        </div>
        <span className="confirm-text">Yes, I am sure I want to delete this account and all its listings.</span>
      </div>
      <div className="action-btns">
        <Button onClick={handleCancel} className="cancel-btn">
          Cancel
        </Button>
        <Button onClick={handleDelete} className={!checked ? 'disabled' : 'confirm-btn'} disabled={!checked}>
          Confirm
        </Button>
      </div>
    </>
  );
};
