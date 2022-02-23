import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../pricing-rules/rulesSlice';
import {subscriptionsReducer} from '../subscriptions/subsSlice';
import {userAssistantsReducer} from '../va-profiles/vaProfilesSlice';
import {userLoginReducer} from '../user-login/userLoginSlice';

export const allReducers = combineReducers({
  login: userLoginReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  vaProfiles: userAssistantsReducer,
});

