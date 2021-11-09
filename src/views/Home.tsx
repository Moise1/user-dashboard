import TableContent from '../components/TableContent';
import TabsList from '../components/SmallComponents/TabsList';
import SearchBar from '../components/SmallComponents/SearchBar';
import SidebarMb from '../components/SidebarMb';
import { Container } from 'react-bootstrap';
import '../css/home.min.css';

const Home = () => {
  return (
    <Container fluid className="home-container">
      <SidebarMb className="side-nav" />
      <TabsList />
      <SearchBar className="phone-search-bar" showColumns />
      <SearchBar className="web-search-bar" showColumns />
      <TableContent />
    </Container>
  );
};

export default Home;
