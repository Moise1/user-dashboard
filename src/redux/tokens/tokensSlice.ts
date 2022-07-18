import { createSlice } from '@reduxjs/toolkit';
import { buyTokens } from './tokensThunk';


const initialState = {
  loading: false,
  error: ''
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buyTokens.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(buyTokens.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(buyTokens.rejected, (state, { payload }) => {
      state.loading = false;
    //   state.error = String(payload);
    });
  }
});

export const { reducer: tokensReducer } = tokensSlice;

