import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSales = createAsyncThunk('sales/getSales', async (data, thunkAPI) => {
  try {
    const res = await client.post('/Sales/GetSales', data);
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
