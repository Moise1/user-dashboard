import { createSlice } from '@reduxjs/toolkit';
import { getAffiliatesStats } from './affiliatesStatsThunk';

export interface AffiliatesStats{ 
    quantity: number;
    id: number;
}

const initialState = {
  affiliatesStats: [] as AffiliatesStats[],
  loading: false,
  error: ''
};



export const affiliatesStatsSlice = createSlice({
  name: 'dashboard-affiliates-stats',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAffiliatesStats.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getAffiliatesStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.affiliatesStats = payload;
    });
    builder.addCase(getAffiliatesStats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: affiliatesStatsReducer} = affiliatesStatsSlice;