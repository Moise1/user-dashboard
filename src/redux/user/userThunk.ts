import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../client';
import {UserData} from './userSlice';
import {toastAlert} from '../../utils/toastAlert';
interface Props { 
  data: UserData; 
  history: RouteComponentProps['history']
}

export const userLogin =  createAsyncThunk(
  'user/userLogin' ,
  async ({data, history}: Props, 
    {rejectWithValue} /* destructured thunkAPI's prop */)=> {
    try {
      const res = await client.post('/User/Credentials/Login', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        toastAlert('Successfully logged in.', 'success');
        history.push('/dashboard');
      }
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

export const userRegister = createAsyncThunk(
  'user/userRegister' ,
  async ({data, history}: Props,  {rejectWithValue})=> {
    try {
      const res = await client.post('/register/user', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/dashboard');
      }
      return res.data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

  


