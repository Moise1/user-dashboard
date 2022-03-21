import {useContext, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { t } from '../../utils/transShim';
// import flag from '../../assets/flag-round-500.svg';
// import amazon from '../../assets/amazon-icon-1.svg';
// import { SearchInput } from './TableActionBtns';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { Selector } from './Selector';
import { AppContext } from '../../contexts/AppContext';


export const StoreList = () => {
  // Fetching channels
  const {channels} = useAppSelector((state) => state.channels);
  const { setChannelId } = useContext(AppContext);

  const provideChannelId = (value: string)=>{
    const selectedChannel = channels.filter((c: Channel) => c.name === value);
    const channelId = selectedChannel[0].id;
    setChannelId(JSON.stringify(channelId));
  };

  return (
    <div className="store-list-container">
      <Selector
        defaultValue="Select a store"
        onChange={provideChannelId}
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
        {/* <div className="lh-1 c-000">{t('lnkst')} </div>
          <img src={flag} className="lh-1 mx-2" height="20" alt="" />
          <img src={amazon} className="pt-1 lh-1" height="20" alt="" /> */}
        {/* {channels?.map((c: Channel) =>(
            <li key={c.id} className='store' onClick={provideChannelId} id={JSON.stringify(c.id)}>
              {c.name}
            </li>
          ))} */}

        {channels?.map(({ name: value }: Channel) => ({ value }))}
      </Selector>
    </div>
  );
};
