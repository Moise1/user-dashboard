import { client } from '../client';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { autoOrderingData } from './autoOrderingSlice';

export type autoOrderingType = Date | string | number | null | boolean | undefined;

export const saveAutoOrdering = createAsyncThunk(
  'sales/saveAutoOrder',
  async (
    {
      channelOAuthId,
      supplierId,
      sourceId
    }: { channelOAuthId: autoOrderingType; supplierId: autoOrderingType; sourceId: autoOrderingType },
    thunkAPI
  ) => {
    try {
      const res = await client.post('/SourceConfiguration/SaveAutoOrdering', { channelOAuthId, supplierId, sourceId });
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getAutoOrdering = createAsyncThunk('sales/getAutoOrder', async () => {
  try {
    const res = await client.get('/SourceConfiguration/GetActiveAutoOrdering');
    return res.data.response_data;
  } catch (error) {
    console.log('The error is ', error);
  }
});
