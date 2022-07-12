import { createSlice } from '@reduxjs/toolkit';
import { getPreferences } from './ui-preferences-state-thunk';

export type UIIdentifier = string;

export interface UITablePreference {
  columns?: number[];
  pageSize?: number;
}
export interface UITablePreferenceL extends UITablePreference {
  loading: boolean;
}

export interface UIPreferencesState {
  tablePreferences: {
    [id: UIIdentifier]: UITablePreferenceL
  }
}

const initialState: UIPreferencesState = {
  tablePreferences: {}
};

export const UIPreferencesSlice = createSlice({
  name: 'ui-preferences',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Active
    builder.addCase(getPreferences.pending, (state, { meta }) => {
      state.tablePreferences = state.tablePreferences ?? {};
      const prv = state.tablePreferences[meta.arg] ?? {};
      state.tablePreferences[meta.arg] = { ...prv, loading: false };
    });
    builder.addCase(getPreferences.fulfilled, (state, { payload, meta }) => {
      state.tablePreferences[meta.arg] = { ...payload, loading: false };
    });
    builder.addCase(getPreferences.rejected, (state, { meta }) => {
      const prv = state.tablePreferences[meta.arg] ?? {};
      state.tablePreferences[meta.arg] = { ...prv, loading: false };
    });
  }
});

export const { reducer: UIPreferences } = UIPreferencesSlice;