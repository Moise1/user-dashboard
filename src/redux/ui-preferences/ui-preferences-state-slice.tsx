import { createSlice } from '@reduxjs/toolkit';
import { getActiveListingsVisibleColumns, getPendingListingsVisibleColumns, getTerminatedListingsVisibleColumns } from './ui-preferences-state-thunk';

export interface UIPreferencesState {
  activeListingsColumns: { columns?: number[] | null, loading: boolean };
  pendingListingsColumns: { columns?: number[] | null, loading: boolean };
  terminatedListingsColumns: { columns?: number[] | null, loading: boolean };
}

const initialState: UIPreferencesState = {
  activeListingsColumns: { columns: null, loading: false },
  pendingListingsColumns: { columns: null, loading: false },
  terminatedListingsColumns: { columns: null, loading: false }
};

export const UIPreferencesSlice = createSlice({
  name: 'ui-preferences',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Active
    builder.addCase(getActiveListingsVisibleColumns.pending, (state) => {
      state.activeListingsColumns = state.activeListingsColumns ?? {columns:null, loading: true};
      state.activeListingsColumns.loading = true;
    });
    builder.addCase(getActiveListingsVisibleColumns.fulfilled, (state, { payload }) => {
      state.activeListingsColumns.loading = false;
      state.activeListingsColumns.columns = payload;
    });
    builder.addCase(getActiveListingsVisibleColumns.rejected, (state) => {
      state.activeListingsColumns.loading = false;
    });
    //Pending
    builder.addCase(getPendingListingsVisibleColumns.pending, (state) => {
      state.pendingListingsColumns = state.pendingListingsColumns ?? { columns: null, loading: true };
      state.pendingListingsColumns.loading = true;
    });
    builder.addCase(getPendingListingsVisibleColumns.fulfilled, (state, { payload }) => {
      state.pendingListingsColumns.loading = false;
      state.pendingListingsColumns.columns = payload;
    });
    builder.addCase(getPendingListingsVisibleColumns.rejected, (state) => {
      state.pendingListingsColumns.loading = false;
    });
    //Terminated
    builder.addCase(getTerminatedListingsVisibleColumns.pending, (state) => {
      state.terminatedListingsColumns = state.terminatedListingsColumns ?? { columns: null, loading: true };
      state.terminatedListingsColumns.loading = true;
    });
    builder.addCase(getTerminatedListingsVisibleColumns.fulfilled, (state, { payload }) => {
      state.terminatedListingsColumns.loading = false;
      state.terminatedListingsColumns.columns = payload;
    });
    builder.addCase(getTerminatedListingsVisibleColumns.rejected, (state) => {
      state.terminatedListingsColumns.loading = false;
    });
  }
});

export const { reducer: UIPreferences } = UIPreferencesSlice;