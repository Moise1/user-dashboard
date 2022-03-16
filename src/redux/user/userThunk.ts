import { createAsyncThunk } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../client';
import {UserData} from './userSlice';
import {toastAlert} from '../../utils/toastAlert';
import {getChannels} from '../channels/channelsThunk';


interface Props { 
  data: UserData; 
  history: RouteComponentProps['history']
}

export const userLogin =  createAsyncThunk(
  'user/userLogin' ,
  async ({data, history}: Props, 
    {rejectWithValue, dispatch} /* destructured thunkAPI's prop */)=> {
    try {
      await dispatch(getChannels());
      const res = await client.post('/User/Credentials/Login', data); 
      if(res.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        toastAlert('Successfully logged in.', 'success');
        history.push('/dashboard');
      }
      // localStorage.setItem('channelId', JSON.stringify(channels[0].id));
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

  


