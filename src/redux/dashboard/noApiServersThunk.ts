import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getNoApiServers = createAsyncThunk(
  'dashboard-no-api-servers/getNoApiServers',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Dashboard/GetNoApiServers');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);