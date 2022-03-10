import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../client';
import {UserData} from './userSlice';
import {toastAlert} from '../../utils/toastAlert';

export const userLogin = createAsyncThunk(
  'user/userLogin' ,
  async ({data, history}: {data: UserData, history: RouteComponentProps['history'] },  thunkAPI)=> {
    try {
      const res = await client.post('/User/Credentials/Login', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        toastAlert('Successfully logged in.', 'success');
        history.push('/dashboard');
      }
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

export const userRegister = createAsyncThunk(
  'user/userRegister' ,
  async ({data, history}: {data: UserData, history: RouteComponentProps['history'] },  thunkAPI)=> {
    try {
      const res = await client.post<UserData>('/register/user', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/dashboard');
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
  
