import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

interface LinkAccount {
  data: {shop: number; site: number;}
}
interface NewChanel{
  isoCountry: number;
  channel: number;
  channelStoreIdentifier: string;
}
export const getLinkAccount = createAsyncThunk(
  'new-channel/getLinkAccount',
  async ({data}: LinkAccount, thunkAPI) => {
    const {shop, site} = data;
    try {
      const res = await client.get(`/Dashboard/LinkAccount?shop=${shop}&site=${site}`);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const createNewChannel = createAsyncThunk(
  'new-channel/createNewChannel',
  async (data: NewChanel, thunkAPI) => {
    try {
      const res = await client.post('/ChannelOAuth/CreateNoApiChannel', data);
      return res.data.response_data.alreadyExists;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
