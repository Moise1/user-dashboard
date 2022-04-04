import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import {UserAssistant} from './vaProfilesSlice';

export const getUserAssistants = createAsyncThunk(
  'userAssistants/getUserAssistants',
  async (_, thunkAPI) => {
    try {
      const res = await client.get('/VirtualAssistants/Get');
      return res.data.response_data.userAssistants;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

export const createUserAssistant = createAsyncThunk(
  'userAssistants/createUserAssistant',
  async ({name}: {name: UserAssistant['name']} , thunkAPI) => {
    try {
      const res = await client.post('/VirtualAssistants/Add', name);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });