import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { Account } from './account-configuration-slice';

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

export const saveAccountSetting = createAsyncThunk('AccountConfiguration/SaveBusinessData', async (data: Account) => {
  try {
    const res = await client.post('/AccountConfiguration/SaveBusinessData', data);
    return res.data.response_data;
  } catch (error) {
    return { success: false };
  }
});
