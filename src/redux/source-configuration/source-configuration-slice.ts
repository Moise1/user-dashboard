import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: false,
  error: ''
};

export const sourceSlice = createSlice({
  name: 'source-configuration',
  initialState: initialState,
  reducers: {}
  //extraReducers: (builder) => {
    
  //}
});

export const { reducer: sourcesConfigReducer } = sourceSlice;
