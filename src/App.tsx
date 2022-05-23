import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CloseIcon } from './small-components/CloseIcon';
import {
  UserLogin,
  UserRegister,
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
  SourcesSettings,
  Templates
} from './components';
import { AutoOrderingConfiguration } from './components/auto-ordering/AutoOrderingConfiguration';
import { ProtectedRoute } from './ProtectedRoute';
import { ListNow } from './components/listings/ListNow';

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
    <>
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
        <Layout className={staticValue ? 'content-area-resized' : 'content-area'}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={UserLogin} />
            <Route path="/register" component={UserRegister} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/listings" component={Listings} />
            <ProtectedRoute path="/list-now" component={ListNow} />
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
            <ProtectedRoute path="/templates" component={Templates} />
            <ProtectedRoute path="/auto-ordering-configuration" component={AutoOrderingConfiguration} />
          </Switch>
        </Layout>
      </Layout>
      {staticValue && <div className="overlay-sidebar-mobile" onClick={collapseSideBar} />}
      <ToastContainer closeButton={<CloseIcon size="17" />} theme="colored" />
    </>
  );
});
