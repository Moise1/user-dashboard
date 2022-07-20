import { createSlice } from '@reduxjs/toolkit';
import { buyTokens } from './tokensThunk';
import {loadStripe} from '@stripe/stripe-js';

const stripeRedirect = async (checkoutSessionId: string) =>{
  const stripe =  await loadStripe('pk_live_9ZqUQknYIUpCPmPb9cjOsup4');
  await stripe?.redirectToCheckout({sessionId: checkoutSessionId });
};
export const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {loading: false},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buyTokens.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(buyTokens.fulfilled, (state, { payload}) => {
      state.loading = false;
      stripeRedirect(payload.checkoutSessionId);
    });
    builder.addCase(buyTokens.rejected, (state) => {
      state.loading = false;
    });
  }
});
  
export const { reducer: tokensReducer } = tokensSlice;