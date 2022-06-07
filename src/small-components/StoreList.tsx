import { ReactNode, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { t } from '../utils/transShim';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { AppContext } from '../contexts/AppContext';
import { SelectorChannel } from './form/selector-channel';

export const StoreList = () => {
  const [showFlags] = useState<boolean>(true);
  const { channels }: {channels:Channel[]} = useAppSelector((state) => state.channels);
  const { setChannelId, channelId } = useContext(AppContext);

  return (
    <div className="store-list-container">
      <SelectorChannel
        size="large"
        showSearch={false}
        value={channelId}
        onChange={setChannelId}
        showFlags={showFlags}
        dropdownRender={(menu: ReactNode) => (
          <>
            <div className="menu">{menu}</div>
            <Link to="/new-channel" className="redirect-link">
              <PlusCircle />
              <span>{t('AddNewChannel')}</span>
            </Link>
          </>
        )}
      >
        {channels}
      </SelectorChannel>
    </div>
  );
};
