import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../client';
import {User} from './userAuthSlice';

export const userLogin = createAsyncThunk(
  'user/userLogin' ,
  async ({data, history}: {data: User, history: RouteComponentProps['history'] },  thunkAPI)=> {
    try {
      const res = await client.post<User>('/User/Credentials/Login', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/dashboard');
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });

export const userRegister = createAsyncThunk(
  'user/userRegister' ,
  async ({data, history}: {data: User, history: RouteComponentProps['history'] },  thunkAPI)=> {
    try {
      const res = await client.post<User>('/register/user', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/dashboard');
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
  