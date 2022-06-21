import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getListingServices = createAsyncThunk(
  'dashboard-listing-services/getListingServices',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Dashboard/GetListingServices');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
