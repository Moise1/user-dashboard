import { rawSettingInterface } from 'src/components/auto-ordering/AutoOrdering';
import { client } from '../client';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { autoOrderingData } from './autoOrderingSlice';

export type autoOrderingType = Date | string | number | null | boolean | undefined | rawSettingInterface[];

export const saveAutoOrdering = createAsyncThunk(
  'sales/saveAutoOrder',
  async (
    {
      channelOAuthId,
      supplierId,
      sourceId,
      rawSettings
    }: {
      channelOAuthId: autoOrderingType;
      supplierId: autoOrderingType;
      sourceId: autoOrderingType;
      rawSettings: autoOrderingType;
    },
    thunkAPI
  ) => {
    try {
      const res = await client.post('/SourceConfiguration/SaveAutoOrdering', {
        channelOAuthId,
        supplierId,
        sourceId,
        rawSettings
      });
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getAutoOrdering = createAsyncThunk('sales/getAutoOrder', async () => {
  try {
    const res = await client.get('/SourceConfiguration/GetActiveAutoOrdering');
    console.log('AUTO ORDERING DATA', res.data);
    return res.data.response_data;
  } catch (error) {
    console.log('The error is ', error);
  }
});

export const deleteAutoOrdering = createAsyncThunk(
  'sales/deleteAutoOrder',
  async (
    {
      channelOAuthId,
      supplierId
    }: {
      channelOAuthId: autoOrderingType;
      supplierId: autoOrderingType;
    },
    thunkAPI
  ) => {
    try {
      const res = await client.post('/SourceConfiguration/RemoveAutoordering', {
        channelOAuthId,
        supplierId
      });
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
