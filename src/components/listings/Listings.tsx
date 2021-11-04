import TableContent from '../../components/TableContent';
import ContentLayout from '../../components/ContentLayout';
import HeaderLayout from '../../components/HeaderLayout';
import SidebarMb from '../../components/SidebarMb';
import SearchBar from '../../components/SmallComponents/SearchBar';
import TabsList from '../../components/SmallComponents/TabsList';
import '../../css/listings.css';
import { Container } from 'react-bootstrap';

const Listings = () => {
  return (
    <>
      <Container className="listings-container">
        <SidebarMb className="side-nav" />
        <HeaderLayout>
          <TabsList />
          <div className="d-md-block d-none">
            <SearchBar />
          </div>
          <div className="my-2 d-block d-md-none">
            <SearchBar />
          </div>
        </HeaderLayout>
        <ContentLayout>
          <TableContent />
        </ContentLayout>
      </Container>
    </>
  );
};
export default Listings;
