import { createSlice } from '@reduxjs/toolkit';
import {getRules, createRule} from './rulesThunk';

export interface  Rule {
  id?: number;
  userId?: string;
  sourceId: number | string;
  priceFrom: number;
  priceTo: number;
  markup: number;
  createdOn?: Date;
  active?: boolean;
  channelOAuthId?: number;
  [key: string]: string | number| Date | boolean | undefined
}

const initialState = {
  rules: [] as Rule[],
  ruleCreated: false,
  loading: false,
  error: ''
};


export const rulesSlice = createSlice({
  name: 'rules',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    // Get all rules
    builder.addCase(getRules.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getRules.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.rules = payload.rules;
    });
    builder.addCase(getRules.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });

    // Create a rule
    builder.addCase(createRule.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(createRule.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.ruleCreated = payload?.success;
    });
    builder.addCase(createRule.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: pricingRulesReducer} = rulesSlice;

