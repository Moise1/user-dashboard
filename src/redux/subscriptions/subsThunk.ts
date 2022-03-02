import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async (_, thunkAPI) => {
  try {
    const channels = (await client.get<{ channels: { id: number }[] }>('/User/Channels/Get')).data?.channels;
    if (channels?.length > 0) {
      client.defaults.headers.common['channel'] = channels[0].id; //Not working, WHY?
    }
    const res = await client.post('/Products/Subscriptions/Get', { headers: { channel: channels[0].id } }); //I had to set manually to test it.
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
