import { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {
  UserLogin,
  NewChannel,
  Topbar,
  Sidebar,
  Orders,
  Listings,
  Services,
  Subscriptions,
  PricingRules,
  BrowserExtensions,
  VaProfiles,
  ChannelSettings,
  GetStarted,
  Catalog,
  SourcesTable,
  Dashboard,
  SourcesSettings
} from './components';

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
    const sidebar = document.querySelector('.sider') as HTMLElement;
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
      <Router>
        {pathname === '/new-channel' ? null : <Topbar handleSidebarMobile={handleSidebarMobile} />}
        <Layout className="layout">
          {pathname === '/new-channel' ? null : (
            <Sidebar
              className="sider"
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
                <Redirect to="/login"/>
              </Route>
              <Route path="/login" component={UserLogin}/>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/home" component={Listings} />
              <Route path="/listings" component={Listings} />
              <Route path="/orders" component={Orders} />
              <Route path="/sources-settings" component={SourcesSettings} />
              <Route path="/sources-table" component={SourcesTable} />
              <Route path="/channel" component={ChannelSettings} />
              <Route path="/new-channel" component={NewChannel} />
              <Route path="/services" component={Services} />
              <Route path="/subscriptions" component={Subscriptions} />
              <Route path="/pricing-rules" component={PricingRules} />
              <Route path="/browser-extensions" component={BrowserExtensions} />
              <Route path="/va-profiles" component={VaProfiles} />
              <Route path="/get-started" component={GetStarted} />
              <Route path="/catalog" component={Catalog} />
            </Switch>
          </Layout>
        </Layout>
      </Router>
      {staticValue && <div className="overlay-sidebar-mobile" onClick={collapseSideBar} />}
    </div>
  );
});
