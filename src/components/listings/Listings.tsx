import TableContent from '../../components/TableContent';
import ContentLayout from '../../components/ContentLayout';
import HeaderLayout from '../../components/HeaderLayout';
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
        <HeaderLayout>
          <TabsList />
          <SearchBar className="phone-search-bar" />
          <SearchBar className="web-search-bar" />
        </HeaderLayout>
        <ContentLayout>
          <TableContent />
        </ContentLayout>
      </Container>
    </>
  );
};
export default Listings;
