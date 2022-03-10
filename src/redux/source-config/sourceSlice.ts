import { createSlice } from '@reduxjs/toolkit';
import { getSources } from './sourcesThunk';

export interface SourceConfig {
  sourceId: number;
  sourceName: string;
  sourceBaseUrl: string;
  defaultShipping: string;
  defaultLocationCity: string;
  defaultLocationCountry: string;
  [key: string]: string | number;
}

const initialState = {
  sources: [] as SourceConfig[],
  loading: false,
  error: ''
};

export const sourceSlice = createSlice({
  name: 'sources',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSources.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getSources.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.sources = payload.configuration;
    });
    builder.addCase(getSources.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: sourcesConfigReducer } = sourceSlice;
