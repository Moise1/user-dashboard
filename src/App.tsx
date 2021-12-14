import { useState } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { NewChannel } from './components/chanel/NewChannel';
import Topbar from './components/topbar/Topbar';
import SidebarCover from './components/SidebarCover';
import Sidebar from './components/sidebar/Sidebar';
import Orders from './components/orders/Orders';
import Listings from './components/listings/Listings';
import { Services } from './components/services/Services';
import { Subscriptions } from './components/subscriptions/Subscriptions';
import { PricingRules } from './components/pricing-rules/PricingRules';
import { BrowserExtensions } from './components/browser-extensions/BrowserExtensions';
import { VaProfiles } from './components/va-profiles/VaProfiles';
import { Layout } from 'antd';
import Sources from './components/sources/Sources';
import SourcesTable from './components/sources/SourcesTable';
import SelectSupplierProvider from './contexts/SelectSupplierProvider';
import './Common.css';
import './sass/index.scss';

export const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [staticValue, setStaticValue] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleStaticValue = () => setStaticValue(!staticValue);

  const handleSidebarMobile = () => {
    setStaticValue(!staticValue);
    setCollapsed(!collapsed);
    document.querySelector('.sidebar-container')?.classList.add('toggled');
  };

  return (
    <div>
      {staticValue ? (
        <div
          onClick={() => {
            setStaticValue(!staticValue);
            setCollapsed(!collapsed);
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
            <SidebarCover staticValue={staticValue} setCollapsed={setCollapsed}>
              <Sidebar
                className="sidebar-container"
                staticvalue={staticValue}
                togglestatic={toggleStaticValue}
                toggle={toggleCollapse}
                collapsed={collapsed}
                handleSidebarMobile={handleSidebarMobile}
              />
            </SidebarCover>
            <Layout className={staticValue ? 'content-area' : ''}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Listings} />
                <Route path="/listings" component={Listings} />
                <Route path="/orders" component={() => <Orders staticValue={staticValue} />} />
                <Route path="/sources-setting" component={Sources} />
                <Route path="/sources" component={SourcesTable} />
                <Route path="/new-channel" component={NewChannel} />
                <Route path="/services" component={Services} />
                <Route path="/subscriptions" component={Subscriptions} />
                <Route path="/pricing-rules" component={PricingRules} />
                <Route path="/browser-extensions" component={BrowserExtensions} />
                <Route path="/va-profiles" component={VaProfiles} />
              </Switch>
            </Layout>
          </Layout>
        </Router>
      </SelectSupplierProvider>
    </div>
  );
};
