import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { ChannelSettingData } from './channels-configuration-slice';

export const getChannelConfiguration = createAsyncThunk( 'channelConfiguration/get',
  async (_, /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/channelConfiguration/get');
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);

export const saveChannelSetting = createAsyncThunk('channelConfiguration/SaveOne',
  async (data: ChannelSettingData) => {
    try {
      const res = await client.post('/channelConfiguration/SaveOne', data);
      return res.data.response_data;
    } catch (error) {
      return { success : false };
    }
  }
);

export const refreshBusinessPolicies = createAsyncThunk('channelConfiguration/refreshBusinessPolicies',
  async () => {
    try {
      const res = await client.post('/channelConfiguration/refreshBusinessPolicies');
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);

export const loadBusinessPolicies = createAsyncThunk('channelConfiguration/LoadBusinessPolicies',
  async () => {
    try {
      const res = await client.get('/channelConfiguration/LoadBusinessPolicies');
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);
export const loadShipping = createAsyncThunk('channelConfiguration/LoadShipping',
  async () => {
    try {
      const res = await client.get('/channelConfiguration/LoadShipping');
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);
