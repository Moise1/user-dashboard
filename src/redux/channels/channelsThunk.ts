// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { client } from '../client';

// export const getChannels = createAsyncThunk(
//   'channels/getChannels',
//   async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
//     try {
//       const res = await client.get('/User/Channels/Get');
//       const channels = res.data.reponse_data.channels;
//       localStorage.setItem('channelId', JSON.stringify(channels[0].id));
//       return channels;
//     } catch (error) {
//       return rejectWithValue('Sorry! Something went wrong ):') ;
//     }
//   });

export {};