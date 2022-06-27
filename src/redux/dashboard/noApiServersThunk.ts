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

export const getManagedServers = createAsyncThunk(
  'manage/server',
  async (_,{rejectWithValue})=>
  {
    try
    {
      const res = await client.get('/NoApiServer/GetManagedServer');
      console.log('The managed server api ',res);
      return res.data.response_data;
    }
    catch(error)
    {
      return rejectWithValue('Sorry! Something went wrong');
    }
  }
);

export const updateManagedServers = createAsyncThunk(
  'manage/server',
  async (newArray:unknown,thunkAPI)=>
  {
    try
    {
      const res = await client.post('/NoApiServer/UpdateManagedServer',newArray);
      console.log('The managed server api ',res);
      return res.data.response_data;
    }
    catch(error)
    {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong');
    }
  }
);