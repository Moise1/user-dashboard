import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './userLoginThunk';


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

export const userLoginSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const userLoginReducer = userLoginSlice.reducer;
