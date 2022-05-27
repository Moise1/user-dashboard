import { createSlice } from '@reduxjs/toolkit';
import { saveAutoOrdering, getAutoOrdering } from './autoOrderingThunk';

export interface autoOrderingData {
  channelOAuthIds?: number;
  supplierId?: number;
  sourceId?: number;
}

const autoOrderingIntialState = {
  configureStore: <unknown>{},
  loading: false,
  error: ''
};

export const saveAutoOrderingSlice = createSlice({
  name: 'autoOrdering',
  initialState: autoOrderingIntialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveAutoOrdering.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(saveAutoOrdering.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.configureStore = payload;
    });
    builder.addCase(saveAutoOrdering.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const getAutoOrderingSlice = createSlice({
  name: 'autoOrdering',
  initialState: autoOrderingIntialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutoOrdering.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getAutoOrdering.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.configureStore = payload;
    });
    builder.addCase(getAutoOrdering.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: saveAutoOrderingReducer } = saveAutoOrderingSlice;
export const { reducer: getAutoOrderingReducer } = getAutoOrderingSlice;
