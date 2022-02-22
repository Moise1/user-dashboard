import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../pricing-rules/rulesSlice';
import {subscriptionsReducer} from '../subscriptions/subsSlice';

export const allReducers = combineReducers({
  pricingRules: pricingRulesReducer,
  subscriptions: subscriptionsReducer
});

