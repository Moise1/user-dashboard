import {combineReducers} from 'redux';
import {pricingRulesReducer} from '../slices/pricing-rules/pricingRules';

export const allReducers = combineReducers({
  pricingRules: pricingRulesReducer
});

