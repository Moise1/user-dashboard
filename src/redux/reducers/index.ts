import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../slices/pricing-rules/rulesSlice';

export const allReducers = combineReducers({
  pricingRules: pricingRulesReducer
});

