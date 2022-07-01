import { createSlice } from '@reduxjs/toolkit';
import { getNoApiServers ,getManagedServers} from './noApiServersThunk';

export interface NoApiServer{ 
    isoCountry: number;
    id: null;
    channelId: number;
    displayName: null;
    nextPayment: Date;
    price: number;
    currencyId: number;
    cancelled: boolean
}

const initialState = {
  noApiServersResult: [] as NoApiServer[],
  loading: false,
  error: ''
};
const initialStatee = {
  manageServerResult: [] as NoApiServer[],
  loading: false,
  error: ''
};
export const noApiServersSlice = createSlice({
  name: 'dashboard-no-api-servers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoApiServers.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getNoApiServers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.noApiServersResult = payload;
    });
    builder.addCase(getNoApiServers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const getManagedServersSlice = createSlice({
  name:'get-managed-servers',
  initialState:initialStatee,
  reducers:{},
  extraReducers:(builder)=>
  {
    builder.addCase(getManagedServers.pending,(state)=>
    {
      state.loading=false;
      state.error='';
    });
    builder.addCase(getManagedServers.fulfilled,(state, {payload})=>
    {
      state.loading=false;
      state.manageServerResult=payload;
    });
    builder.addCase(getManagedServers.rejected, (state, {payload})=>
    {
      state.loading=false;
      state.error=String(payload);
    });
  }
});

export const {reducer: noApiServersReducer} = noApiServersSlice;
export const {reducer: getManagedServersReducer} = getManagedServersSlice;