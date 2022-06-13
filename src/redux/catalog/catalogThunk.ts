import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getCatalogProducts = createAsyncThunk(
  'catalog/getCatalogProducts',
  async ({sessionId} : {sessionId: number}, thunkAPI) => {
    try {
      console.log('The session Id is', sessionId);
      const res = await client.post('/Catalog/GetProducts',{data:sessionId} );
      // const res = await client.get('/Catalog/GetProducts', {sessionId}) ;
      return res.data.response_data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
