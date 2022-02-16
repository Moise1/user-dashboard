import { createSlice } from '@reduxjs/toolkit';
import {getRules} from './rulesThunk';

export interface Rule {
  id: number;
  userId: string;
  sourceId: number;
  priceFrom: number;
  priceTo: number;
  markup: number;
  createdOn: Date;
  active: boolean;
  channelOAuthId: number;
}

const initialState = {
  rules: [] as Rule[],
  loading: false,
  error: ''
};


export const pricingRulesSlice = createSlice({
  name: 'rules',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRules.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getRules.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.rules = payload.rules;
    });
    builder.addCase(getRules.rejected, (state, { error })=>{
      state.loading = false;
      state.error = error.message!;
    });
  }
});

export const pricingRulesReducer = pricingRulesSlice.reducer;

