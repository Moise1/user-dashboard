import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getRules = createAsyncThunk('rules/getRules', async (_, thunkAPI) => {
  try {
    const channels = (await client.get<{ channels: { id: number }[] }>('/User/Channels/Get')).data?.channels;
    const res = await client.get('/Pricing/Get', { headers: { channel: channels[0].id } });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
