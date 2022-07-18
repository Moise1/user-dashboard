import { FC, useEffect } from 'react';
import { Checkbox, Form } from 'antd';
import { CancelBtn, ConfirmBtn } from '../../small-components/ActionBtns';
import {useAppSelector, useAppDispatch} from '../../custom-hooks/reduxCustomHooks';
import { getChannels } from 'src/redux/channels/channelsThunk';
import { Channel } from 'src/redux/channels/channelsSlice';
import { shopLogo } from 'src/utils/shopLogo';
import { countryFlag } from 'src/utils/countryFlag';
import '../../sass/top-bar.scss';

interface Props {
  checked: boolean;
  handleCheck: () => void;
  handleCancel: () => void;
  handleDelete: (id: number) => void;
  selectedChannelId: number;
}

export const DeleteAccount: FC<Props> = (props: Props) => {
  const { checked, handleCancel, handleCheck, handleDelete, selectedChannelId } = props;
  const {channels} = useAppSelector((state) => state.channels);
  const dispatch = useAppDispatch();

  const {name, isoCountry, channelId} = channels.find((c: Channel) => c.id === selectedChannelId);

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  return (
    <>
      <h6 className="modal-title">Remove {name} ?</h6>
      <p className="danger-text">Please note that if this account has listings, they will be removed.</p>
      <div className="linked-store">
        {shopLogo(channelId)}
        {countryFlag(isoCountry)}
        {name}
      </div>
      <div className="confirm">
        <div className="checkbox">
          {' '}
          <Checkbox checked={checked} onChange={handleCheck} />
        </div>
        <span className="confirm-text">Yes, I am sure I want to delete this account and all its listings.</span>
      </div>
      <Form className="action-btns" onFinish={handleDelete}>
        <CancelBtn handleClose={handleCancel}>Cancel</CancelBtn>
        <ConfirmBtn
          className={!checked ? 'disabled' : 'confirm-btn'} 
          disabled={!checked}
          htmlType="submit">
          Confirm
        </ConfirmBtn>
      </Form>
    </>
  );
};
