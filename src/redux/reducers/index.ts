import { combineReducers } from 'redux';
import { pricingRulesReducer } from '../pricing-rules/rulesSlice';
import { subscriptionsReducer } from '../subscriptions/subsSlice';
import { userAssistantsReducer } from '../va-profiles/vaProfilesSlice';
import { userReducer } from '../user/userSlice';
import { sourcesConfigReducer } from '../source-config/sourceSlice';
import { channelsReducer } from '../channels/channelsSlice';
import { listingsReducer } from '../listings/listingsSlice';
import { listingsSourceReducer } from '../listings/listingsSlice';
import { notificationsReducer } from '../notifications/notificationsSlice';
import { templatesReducer } from '../templates/templatesSlice';
import { catalogProductsReducer } from '../catalog/catalogSlice';

export const allReducers = combineReducers({
  user: userReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  vaProfiles: userAssistantsReducer,
  sources: sourcesConfigReducer,
  channels: channelsReducer,
  listings: listingsReducer,
  listingSources: listingsSourceReducer,
  notifications: notificationsReducer,
  templates: templatesReducer,
  catalogProducts: catalogProductsReducer
});
