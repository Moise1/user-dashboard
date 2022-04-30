import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
// import { Sale } from './salesSlice';

export const getSales = createAsyncThunk('sales/getSales', async (data, thunkAPI) => {
  try {
    const res = await client.post('/Sales/GetSales', data);
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
