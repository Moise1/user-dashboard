import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegister, getUserToken, getUserQuota } from './userThunk';
export interface UserData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  terms?: boolean;
  success?: boolean;
  referral?: string;
  affiliateTag?: string;
  createdOn?: Date;
  isEnabled: boolean;
  quotaUsed?: number;
  quotaAdded?: number;
  selectedOAuthId?: number;
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
}

const initialState = {
  user: {} as UserData,
  tokens: null,
  quota: null,
  loading: false,
  error: ''
};

export interface ProductQuota {
  quota: number;
  used: number;
  price: number;
  endsOn: Date;
  currency: string;
  pending: number;
  cancelled: boolean;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    // User Login
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

    // User Register
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    // Users's tokens
    builder.addCase(getUserToken.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUserToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tokens = payload;
    });
    builder.addCase(getUserToken.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    // Users's Quota
    builder.addCase(getUserQuota.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUserQuota.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.quota = payload;
    });
    builder.addCase(getUserQuota.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: userReducer, actions } = userSlice;
