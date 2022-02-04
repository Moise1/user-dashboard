import { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { NewChannel } from './components/chanel/NewChannel';
import Topbar from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import {Orders} from './components/orders/Orders';
import {Listings} from './components/listings/Listings';
import { Services } from './components/services/Services';
import { Subscriptions } from './components/subscriptions/Subscriptions';
import { PricingRules } from './components/pricing-rules/PricingRules';
import { BrowserExtensions } from './components/browser-extensions/BrowserExtensions';
import { VaProfiles } from './components/va-profiles/VaProfiles';
import { ChannelSettings } from './components/chanel/ChannelSettings';
import {Sources} from './components/sources/Sources';
import { GetStarted } from './components/help/GetStarted';
import { Catalog } from './components/catalog/Catalog';
import SourcesTable from './components/sources/SourcesTable';
import { SelectSupplierProvider } from './contexts/SelectSupplierProvider';
import './sass/index.scss';

export const App = withRouter(({ history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [staticValue, setStaticValue] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleStaticValue = () => setStaticValue(!staticValue);
  const { pathname } = history.location;

  const handleSidebarMobile = () => {
    setStaticValue(!staticValue);
    setCollapsed(!collapsed);
    const sidebar = document.querySelector<HTMLElement>('.sider') as HTMLElement;
    sidebar.style.display = 'block';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.height = '100vh !important';
  };

  const collapseSideBar = () => {
    setStaticValue(!staticValue);
    setCollapsed(!collapsed);
    const sidebar = document.querySelector('.sider') as HTMLElement;
    sidebar.style.display = 'none';
  };

  return (
    <div className="app-container">
      {staticValue && <div className="overlay-sidebar-mobile" onClick={collapseSideBar}/>}
      <SelectSupplierProvider>
        <Router>
          {pathname === '/new-channel' ? null : <Topbar handleSidebarMobile={handleSidebarMobile} />}
          <Layout className="layout">
            {pathname === '/new-channel' ? null : (
              <Sidebar
                className="sider"
                setStaticValue={setStaticValue}
                setCollapsed={setCollapsed}
                staticValue={staticValue}
                togglestatic={toggleStaticValue}
                toggle={toggleCollapse}
                collapsed={collapsed}
                handleSidebarMobile={handleSidebarMobile}
                collapseSideBar={collapseSideBar}
              />
            )}
            <Layout className={staticValue ? 'content-area' : 'all-content'}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Listings} />
                <Route path="/listings" component={Listings} />
                <Route path="/orders" component={Orders} />
                <Route path="/sources-setting" component={Sources} />
                <Route path="/sources" component={SourcesTable} />
                <Route path="/channel" component={ChannelSettings} />
                <Route path="/new-channel" component={NewChannel} />
                <Route path="/services" component={Services} />
                <Route path="/subscriptions" component={Subscriptions} />
                <Route path="/pricing-rules" component={PricingRules} />
                <Route path="/browser-extensions" component={BrowserExtensions} />
                <Route path="/va-profiles" component={VaProfiles} />
                <Route path="/get-started" component={GetStarted} />
                <Route path="/catalog" component={Catalog}/>
              </Switch>
            </Layout>
          </Layout>
        </Router>
      </SelectSupplierProvider>
    </div>
  );
});
