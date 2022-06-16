import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

interface LinkAccount {
  shop: number;
  site: number;
}
export const getLinkAccount = 
createAsyncThunk('new-channel/getLinkAccount',
  async ({shop, site}: LinkAccount, thunkAPI) => {
    try {
      const res = await client.get(`/Dashboard/LinkAccount?shop=${shop}&site=${site}`);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  });
