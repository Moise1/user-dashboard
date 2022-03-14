import { createAsyncThunk } from '@reduxjs/toolkit';
// import { client } from '../client';
import {Channel} from './channelsSlice';


export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (channels: Channel[], {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const channelId = channels[0].id;
      localStorage.setItem('channelId', JSON.stringify(channelId));
      return channels;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

