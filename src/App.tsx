import './App.css';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ChannelCreate from './components/ChannelCreate';
// import Orders from './components/orders/Orders';
import Topbar from './components/topbar/Topbar';
import SidbarCover from './components/SidbarCover';
import Sidebar from './components/sidebar/Sidebar';
import Orders from './components/orders/Orders';
import Listings from './components/listings/Listings';
import { Layout } from 'antd';
import Sources from './components/sources/Sources';
import SettingSourceConfig from './components/sources/SettingSourceConfig';
import SelectSupplierProvider from './contexts/SelectSupplierProvider';
import './Common.css';

const App = () => {
  // const [collapsed, setCollapsed] = useState(true);
  // const [staticvalue, setStaticvalue] = useState(false);

  // const toggle = () => {
  //   setCollapsed(!collapsed);
  // };
  // const togglestatic = () => {
  //   setStaticvalue(!staticvalue);
  // };

  // class App extends React.Component {
  //   state = {
  //     collapsed: true,
  //     staticvalue: false
  //   };

  //   toggle = () => {
  //     this.setState({
  //       collapsed: !this.state.collapsed
  //     });
  //   };

  //   togglestatic = () => {
  //     this.setState({
  //       staticvalue: !this.state.staticvalue
  //     });
  //   };
  const [collapse, setCollapse] = useState(true);
  const [staticValue, setStaticValue] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const toggleStaticValue = () => {
    setStaticValue(!staticValue);
    if (staticValue) {
      setTimeout(() => {
        setCollapse(true);
      }, 500);
    }
  };

  const handleSidebarMobile = () => {
    setStaticValue(!staticValue);
    setCollapse(!collapse);
  };

  return (
    <div className="overflow-hidden h-100vh">
      {staticValue ? (
        <div
          onClick={() => {
            setStaticValue(!staticValue);
            setCollapse(!collapse);
          }}
          className="overlay-sidebar-mobile"
        ></div>
      ) : (
        ''
      )}

      <SelectSupplierProvider>
        <Router>
          <Topbar handleSidebarMobile={handleSidebarMobile} />
          <Layout className="bg-white layout_height">
            <SidbarCover staticValue={staticValue} setCollapse={setCollapse}>
              <Sidebar
                staticvalue={staticValue}
                togglestatic={toggleStaticValue}
                toggle={toggleCollapse}
                collapsed={collapse}
              />
            </SidbarCover>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={Home} />
              <Route path="/listings" component={Listings} />
              <Route path="/orders" component={() => <Orders staticValue={staticValue} />} />
              <Route path="/sources-setting" component={Sources} />
              <Route path="/sources" component={() => <SettingSourceConfig staticValue={staticValue} />} />
              <Route path="/newchannel" component={ChannelCreate} />
            </Switch>
          </Layout>
        </Router>
      </SelectSupplierProvider>
    </div>
  );
};

export default App;
