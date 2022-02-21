import {combineReducers} from 'redux';
import {pricingRulesReducer} from './pricing-rules/rulesSlice';

export const allReducers = combineReducers({
  pricingRules: pricingRulesReducer
});

