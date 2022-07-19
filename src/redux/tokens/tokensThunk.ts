import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const buyTokens = createAsyncThunk(
  'tokens/buyToken',
  async (sku: string, rejectWithValue) => {
    try {
      const res = await client.post('Payment/CreateCheckoutSession');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
    }
  });