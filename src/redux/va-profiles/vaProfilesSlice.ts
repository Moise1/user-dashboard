import { createSlice } from '@reduxjs/toolkit';
import { getUserAssistants, createUserAssistant, deleteUserAssistant } from './vaProfilesThunk';

export interface UserAssistant {
  id: number;
  name?: string;
  userId?: string;
  active: boolean;
  createdOn?: Date;
}

const initialState = {
  userAssistants: [] as UserAssistant[],
  userAssistant: {},
  userAssistantDeleted: false,
  loading: false,
  error: ''
};

export const userAssistantsSlice = createSlice({
  name: 'userAssistants',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all VA Profiles
    builder.addCase(getUserAssistants.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUserAssistants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userAssistants = payload;
    });
    builder.addCase(getUserAssistants.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    // Create VA Profile
    builder.addCase(createUserAssistant.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(createUserAssistant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userAssistant = payload;
    });
    builder.addCase(createUserAssistant.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    // Delete VA Profile
    builder.addCase(deleteUserAssistant.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteUserAssistant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userAssistantDeleted = payload.success;
    });
    builder.addCase(deleteUserAssistant.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });


  }
});

export const {reducer: userAssistantsReducer }= userAssistantsSlice;
