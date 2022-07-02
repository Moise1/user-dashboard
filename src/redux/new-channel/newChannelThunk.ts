import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';

interface LinkAccount {
  data: {shop: number; site: number; shopName?: string}
}
interface NewChanel{
  isoCountry: number;
  channel: number;
  channelStoreIdentifier: string;
}
export const getEbayLinkAccount = createAsyncThunk(
  'new-channel/geEbaytLinkAccount',
  async ({data}: LinkAccount, thunkAPI) => {
    const {shop, site,} = data;
    try {
      const res = await client.get(`/Dashboard/LinkAccount?shop=${shop}&site=${site}`);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getShopifyLinkAccount = createAsyncThunk(
  'new-channel/geShopifyLinkAccount',
  async ({data}: LinkAccount, thunkAPI) => {
    const {shop, site, shopName} = data;
    try {
      const res = await client.get(`/Dashboard/LinkAccount?shop=${shop}&site=${site}&shopName=${shopName}`);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong.');
    }
  }
);
export const createNewChannel = createAsyncThunk(
  'new-channel/createNewChannel',
  async (data: NewChanel, thunkAPI) => {
    try {
      const res = await client.post('/ChannelOAuth/CreateNoApiChannel', data);
      if (res.status === 200) toastAlert('New Channel successfully created.', 'success');
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong.');
    }
  }
);

export const paidHostExtension = createAsyncThunk(
  'new-channel/hostExtension',
  async (_, thunkAPI) => {
    try {
      await client.get('/Onboarding/SendHostExtensionEmail');
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong.');
    }
  }
);
