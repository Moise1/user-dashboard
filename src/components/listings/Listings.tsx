import { useState } from 'react';
import { Layout } from 'antd';
import { SearchBars } from '../small-components/SearchBars';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/listings.scss';
import { listingsData, listingsHeadingData } from '../common/ListingsData';
import { ListingsTable } from '../tables/ListingsTable';

const Listings = () => {
  const [active, setActive] = useState(false);
  const onChangeTab = () => setActive(true);

  return (
    <Layout className="listings-container">
      <StatusBar>
        <StatusBtn title={`${t('ActiveListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('PendingListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('TerminatedListings')}`} handleClick={onChangeTab} active={active} />
      </StatusBar>
      <SearchBars showColumns />
      <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
    </Layout>
  );
};
export default Listings;
