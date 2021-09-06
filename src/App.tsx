import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import React from "react";
import TableContent from "./components/TableContent";
import ContentLayout from "./components/ContentLayout";
import HeaderLayout from "./components/HeaderLayout";
import Sidebar from "./components/Sidebar";
import ToggleButton from "./components/ToggleButton";
import TabsList from "./components/SmallComponents/TabsList";
import SearchBar from "./components/SmallComponents/SearchBar";
import Notifications from "./components/Notifications";
import SidebarMb from "./components/SidebarMb";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ChannelCreate from "./components/ChannelCreate";
class App extends React.Component {
  state = {
    collapsed: true,
    staticvalue: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  togglestatic = () => {
    this.setState({
      staticvalue: !this.state.staticvalue,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route
              path="/home"
              component={() => {
                return (
                  <>
                    <Layout className="bg-white h-100">
                      <div
                        onMouseEnter={() => {
                          if (!this.state.staticvalue) {
                            this.setState({ collapsed: false });
                            return;
                          }
                        }}
                        onMouseLeave={() => {
                          if (!this.state.staticvalue) {
                            this.setState({ collapsed: true });
                            return;
                          }
                        }}
                        className={`d-none d-lg-block ${
                          !this.state.staticvalue ? "w-sidebar-toggle" : ""
                        }`}
                      >
                        <Sidebar
                          staticvalue={this.state.staticvalue}
                          togglestatic={this.togglestatic}
                          toggle={this.toggle}
                          collapsed={this.state.collapsed}
                        />
                      </div>
                      <Layout className="site-layout">
                        <div className="d-block d-lg-none">
                          <SidebarMb />
                        </div>
                        <HeaderLayout>
                          <Notifications title={"Listings"} />
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
              }}
            />
            <Route
              path="/newchannel"
              component={() => {
                return (
                  <>
                    <ChannelCreate />
                  </>
                );
              }}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
