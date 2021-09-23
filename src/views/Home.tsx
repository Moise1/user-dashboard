import * as React from 'react';

import { useState } from 'react';
import { Layout } from 'antd';

import TableContent from '../components/TableContent';
import ContentLayout from '../components/ContentLayout';
import HeaderLayout from '../components/HeaderLayout';
import Sidebar from '../components/sidebar/Sidebar';
import TabsList from '../components/SmallComponents/TabsList';
import SearchBar from '../components/SmallComponents/SearchBar';
import Topbar from '../components/Topbar';
import SidebarMb from '../components/SidebarMb';
import SidbarCover from '../components/SidbarCover';
import styles from './Home.module.css';

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
  const [collapse, setCollapse] = useState(true);
  const [staticValue, setStaticValue] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const toggleStaticValue = () => {
    setStaticValue(!staticValue);
  };

  return (
    <>
      <Topbar title={'Listings'} />
      {/* <DropDownMenu /> */}
      <Layout className={`bg-white ${styles.Layout_height}`}>
        <SidbarCover staticValue={staticValue} setCollapse={setCollapse}>
          <Sidebar
            staticvalue={staticValue}
            togglestatic={toggleStaticValue}
            toggle={toggleCollapse}
            collapsed={collapse}
          />
        </SidbarCover>
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

          <ContentLayout>
            <TableContent />
            {/* <PendingDataContent />
            <TerminatedDataContent /> */}
          </ContentLayout>
        </Layout>
      </Layout>
    </>
  );
}
