import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (batchId: string, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.post('/Listing/Bulk/GetListingStatus', batchId);
      return res.data.reponse_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

