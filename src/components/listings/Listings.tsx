import TableContent from '../../components/TableContent';
import SidebarMb from '../../components/SidebarMb';
import SearchBar from '../../components/SmallComponents/SearchBar';
import TabsList from '../../components/SmallComponents/TabsList';
import '../../css/listings.min.css';
import { Container } from 'react-bootstrap';

const Listings = () => {
  return (
    <>
      <Container className="listings-container" fluid>
        <SidebarMb className="side-nav" />
        <TabsList />
        <SearchBar className="phone-search-bar" showColumns />
        <SearchBar className="web-search-bar" showColumns />
        <TableContent />
      </Container>
    </>
  );
};
export default Listings;
