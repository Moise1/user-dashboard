import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../client';

export const getRules = createAsyncThunk('rules/getRules', async (_, thunkAPI) => {
  try {
    await client.post('/User/Credentials/Login', {
      email: 'testing@hustlegotreal.com',
      password: 'HGR2021',
      rememberMe: true
    });
    const channels = (await client.get<{ channels: { id: number }[] }>('/User/Channels/Get')).data?.channels;
    if (channels?.length > 0) {
      client.defaults.headers.common['channel'] = channels[0].id; //Not working, WHY?
    }
    const res = await client.get('/Pricing/Get', { headers: { channel: channels[0].id } }); //I had to set manually to test it
    return res.data;
  } catch (error) {
    if (error instanceof Error) return thunkAPI.rejectWithValue({ error: error.message });
  }
});
