import { FC } from 'react';
import { CancelBtn, ConfirmBtn } from '../../small-components/ActionBtns';

interface Props {
  handleCancel: () => void;
  handleDelete: () => void;
}

export const DeleteRule: FC<Props> = (props: Props) => {
  const { handleCancel, handleDelete } = props;
  return (
    <>
      <p className="danger-text">Are you sure you want to delete this record?</p>
      <div className="action-btns">
        <CancelBtn handleClose={handleCancel}>Cancel</CancelBtn>
        <ConfirmBtn handleConfirm={handleDelete}>Delete</ConfirmBtn>
      </div>
    </>
  );
};
