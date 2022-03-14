import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const channels = (await client.get('/User/Channels/Get')).data?.response_data.channels;
      const channelId = channels[0].id;
      localStorage.setItem('channelId', JSON.stringify(channelId));
      return channels;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

