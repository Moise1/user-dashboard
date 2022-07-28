import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { ComputedSettingsData, SourceSettingData } from './types';

export const getSourceConfiguration = createAsyncThunk('SourceConfiguration/Get', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/Get');
    return res.data.response_data as { settings: SourceSettingData[] };
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const saveSourceSetting = createAsyncThunk('SourceConfiguration/SaveOne',
  async (data: SourceSettingData) => {
    try {
      const res = await client.post('/SourceConfiguration/SaveOne', data);
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);

export const getComputedConfiguration = createAsyncThunk('SourceConfiguration/GetComputed', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/GetComputed');
    return res.data.response_data as { settings: ComputedSettingsData[] };
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
