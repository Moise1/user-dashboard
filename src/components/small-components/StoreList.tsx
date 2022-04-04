import {ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { t } from '../../utils/transShim';
import { useAppSelector, useAppDispatch} from '../../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { Selector } from './Selector';
// import { AppContext } from '../../contexts/AppContext';
import { getChannels } from '../../redux/channels/channelsThunk';


export const StoreList = () => {
  const { channels } = useAppSelector((state) => state.channels);
  // const { setChannelId } = useContext(AppContext);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getChannels());
  }, [getChannels]);
  // const provideChannelId = (value: string) => {
  //   const selectedChannel = channels?.filter((c: Channel) => c.name === value);
  //   const channelId = selectedChannel[0].id;
  //   setChannelId(JSON.stringify(channelId));
  // };

  return (
    <div className="store-list-container">
      <Selector
        size="large"
        defaultValue="Select a store"
        onChange={()=>null}
        dropdownRender={(menu: ReactNode) => (
          <>
            {menu}
            <Link to="/new-channel" className="redirect-link">
              <PlusCircle />
              <span className="mb-0">{t('AddNewChannel')}</span>
            </Link>
          </>
        )}
      >
        {channels?.map(({ name: value }: Channel) => ({ value }))}
      </Selector>
    </div>
  );
};
