import { combineReducers } from 'redux';
import { pricingRulesReducer } from '../pricing-rules/rulesSlice';
import { subscriptionsReducer } from '../subscriptions/subsSlice';
import { userAssistantsReducer } from '../va-profiles/vaProfilesSlice';
import { userReducer } from '../user/userSlice';
import { sourcesConfigReducer } from '../source-config/sourceSlice';
import { channelsReducer } from '../channels/channelsSlice';
import { listingsReducer } from '../listings/listingsSlice';
import { listingsSourceReducer } from '../listings/listingsSlice';
import { manualListingsReducer } from '../listings/listingsSlice';
import { pendingListingsReducer } from '../listings/listingsSlice';
import { terminatedListingsReducer } from '../listings/listingsSlice';
import { notificationsReducer } from '../notifications/notificationsSlice';
import { templatesReducer } from '../templates/templatesSlice';
import { catalogProductsReducer } from '../catalog/catalogSlice';
import { ordersReducer } from '../orders/orderSlice';
import { orderAddressReducer } from '../orders/orderSlice';
import { orderProgressReducer } from '../orders/orderSlice';
import { salesReducer } from '../sales/salesSlice';
import { saveAutoOrderingReducer } from '../auto-ordering/autoOrderingSlice';
import { getAutoOrderingReducer } from '../auto-ordering/autoOrderingSlice';
import { listingServicesReducer } from '../dashboard/listingServicesSlice';
import { noApiServersReducer } from '../dashboard/noApiServersSlice';

export const allReducers = combineReducers({
  user: userReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  userAssistants: userAssistantsReducer,
  sources: sourcesConfigReducer,
  channels: channelsReducer,
  listings: listingsReducer,
  pendingListings: pendingListingsReducer,
  terminatedListings: terminatedListingsReducer,
  listingSources: listingsSourceReducer,
  manualListings: manualListingsReducer,
  notifications: notificationsReducer,
  templates: templatesReducer,
  catalogProducts: catalogProductsReducer,
  orders: ordersReducer,
  orderAddress: orderAddressReducer,
  orderProgress: orderProgressReducer,
  sales: salesReducer,
  saveAutoOrdering: saveAutoOrderingReducer,
  getAutoOrdering: getAutoOrderingReducer,
  listingServices: listingServicesReducer,
  noApiServers: noApiServersReducer
});
