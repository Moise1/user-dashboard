import { createSlice } from '@reduxjs/toolkit';
import { buyTokens } from './tokensThunk';


export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {loading: false},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buyTokens.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(buyTokens.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(buyTokens.rejected, (state) => {
      state.loading = false;
    });
  }
});
  
export const { reducer: tokensReducer } = tokensSlice;