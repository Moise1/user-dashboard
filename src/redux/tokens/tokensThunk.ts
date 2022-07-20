import { createAsyncThunk } from '@reduxjs/toolkit';
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
      return res.data.responseObject;
    } catch (error) {
      return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
    }
  });