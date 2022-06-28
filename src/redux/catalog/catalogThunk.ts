import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
export const getCatalogProducts = createAsyncThunk(
  'catalog/getCatalogProducts',
  async ({sessionId} : {sessionId: number}, 
    thunkAPI) => {
    try {
      const res = await client.post('/Catalog/GetProducts',{data:sessionId} );
      // const res = await client.get('/Catalog/GetProducts', {sessionId}) ;
      return res.data.response_data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getCatalogProductsSearching = createAsyncThunk(
  'catalog/getCatalogProducts',
  async (
    {
      sessionId,
      titleContains,
      priceFrom,
      priceTo,
      profitFrom,
      profitTo,
      options,
      order,
      suppliersCount
    }: {
      sessionId: number;
      titleContains: string;
      priceFrom: number | undefined; 
      priceTo: number | undefined;
      profitFrom: number | undefined;
      profitTo: number | undefined;
      options:number | undefined;
      order:number ;
      suppliersCount:  number[]
    },
    thunkAPI) => {
    try {
      const res = await client.post('/Catalog/GetProducts', {
        sessionId,
        titleContains,
        priceFrom,
        priceTo,
        profitFrom,
        profitTo,
        options,
        order,
        sourceIds :suppliersCount,
      } );
      return res.data.response_data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);


export const listProducts = createAsyncThunk(
  'catalog/listProducts',
  async (products : { sourceId: number; title: string; }[], 
    thunkAPI) => {
    try {
      const res = await client.post('/Catalog/SubmitCatalog',{products});
      console.log('the res list product',res);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
