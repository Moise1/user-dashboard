import { createSlice } from '@reduxjs/toolkit';
import { saveAutoOrdering, getAutoOrdering, deleteAutoOrdering } from './autoOrderingThunk';

export interface AutoOrderingData {
  channelOAuthIds?: string | number;
  supplierId?: string | number;
  sourceId?: string | number;
  supplier?: string | number;
  feepercentage?: number;
  id?: string | number;
  fee?: number;
  name?: string;
  url?: string;
  enabled?: boolean;
}

const autoOrderingIntialState = {
  configureStore: <unknown>{},
  suppliers:<AutoOrderingData>[],
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
      state.suppliers = payload;
    });
    builder.addCase(getAutoOrdering.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const deleteAutoOrderingSlice = createSlice({
  name: 'autoOrdering',
  initialState: autoOrderingIntialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAutoOrdering.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteAutoOrdering.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.configureStore = payload;
    });
    builder.addCase(deleteAutoOrdering.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: saveAutoOrderingReducer } = saveAutoOrderingSlice;
export const { reducer: getAutoOrderingReducer } = getAutoOrderingSlice;
export const { reducer: deleteAutoOrderingReducer } = deleteAutoOrderingSlice;
