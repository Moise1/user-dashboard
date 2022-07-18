import { createAsyncThunk } from '@reduxjs/toolkit';
import {loadStripe} from '@stripe/stripe-js';
import { client } from '../client';

export const buyTokens = createAsyncThunk(
  'tokens/buyToken',
  async (sku: string, rejectWithValue) => {
    const stripePromise = await loadStripe('pk_live_9ZqUQknYIUpCPmPb9cjOsup4');
    try {
      const res = await client.post(`Catalog/CreateCheckoutSession?price=${sku}`);
      if(res.status === 200){
        stripePromise?.redirectToCheckout({
          sessionId: ''
        });
      }
    //   return res.data.response_data;
    } catch (error) {
      return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
    }
  });