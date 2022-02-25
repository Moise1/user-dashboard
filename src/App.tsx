import { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import {Switch, Route, withRouter, Redirect } from 'react-router-dom';
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
import {ProtectedRoute} from './ProtectedRoute';
import './sass/index.scss';

export const App = withRouter(({ history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [staticValue, setStaticValue] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
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
      {pathname === '/new-channel' || !isAuthenticated ? null : <Topbar handleSidebarMobile={handleSidebarMobile} />}
      <Layout className="layout">
        {pathname === '/new-channel' || !isAuthenticated ? null : (
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
              <Redirect to="/dashboard"/>
            </Route>
            <Route path="/login" component={UserLogin} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/listings" component={Listings} />
            <ProtectedRoute path="/orders" component={Orders} />
            <ProtectedRoute path="/sources-settings" component={SourcesSettings} />
            <ProtectedRoute path="/sources-table" component={SourcesTable} />
            <ProtectedRoute path="/channel" component={ChannelSettings} />
            <ProtectedRoute path="/new-channel" component={NewChannel} />
            <ProtectedRoute path="/services" component={Services} />
            <ProtectedRoute path="/subscriptions" component={Subscriptions} />
            <ProtectedRoute path="/pricing-rules" component={PricingRules} />
            <ProtectedRoute path="/browser-extensions" component={BrowserExtensions} />
            <ProtectedRoute path="/va-profiles" component={VaProfiles} />
            <ProtectedRoute path="/get-started" component={GetStarted} />
            <ProtectedRoute path="/catalog" component={Catalog} />
          </Switch>
        </Layout>
      </Layout>
      {staticValue && <div className="overlay-sidebar-mobile" onClick={collapseSideBar} />}
    </div>
  );
});
