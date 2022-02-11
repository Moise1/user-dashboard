import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { Dispatch } from 'redux';
import {api} from '../../api';
// import { fetchPricingRules } from 'src/redux/actions/pricing-rules';

const initialState = {
  rules: [],
  loading: false,
  error: ''
};

//  interface Rule {
//     id: number;
//     userId: string;
//     sourceId: number;
//     priceFrom: number;
//     priceTo: number;
//     markup: number;
//     createdOn: Date;
//     active: boolean;
//     channelAuthId: number;
// }
type TPayload = {
  rules: [];
  loading: boolean;
  error: string;
};

export const pricingRulesSlice = createSlice({
  name: 'Pricing Rules',
  initialState: initialState,
  reducers: {
    pricingRulesSuccess: (state, { payload }: PayloadAction<TPayload>) => {
      state.rules = payload.rules;
      state.loading = false;
      state.error = payload.error;
    }
  }
});

export const pricingRulesReducer = pricingRulesSlice.reducer;
export const { pricingRulesSuccess } = pricingRulesSlice.actions;

export const fetchPricingRules = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('/Pricing');
    dispatch(pricingRulesSuccess(res.data));
    console.log('RES DATA FROM AXIOS', res.data);
  } catch (error) {
    console.log('error', error);
  }
};
