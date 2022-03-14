import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Listing/Bulk/GetListingStatus');
      return res.data.reponse_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

