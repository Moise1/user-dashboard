import { createSlice } from '@reduxjs/toolkit';
import {getSources} from './sourcesThunk';

export interface Source {
  userId: string;
  sourceId: number;
  sourceName: string;
  sourceBaseUrl: string;
  defaultShipping: string;
  defaultLocationCity: string;
  defaultLocationCountry: string;
}

const initialState = {
  sources: [] as Source[],
  loading: false,
  error: ''
};


export const sourceSlice = createSlice({
  name: 'sources',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSources.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getSources.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.sources = payload;
    });
    builder.addCase(getSources.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const sourcesConfigReducer = sourceSlice.reducer;

