import { createSlice } from '@reduxjs/toolkit';
import { getSales } from './salesThunk';

export interface Sale {
  date?: Date;
  quantitySold?: number;
  revenue?: number;
  sourcePrice?: number;
  totalTax?: number;
  period: number | string;
  from: string;
  to?: string;
  timeDiff?: number;
}

const initialState = {
  sales: [] as Sale[],
  loading: false,
  error: ''
};

export enum ePeriod {
  Unknown = 0,
  Seconds = 1,
  Minutes = 2,
  Days = 3,
  Months = 4,
  Year = 5,
  Hours = 6,
  Weeks = 7,
  WholeHistory = 99
}


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

export const { reducer: salesReducer } = salesSlice;
