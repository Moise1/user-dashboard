import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
  ChannelConfiguration,
  GetStarted,
  Catalog,
  SourcesConfigurationTable,
  Dashboard,
  SourceConfiguration,
  Templates,
  AutoOrderingConfiguration,
  AutoOrdering,
  AllServices,
  PriceWarrior
} from './components';
import { ProtectedRoute } from './ProtectedRoute';
import { ListNow } from './components/list-now/ListNow';
import { ManualListing } from './components/list-now/ManualListing';
import { BulkListing } from './components/list-now/BulkListing';
import { Checkout } from './components/subscriptions/Checkout';
import { PaymentMethod } from './components/subscriptions/PaymentMethod';
import { Links } from './links';
import { EditTemplate } from './components/templates/EditTemplate';
import { ConfigureNoapi } from './components/NoApi/ConfigureNoapi';
import { OurServices } from './components/subscriptions/OurServices';

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
      {pathname === Links.NewChannel || !isAuthenticated ? null : <Topbar showMobileSider={showMobileSider} />}
      <Layout className="layout">
        {pathname === Links.NewChannel || !isAuthenticated ? null : (
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
              <Redirect to={Links.Dashboard} />
            </Route>
            <Route path={Links.Login} component={UserLogin} />
            <Route path={Links.Register} component={UserRegister} />
            <ProtectedRoute path={Links.Dashboard} component={Dashboard} />
            <ProtectedRoute path={Links.Products} component={Listings} />
            <ProtectedRoute path={Links.PublishNow} component={ListNow} />
            <ProtectedRoute path={Links.ManualPublish} component={ManualListing} />
            <ProtectedRoute path={Links.BulkPublish} component={BulkListing} />
            <ProtectedRoute path={Links.Orders} component={Orders} />
            <ProtectedRoute path={Links.SourceSettings} component={SourceConfiguration} />
            <ProtectedRoute path={Links.SourcesSettingsTable} component={SourcesConfigurationTable} />
            <ProtectedRoute path={Links.ChannelSettings} component={ChannelConfiguration} />
            <ProtectedRoute path={Links.NewChannel} component={NewChannel} />
            <ProtectedRoute exact path={Links.Services} component={Services} />
            <ProtectedRoute exact path={Links.Services + '/:slug'} component={AllServices} />
            <ProtectedRoute path={Links.Subscriptions} component={Subscriptions} />
            <ProtectedRoute path={Links.OurServices} component={OurServices} />
            <ProtectedRoute path={Links.Checkout} component={Checkout} />
            <ProtectedRoute path={Links.PaymentMethod} component={PaymentMethod} />
            <ProtectedRoute path={Links.PricingRules} component={PricingRules} />
            <ProtectedRoute path={Links.BrowserExtension} component={BrowserExtensions} />
            <ProtectedRoute path={Links.VaProfiles} component={VaProfiles} />
            <ProtectedRoute path={Links.ConfigureNoapi} component={ConfigureNoapi} />
            <ProtectedRoute path={Links.GetStarted} component={GetStarted} />
            <ProtectedRoute path={Links.Catalog} component={Catalog} />
            <ProtectedRoute path={Links.Templates} component={Templates} />
            <ProtectedRoute path={Links.PriceWarrior} component={PriceWarrior} />
            <ProtectedRoute path={Links.EditTemplate} component={EditTemplate} />
            <ProtectedRoute path={Links.AutoOrderConfiguration} component={AutoOrderingConfiguration} />
            <ProtectedRoute path={Links.AutoOrderConfigurationQuery} component={AutoOrdering} />
          </Switch>
        </Layout>
      </Layout>
      <ToastContainer closeButton={true} theme="colored" />
    </>
  );
});
