import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
import { Template } from './templatesSlice';

export const getTemplates = createAsyncThunk('templates/getTemplates', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Templates/List');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const setDefault = createAsyncThunk(
  'templates/MakeDefault',
  async ({ id: templateId, active }: { id: Template['id']; active: Template['isDefault'] }, thunkAPI) => {
    try {
      const res = await client.post('/Templates/MakeDefault/', { templateId, active });
      if (res.status === 200) toastAlert('Template set as default successfully!', 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
