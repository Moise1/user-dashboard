import { combineReducers } from 'redux';
import { pricingRulesReducer } from '../pricing-rules/rulesSlice';
import { subscriptionsReducer } from '../subscriptions/subsSlice';
import { servicesReducer } from '../subscriptions/subsSlice';
import { getConfigReducer } from '../subscriptions/subsSlice';
import { userAssistantsReducer } from '../va-profiles/vaProfilesSlice';
import { userReducer } from '../user/userSlice';
import { sourcesConfigReducer } from '../source-configuration/source-configuration-slice';
import { sourcesReducer } from '../sources/sourceSlice';
import { channelsReducer } from '../channels/channelsSlice';
import { listingsReducer } from '../listings/listingsSlice';
import { notificationsReducer } from '../notifications/notificationsSlice';
import { templatesReducer } from '../templates/templatesSlice';
import { paymentReducer } from '../payment/paymentSlice';
import { catalogProductsReducer , catalogSearchProductReducer,listProductsReducers} from '../catalog/catalogSlice';
import { ordersReducer } from '../orders/orderSlice';
import { orderAddressReducer } from '../orders/orderSlice';
import { orderProgressReducer } from '../orders/orderSlice';
import { salesReducer } from '../sales/salesSlice';
import { saveAutoOrderingReducer } from '../auto-ordering/autoOrderingSlice';
import { getAutoOrderingReducer } from '../auto-ordering/autoOrderingSlice';
import { listingServicesReducer } from '../dashboard/listingServicesSlice';
import { noApiServersReducer, getManagedServersReducer } from '../dashboard/noApiServersSlice';
import { deleteAutoOrderingReducer } from '../auto-ordering/autoOrderingSlice';
import { channelConfigurationReducer } from '../channel-configuration/channels-configuration-slice';
import { accountConfigurationReducer } from '../account-configuration/account-configuration-slice';
import { affiliatesStatsReducer } from '../dashboard/affiliatesStatsSlice';
import { affiliatesDashboardReducer } from '../dashboard/affiliatesStatsSlice';
import { newChannelReducer } from '../new-channel/newChannelSlice';
import { PriceWarriorReducer } from '../price-warrior/priceWarriorSlice';
import { autoListReducer } from '../listings/autoListSlice';
import { UIPreferences } from '../ui-preferences/ui-preferences-state-slice';

export const allReducers = combineReducers({
  user: userReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  services: servicesReducer,
  priceWarrior: PriceWarriorReducer,
  subscriptionConfiguration: getConfigReducer,
  userAssistants: userAssistantsReducer,
  sources: sourcesReducer,
  sourcesConfiguration: sourcesConfigReducer,
  channels: channelsReducer,
  channelConfiguration: channelConfigurationReducer,
  accountConfiguration: accountConfigurationReducer,
  responseObect: paymentReducer,
  autoList: autoListReducer,
  listings: listingsReducer,
  notifications: notificationsReducer,
  templates: templatesReducer,
  catalogProducts: catalogProductsReducer,
  catalogSearchProduct:catalogSearchProductReducer,
  listProducts:listProductsReducers,
  orders: ordersReducer,
  orderAddress: orderAddressReducer,
  orderProgress: orderProgressReducer,
  sales: salesReducer,
  saveAutoOrdering: saveAutoOrderingReducer,
  getAutoOrdering: getAutoOrderingReducer,
  listingServices: listingServicesReducer,
  noApiServers: noApiServersReducer,
  deleteAutoOrders: deleteAutoOrderingReducer,
  affiliatesStats: affiliatesStatsReducer,
  affiliatesDashboard: affiliatesDashboardReducer,
  linkAccount: newChannelReducer,
  managedServers: getManagedServersReducer,
  newChannel: newChannelReducer,
  UIPreferences: UIPreferences
});
