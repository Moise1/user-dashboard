import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getCatalogProducts = createAsyncThunk(
  'catalog/getCatalogProducts',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Listing/Bulk/Catalog/GetProducts');
      return res.data.response_data.products;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

