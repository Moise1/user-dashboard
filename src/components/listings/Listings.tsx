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
  const windowwidth = window.innerWidth;
  const [active, setActive] = useState<number>(1);
  const [index, setIndex] = useState<number>(1);

  const onChangeTab = () => {
    setActive((preveStep) => preveStep + 1);
    setIndex((preveStep) => preveStep + 1);
  };
  return (
    <Layout className="listings-container">
      <StatusBar>
        <StatusBtn
          title={`${windowwidth < 900 ? t('ActiveListingsShort') : t('ActiveListings')}`}
          handleClick={onChangeTab}
          active={active}
          index={index}
        />
        <StatusBtn
          title={`${windowwidth < 900 ? t('PendingListingsShort') : t('PendingListings')}`}
          handleClick={onChangeTab}
          active={active}
          index={index}
        />
        <StatusBtn
          title={`${windowwidth < 900 ? t('TerminatedListingsShort') : t('TerminatedListings')}`}
          handleClick={onChangeTab}
          active={active}
          index={index}
        />
      </StatusBar>
      <SearchBars showColumns />
      <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
    </Layout>
  );
};
export default Listings;
