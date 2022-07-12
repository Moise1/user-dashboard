import { createSlice } from '@reduxjs/toolkit';
import { getActiveListingsPreferences, getPendingListingsPreferences, getTerminatedListingsPreferences } from './ui-preferences-state-thunk';

export interface UITablePreference {
  columns?: number[];
  pageSize?: number;
}
export interface UITablePreferenceL extends UITablePreference {
  loading: boolean;
}

export interface UIPreferencesState {
  activeListingsPreferences: UITablePreferenceL;
  pendingListingsPreferences: UITablePreferenceL;
  terminatedListingsPreferences: UITablePreferenceL;
}

const initialState: UIPreferencesState = {
  activeListingsPreferences: { loading: false },
  pendingListingsPreferences: { loading: false },
  terminatedListingsPreferences: { loading: false }
};

export const UIPreferencesSlice = createSlice({
  name: 'ui-preferences',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Active
    builder.addCase(getActiveListingsPreferences.pending, (state) => {
      state.activeListingsPreferences = state.activeListingsPreferences ?? { loading: true };
      state.activeListingsPreferences.loading = true;
    });
    builder.addCase(getActiveListingsPreferences.fulfilled, (state, { payload }) => {
      state.activeListingsPreferences = {...payload, loading:false};
    });
    builder.addCase(getActiveListingsPreferences.rejected, (state) => {
      state.activeListingsPreferences.loading = false;
    });
    //Pending
    builder.addCase(getPendingListingsPreferences.pending, (state) => {
      state.pendingListingsPreferences = state.activeListingsPreferences ?? { loading: true };
      state.pendingListingsPreferences.loading = true;
    });
    builder.addCase(getPendingListingsPreferences.fulfilled, (state, { payload }) => {
      state.pendingListingsPreferences = { ...payload, loading: false };
    });
    builder.addCase(getPendingListingsPreferences.rejected, (state) => {
      state.pendingListingsPreferences.loading = false;
    });
    //Terminated
    builder.addCase(getTerminatedListingsPreferences.pending, (state) => {
      state.terminatedListingsPreferences = state.activeListingsPreferences ?? { loading: true };
      state.terminatedListingsPreferences.loading = true;
    });
    builder.addCase(getTerminatedListingsPreferences.fulfilled, (state, { payload }) => {
      state.terminatedListingsPreferences = { ...payload, loading: false };
    });
    builder.addCase(getTerminatedListingsPreferences.rejected, (state) => {
      state.terminatedListingsPreferences.loading = false;
    });
  }
});

export const { reducer: UIPreferences } = UIPreferencesSlice;