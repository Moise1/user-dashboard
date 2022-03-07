import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../pricing-rules/rulesSlice';
import {subscriptionsReducer} from '../subscriptions/subsSlice';
import {userAssistantsReducer} from '../va-profiles/vaProfilesSlice';
import {reducer as userReducer} from '../user/userSlice';
import {sourcesConfigReducer} from '../source-config/sourceSlice'
;
export const allReducers = combineReducers({
  user: userReducer,
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer,
  vaProfiles: userAssistantsReducer,
  sources: sourcesConfigReducer,
});

