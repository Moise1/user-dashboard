import { ReactNode, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from '../utils/transShim';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import { AppContext } from '../contexts/AppContext';
import { shopLogo } from '../utils/shopLogo';
import { countryFlag } from '../utils/countryFlag';
import { Selector, SelectorValue } from './form/selector';
import { PlusCircleOutlined } from '@ant-design/icons';

export const StoreList = () => {
  const [showFlags] = useState<boolean>(true);
  const { channels }: {channels:Channel[]} = useAppSelector((state) => state.channels);
  const { channelId, setChannelId } = useContext(AppContext);

  if (channels.length > 0 && !channels.find(x => x.id == channelId)) {
    setChannelId(channels[0].id);
  }


  const CreateLabel = (c: Channel) => {
    return <>
      {showFlags && shopLogo(c.channelId)}
      {showFlags && countryFlag(c.isoCountry)}
      {c.name}
    </>;
  };

  const CreateValue = (c: Channel) => {
    return {
      value: c.id,
      label: <>
        {CreateLabel(c)}
      </>,
      searchTerm: c.name
    };
  };

  const options = channels.map(CreateValue);

  const OnChange = (value: SelectorValue) => {
    setChannelId(value as number);
  };

  return (
    <div className="store-list-container">
      <Selector
        size="large"
        showSearch={true}
        value={channelId}
        onChange={OnChange}
        dropdownRender={(menu: ReactNode) => (
          <>
            <div className="menu">{menu}</div>
            <Link to="/new-channel" className="redirect-link">
              <PlusCircleOutlined style={{ fontSize: '19px' }}/>
              <span>{t('AddNewChannel')}</span>
            </Link>
          </>
        )}
      >
        {options}
      </Selector>
    </div>
  );
};
