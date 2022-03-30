import {ReactNode} from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { getTemplates} from './templatesThunk';

export interface Template {
    id: number;
    userId: string;
    html: ReactNode;
    isDefault: boolean;
    createdOn: Date;
    name: string;
    originalTemplateId: number;
    channelOAuthId: number
}


const initialState = {
  templates: [] as Template[],
  loading: false,
  error: ''
};

export const templatesSlice = createSlice({
  name: 'templates',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTemplates.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getTemplates.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.templates = payload;
    });
    builder.addCase(getTemplates.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: templatesReducer } = templatesSlice;
