import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getLinkAccount = 
createAsyncThunk('new-channel/getLinkAccount',
  async ({shop, site}: {shop: number, site: number}, thunkAPI) => {
    try {
      const res = await client.get(`/Dashboard/LinkAccount?shop=${shop}&site=${site}`);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  });
