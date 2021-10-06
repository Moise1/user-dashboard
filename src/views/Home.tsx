import * as React from 'react';
import { Layout } from 'antd';
import TableContent from '../components/TableContent';
import ContentLayout from '../components/ContentLayout';
import HeaderLayout from '../components/HeaderLayout';
import TabsList from '../components/SmallComponents/TabsList';
import SearchBar from '../components/SmallComponents/SearchBar';
import SidebarMb from '../components/SidebarMb';
// import Orders from './components/orders/Orders';

/*
 *import TableContent from "../components/TableContent";
import ContentLayout from "../components/ContentLayout";
import HeaderLayout from "../components/HeaderLayout";
import Sidebar from "../components/sidebar/Sidebar";
import ToggleButton from "../components/ToggleButton";
import TabsList from "../components/SmallComponents/TabsList";
import SearchBar from "../components/SmallComponents/SearchBar";
import Topbar from "../components/Topbar";
import SidebarMb from "../components/SidebarMb";
import SidbarCover from "../components/SidbarCover";
import PendingDataContent from "../components/PendingDataContent";
import styles from "./Home.module.css";
import TerminatedDataContent from "../components/TerminatedDataContent";
 * */

export default function Home() {
  return (
    <>
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
    </>
  );
}
