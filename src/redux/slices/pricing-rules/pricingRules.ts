import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import {client} from '../../client';

export interface Rule {
    id: number;
    userId: string;
    sourceId: number;
    priceFrom: number;
    priceTo: number;
    markup: number;
    createdOn: Date;
    active: boolean;
    channelAuthId: number;
}

const initialState = {
  rules: [] as Rule[],
  loading: false,
  error: ''
};
type TPayload = {
  rules: Rule[];
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
    await client.post('/User/Credentials/Login',{email:"USERNAME",password:"PASSWORD",rememberMe:true});
    const res = await client.post('/Pricing/Get');
    dispatch(pricingRulesSuccess(res.data));
    console.log('RES DATA FROM AXIOS', res.data);
  } catch (error) {
    console.log('error', error);
  }
};
