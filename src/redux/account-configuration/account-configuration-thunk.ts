import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { SettingKey } from './account-configuration-slice';

export const getAccountConfiguration = createAsyncThunk(
  'AccountConfiguration/GetConfiguration',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/AccountConfiguration/GetConfiguration');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong');
    }
  }
);

export const saveAccountSetting = createAsyncThunk('channelConfiguration/SaveOne', async (data: SettingKey) => {
  try {
    const res = await client.post('/channelConfiguration/SaveOne', data);
    return res.data.response_data;
  } catch (error) {
    return { success: false };
  }
});
