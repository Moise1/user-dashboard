import { useState } from "react";
import { Layout } from "antd";

import TableContent from "../components/TableContent";
import ContentLayout from "../components/ContentLayout";
import HeaderLayout from "../components/HeaderLayout";
import Sidebar from "../components/Sidebar";
import ToggleButton from "../components/ToggleButton";
import TabsList from "../components/SmallComponents/TabsList";
import SearchBar from "../components/SmallComponents/SearchBar";
import Topbar from "../components/Topbar";
import SidebarMb from "../components/SidebarMb";
import SidbarCover from "../components/SidbarCover";
import styles from "./Home.module.css";

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
      <Topbar title={"Listings"} />

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
            <div className="d-md-block d-none">
              <SearchBar />
            </div>
            <TabsList />
            <div className="my-2 d-block d-md-none">
              <SearchBar />
            </div>
          </HeaderLayout>
          <ContentLayout>
            <TableContent />
          </ContentLayout>
        </Layout>
      </Layout>
    </>
  );
}
