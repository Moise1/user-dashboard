import { createAsyncThunk } from '@reduxjs/toolkit';
import {loadStripe} from '@stripe/stripe-js';
import { client } from '../client';

interface TokensData{
 lineItems: Array<{platformProductId: string, quantity: number}>;
 mode: string;
 successUrl: string;
 cancelUrl: string;
 upgradingSubscription: boolean;
}
export const buyTokens = createAsyncThunk(
  'tokens/buyToken',
  async (data: TokensData, rejectWithValue) => {
    try {
      const res = await client.post('Payment/CreateCheckoutSession', data);
      const stripe = await loadStripe('pk_live_9ZqUQknYIUpCPmPb9cjOsup4');
      await stripe?.redirectToCheckout({
        sessionId: res.data.responseObject.checkoutSessionId
      });
    } catch (error) {
      return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
    }
  });