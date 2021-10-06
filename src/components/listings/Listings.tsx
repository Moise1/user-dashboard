import React from 'react';
import TableContent from '../../components/TableContent';
import ContentLayout from '../../components/ContentLayout';
import HeaderLayout from '../../components/HeaderLayout';
import SidebarMb from '../../components/SidebarMb';
import SearchBar from '../../components/SmallComponents/SearchBar';
import TabsList from '../../components/SmallComponents/TabsList';
import { Layout } from 'antd';
// import styles from '../../../Home.module.css';

const Listings = () => {
  return (
    <>
      <Layout className="bg-white">
        <Layout className="site-layout">
          <div className="d-block d-lg-none">
            <SidebarMb />
          </div>
          <HeaderLayout>
            <TabsList />
            <div className="d-md-block d-none">
              <SearchBar />
            </div>
            <div className="my-2 d-block d-md-none">
              <SearchBar />
            </div>
          </HeaderLayout>
          {/* <Route path="/orders" component={Orders} /> */}
          <ContentLayout>
            <TableContent />
            {/* <PendingDataContent />
            <TerminatedDataContent /> */}
          </ContentLayout>
        </Layout>
      </Layout>
    </>
  );
};

export default Listings;
