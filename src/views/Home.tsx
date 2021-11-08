import { Layout } from 'antd';
import TableContent from '../components/TableContent';
import ContentLayout from '../components/ContentLayout';
import HeaderLayout from '../components/HeaderLayout';
import TabsList from '../components/SmallComponents/TabsList';
import SearchBar from '../components/SmallComponents/SearchBar';
import SidebarMb from '../components/SidebarMb';

const Home = () => {
  return (
    <>
      <Layout className="site-layout">
        <div className="d-block d-lg-none">
          <SidebarMb className="side-nav" />
        </div>
        <HeaderLayout>
          <TabsList />
          <div className="d-md-block d-none">
            <SearchBar className="phone-search-bar" />
          </div>
          <div className="my-2 d-block d-md-none">
            <SearchBar className="web-search-bar" />
          </div>
        </HeaderLayout>
        <ContentLayout>
          <TableContent />
        </ContentLayout>
      </Layout>
    </>
  );
};

export default Home;
