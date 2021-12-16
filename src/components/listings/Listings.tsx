import { Layout } from 'antd';
import { SearchBars } from '../SmallComponents/SearchBars';
import { StatusBar } from '../SmallComponents/StatusBar';
import ListingsStatusBtn from '../SmallComponents/ListingsStatusBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/listings.scss';
import { listingsData, listingsHeadingData } from '../common/ListingsData';
import { ListingsTable } from '../tables/ListingsTable';

const Listings = () => {
  const windowwidth = window.innerWidth;

  return (
    <Layout className="listings-container">
      <StatusBar>
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('ActiveListingsShort') : t('ActiveListings')}`} />
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('PendingListingsShort') : t('PendingListings')}`} />
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('TerminatedListingsShort') : t('TerminatedListings')}`} />
      </StatusBar>
      <SearchBars showColumns />
      <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
    </Layout>
  );
};
export default Listings;
