import { useState } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ChannelCreate from './components/ChannelCreate';
import Topbar from './components/topbar/Topbar';
import SidebarCover from './components/SidebarCover';
import Sidebar from './components/sidebar/Sidebar';
import Orders from './components/orders/Orders';
import Listings from './components/listings/Listings';
import { Services } from './components/services/Services';
import {Subscriptions} from './components/subscriptions/Subscriptions';
import {PricingRules} from './components/pricing-rules/PricingRules';
import { Layout } from 'antd';
import Sources from './components/sources/Sources';
import SourcesTable from './components/sources/SourcesTable';
import SelectSupplierProvider from './contexts/SelectSupplierProvider';
import './Common.css';
import './sass/light-theme/app.scss';

const App = () => {
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
    <div>
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
          <Layout className="layout">
            <SidebarCover staticValue={staticValue} setCollapse={setCollapse}>
              <Sidebar
                staticvalue={staticValue}
                togglestatic={toggleStaticValue}
                toggle={toggleCollapse}
                collapsed={collapse}
              />
            </SidebarCover>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={Listings} />
              <Route path="/listings" component={Listings} />
              <Route path="/orders" component={() => <Orders staticValue={staticValue} />} />
              <Route path="/sources-setting" component={Sources} />
              <Route path="/sources" component={SourcesTable} />
              <Route path="/new-channel" component={ChannelCreate} />
              <Route path="/services" component={Services} />
              <Route path="/subscriptions" component={Subscriptions} />
              <Route path="/pricing-rules" component={PricingRules} />
            </Switch>
          </Layout>
        </Router>
      </SelectSupplierProvider>
    </div>
  );
};

export default App;
