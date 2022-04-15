import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from '../../utils/toastAlert';
import { client } from '../client';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Channels/Get');
      return res.data.response_data.channels;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });


export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (accountId: number, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.delete(`/Dashboard/RemoveAccount?accountId=${accountId}`);
      if(res.status === 200) toastAlert('Channel successfully deleted', 'success');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
