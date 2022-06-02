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
  Templates,
  AutoOrderingConfiguration,
  AutoOrdering
} from './components';
import { ProtectedRoute } from './ProtectedRoute';
import { ListNow } from './components/list-now/ListNow';
import { ManualListing } from './components/list-now/ManualListing';
import { BulkListing } from './components/list-now/BulkListing';

export const App = withRouter(({ history }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(true);
  const [staticValue, setStaticValue] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const toggleStaticValue = () => setStaticValue(!staticValue);
  const { pathname } = history.location;

  const showMobileSider = () => {
    setStaticValue(!staticValue);
    setVisible(!visible);
    setCollapsed(!collapsed);
  };  
  const closeMobileSider = () => setVisible(!visible);

  return (
    <>
      {pathname === '/new-channel' || !isAuthenticated ? null : <Topbar showMobileSider={showMobileSider} />}
      <Layout className="layout">
        {pathname === '/new-channel' || !isAuthenticated ? null : (
          <Sidebar
            className="sider"
            mobileSiderVisible={visible}
            closeMobileSider={closeMobileSider}
            setCollapsed={setCollapsed}
            staticValue={staticValue}
            togglestatic={toggleStaticValue}
            collapsed={collapsed}
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
            <ProtectedRoute path="/manual-listing" component={ManualListing} />
            <ProtectedRoute path="/bulk-listing" component={BulkListing} />
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
            <ProtectedRoute path="/auto-ordering-configuration-query" component={AutoOrdering} />
          </Switch>
        </Layout>
      </Layout>
      <ToastContainer closeButton={<CloseIcon size="17" />} theme="colored" />
    </>
  );
});
