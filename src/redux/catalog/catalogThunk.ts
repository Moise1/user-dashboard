import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

interface CatalogData{
 sessionId: number;
}
export const getCatalogProducts = createAsyncThunk(
  'catalog/getCatalogProducts',
  async ({sessionId}: {sessionId: CatalogData['sessionId']}, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Catalog/GetProducts', {data: {sessionId}});
      console.log('RESPONSE CATALOG DATA', res.data.response_data);
      return res.data.response_data.products;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
