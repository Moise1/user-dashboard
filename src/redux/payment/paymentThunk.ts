import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { CreateCheckoutSessionRequest } from './paymentSlice';

export const CreateCheckoutSession = createAsyncThunk('Payment/CreateCheckoutSession', async (data: CreateCheckoutSessionRequest, thunkAPI) => {
  try {
    const res = await client.post('Payment/CreateCheckoutSession', data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});