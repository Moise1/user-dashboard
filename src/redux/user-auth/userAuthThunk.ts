import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../client';
import {User} from './userAuthSlice';

export const userAuthThunk = createAsyncThunk(
  'user/userAuthThunk' ,
  async ({userData, history}: {userData: User, history: RouteComponentProps['history'] },  thunkAPI)=> {
    try {
      const res = await client.post('/User/Credentials/Login', userData); 
      if(res.data.user.logged) history.push({pathname: '/dashboard'});
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
