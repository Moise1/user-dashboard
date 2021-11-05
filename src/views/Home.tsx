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
          <SidebarMb  className="side-nav"/>
        </div>
        <HeaderLayout>
          <TabsList />
          <div className="d-md-block d-none">
            <SearchBar className="phone-search-bar"/>
          </div>
          <div className="my-2 d-block d-md-none">
            <SearchBar className="web-search-bar"/>
          </div>
        </HeaderLayout>
        <ContentLayout>
          <TableContent />
        </ContentLayout>
      </Layout>
    </>
  );
}
