import SidebarMb from '../../components/SidebarMb';
import SearchBar from '../../components/SmallComponents/SearchBar';
import TabsList from '../../components/SmallComponents/TabsList';
import '../../css/listings.min.css';
import { Container } from 'react-bootstrap';
import {listingsData, listingsHeadingData} from '../common/ListingsData';
import ListingsTable from '../tables/ContentTable';

const Listings = () => {
  return (
    <>
      <Container className="listings-container" fluid>
        <SidebarMb className="side-nav" />
        <TabsList />
        <SearchBar className="phone-search-bar" showColumns />
        <SearchBar className="web-search-bar" showColumns />
        <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} />
      </Container>
    </>
  );
};
export default Listings;
