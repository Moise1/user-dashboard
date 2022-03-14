import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Products/Subscriptions/Get');
    return res.data.response_data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});