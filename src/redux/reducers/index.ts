import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../pricing-rules/rulesSlice';
import {subscriptionsReducer} from '../subscriptions/subsSlice';
import {userAssistantsReducer} from '../va-profiles/vaProfilesSlice';
import {reducer as userAuthReducer} from '../user-auth/userAuthSlice';

export const allReducers = combineReducers({
  auth: userAuthReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  vaProfiles: userAssistantsReducer,
});

