import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
import {UserAssistant} from './vaProfilesSlice';

export const getUserAssistants = createAsyncThunk(
  'userAssistants/getUserAssistants',
  async (_, thunkAPI) => {
    try {
      const res = await client.get('/VirtualAssistants/Get');
      const vaProfilesData = res.data.response_data.userAssistants.map((vp: UserAssistant, key: number) =>({
        ...vp,
        key
      }));
      
      return vaProfilesData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

export const createUserAssistant = createAsyncThunk(
  'userAssistants/createUserAssistant',
  async ({name}: {name: UserAssistant['name']} , thunkAPI) => {
    try {
      const res = await client.post('/VirtualAssistants/Add', name);
      if(res.status === 200) toastAlert('User assistant successfully added.', 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });


export const deleteUserAssistant = createAsyncThunk(
  'userAssistants/deleteUserAssistant',
  async (args:  UserAssistant , thunkAPI) => {
    try {
      const res = await client.post('/VirtualAssistants/Update', args);
      if(res.status === 200) toastAlert('User assistant successfully deleted.', 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
