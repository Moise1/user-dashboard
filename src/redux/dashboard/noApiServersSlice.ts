import { createSlice } from '@reduxjs/toolkit';
import { getNoApiServers } from './noApiServersThunk';

export interface NoApiServer{ 
    isoCountry: number;
    id: null;
    channelId: number;
    displayName: null;
    nextPayment: Date;
    price: number;
    currencyId: number;
    cancelled: boolean
}

const initialState = {
  noApiServersResult: [] as NoApiServer[],
  loading: false,
  error: ''
};



export const noApiServersSlice = createSlice({
  name: 'dashboard-no-api-servers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoApiServers.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getNoApiServers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.noApiServersResult = payload;
    });
    builder.addCase(getNoApiServers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: noApiServersReducer} = noApiServersSlice;