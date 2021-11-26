import SidebarMb from '../../components/SidebarMb';
import { SearchBars } from '../SmallComponents/SearchBars';
import ListingsStatus from '../SmallComponents/ListingsStatus';
import '../../sass/light-theme/listings.scss';
import { Container } from 'react-bootstrap';
import { listingsData, listingsHeadingData } from '../common/ListingsData';
import { ListingsTable } from '../tables/ListingsTable';

const Listings = () => {
  return (
    <Container className="listings-container" fluid>
      <SidebarMb className="side-nav" />
      <ListingsStatus />
      <SearchBars showColumns />
      <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
    </Container>
  );
};
export default Listings;
