import { ReactNode, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { t } from '../utils/transShim';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { AppContext } from '../contexts/AppContext';
//import { Space } from 'antd';
//import { shopLogo } from 'src/utils/shopLogo';
//import { countryFlag } from 'src/utils/countryFlag';
import { SelectorChannel } from './form/selector-channel';

export const StoreList = () => {
  const [showFlags] = useState<boolean>(true);
  const { channels } = useAppSelector((state) => state.channels);
  const { setChannelId } = useContext(AppContext);
  const shopIdentity = JSON.parse(localStorage.getItem('shopIdentity')!);
  //const showShopIdentity = (
  //  <Space direction="horizontal">
  //    {shopLogo(shopIdentity?.channelId)}
  //    {countryFlag(shopIdentity?.isoCountry)}
  //    {shopIdentity?.shopName}
  //  </Space>
  //);

  const provideChannelId = (value: number) => {
    const selectedChannel = channels?.filter((c: Channel) => c.id === value);
    const channelId = selectedChannel[0].id;
    setChannelId(JSON.stringify(channelId));
    localStorage.setItem('shopIdentity', JSON.stringify({
      channelId: selectedChannel[0].channelId,
      isoCountry: selectedChannel[0].isoCountry,
      shopName: selectedChannel[0].name
    }));
    window.location.reload();
  };

  return (
    <div className="store-list-container">
      <SelectorChannel
        size="large"
        showSearch={false}
        defaultValue={shopIdentity?.channelId ?? 'Select a store'}
        onChange={provideChannelId}
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
        {channels?.map(({ name: value, isoCountry, channelId, id }: Channel) => ({ value, isoCountry, channelId, id }))}
      </SelectorChannel>
    </div>
  );
};
