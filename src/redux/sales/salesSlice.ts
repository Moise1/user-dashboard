import { createSlice } from '@reduxjs/toolkit';
import { getSales } from './salesThunk';

export interface Sale {
  date: Date;
  quantitySold: number;
  revenue: number;
  sourcePrice: number;
  totalTax: number;
}

const initialState = {
  sales: [] as Sale[],
  loading: false,
  error: ''
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all rules
    builder.addCase(getSales.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getSales.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.sales = payload;
    });
    builder.addCase(getSales.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: pricingRulesReducer } = salesSlice;
