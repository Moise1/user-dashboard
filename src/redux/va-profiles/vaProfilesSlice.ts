import { createSlice } from '@reduxjs/toolkit';
import { getUserAssistants } from './vaProfilesThunk';

interface UserAssistant {
  id: number;
  name: string;
  userId: string;
  active: boolean;
  createdOn: Date;
}

const initialState = {
  userAssistants: [] as UserAssistant[],
  loading: false,
  error: ''
};

export const userAssistantsSlice = createSlice({
  name: 'userAssistants',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAssistants.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUserAssistants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userAssistants = payload.userAssistants;
    });
    builder.addCase(getUserAssistants.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const userAssistantsReducer = userAssistantsSlice.reducer;
