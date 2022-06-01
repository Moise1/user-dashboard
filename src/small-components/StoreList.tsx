import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { t } from '../utils/transShim';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { Selector } from './Selector';
import { AppContext } from '../contexts/AppContext';

export const StoreList = () => {
  const { channels } = useAppSelector((state) => state.channels);
  const { setChannelId } = useContext(AppContext);
  const selectedChannel = localStorage.getItem('selectedChannnel');

  const provideChannelId = (value: string | number) => {
    const selectedChannel = channels?.filter((c: Channel) => c.id === value);
    const channelId = selectedChannel[0].id;
    localStorage.setItem('selectedChannnel', selectedChannel[0].name);
    setChannelId(JSON.stringify(channelId));
  };
  return (
    <div className="store-list-container">
      <Selector
        size="large"
        showSearch={false}
        defaultValue={selectedChannel ? selectedChannel : 'Select a store'}
        onChange={provideChannelId}
        showFlags={true}
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
        {channels?.map(({ name: value, isoCountry, channelId, id }: Channel) => ({ value, isoCountry, channelId, id }))}
      </Selector>
    </div>
  );
};

