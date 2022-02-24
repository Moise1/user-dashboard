import { createSlice } from '@reduxjs/toolkit';
import { userAuthThunk } from './userAuthThunk';

export interface User{
 email: string;
 passowrd: string;
 rememberMe: boolean;
}

const initialState = {
  user:  {} as User,
  loading: false,
  error: ''
};

export const userAuthSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // logout(state){
    //   return {
    //     ...state,
    //     loge
    //   };
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(userAuthThunk.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(userAuthThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(userAuthThunk.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const userAuthReducer = userAuthSlice.reducer;
