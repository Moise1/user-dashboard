import './App.css';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ChannelCreate from './components/ChannelCreate';
// import Orders from './components/orders/Orders';
import Topbar from './components/Topbar';
import SidbarCover from './components/SidbarCover';
import Sidebar from './components/sidebar/Sidebar';
import Orders from './components/orders/Orders';
import Listings from './components/listings/Listings';
import { Layout } from 'antd';
import Sources from './components/sources/Sources';
import OrderDetails from './components/modals/OrderDetails';

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
    console.log(collapse, 'collapse');
  };

  const toggleStaticValue = () => {
    console.log(staticValue, 'staticValue');
    setStaticValue(!staticValue);
    if (staticValue) {
      setTimeout(() => {
        setCollapse(true);
      }, 500);
    }
  };
  return (
    <div className="overflow-hidden h-100vh">
      <Router>
        <Topbar />
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
            <Route path="/orders" component={Orders} />
            <Route path="/sources" component={Sources} />
            <Route path="/newchannel" component={ChannelCreate} />
            <Route path="/modal" component={OrderDetails} />

            {/* <Route path="/orders" component={Orders} /> */}
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
