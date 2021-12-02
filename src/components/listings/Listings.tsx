import SidebarMb from '../../components/SidebarMb';
import { SearchBars } from '../SmallComponents/SearchBars';
import StatusBar from '../SmallComponents/StatusBar';
import ListingsStatusBtn from '../SmallComponents/ListingsStatusBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/listings.scss';
import { Container } from 'react-bootstrap';
import { listingsData, listingsHeadingData } from '../common/ListingsData';
import { ListingsTable } from '../tables/ListingsTable';

const Listings = () => {
  const windowwidth = window.innerWidth;

  return (
    <Container className="listings-container" fluid>
      <SidebarMb className="side-nav" />
      <StatusBar>
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('ActiveListingsShort') : t('ActiveListings')}`} />
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('PendingListingsShort') : t('PendingListings')}`} />
        <ListingsStatusBtn title={`${windowwidth < 900 ? t('TerminatedListingsShort') : t('TerminatedListings')}`} />
      </StatusBar>
      <SearchBars showColumns />
      <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
    </Container>
  );
};
export default Listings;
