import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { client } from '../../client';

export interface Rule {
  id: number;
  userId: string;
  sourceId: number;
  priceFrom: number;
  priceTo: number;
  markup: number;
  createdOn: Date;
  active: boolean;
  channelOAuthId: number;
}

const initialState = {
  rules: [] as Rule[],
  loading: false,
  error: ''
};
type TPayload = {
  rules: Rule[];
  loading: boolean;
  error: string;
};

export const pricingRulesSlice = createSlice({
  name: 'Pricing Rules',
  initialState: initialState,
  reducers: {
    pricingRulesPending: (state) => {
      state.rules;
      state.loading = true;
      state.error;
    },
    pricingRulesSuccess: (state, { payload }: PayloadAction<TPayload>) => {
      state.rules = payload.rules;
      state.loading = false;
      state.error = payload.error;
    }
  }
});

export const pricingRulesReducer = pricingRulesSlice.reducer;
export const { pricingRulesPending, pricingRulesSuccess } = pricingRulesSlice.actions;

export const fetchPricingRules = () => async (dispatch: Dispatch) => {
  dispatch(pricingRulesPending());
  try {
    await client.post('/User/Credentials/Login', {
      email: 'testing@hustlegotreal.com',
      password: 'HGR2021',
      rememberMe: true
    });
    const channels = (await client.get<{ channels: { id: number }[] }>('/User/Channels/Get')).data?.channels;
    if (channels?.length > 0) {
      client.defaults.headers.common['channel'] = channels[0].id; //Not working, WHY?
    }
    const res = await client.get('/Pricing/Get', { headers: { channel: channels[0].id } }); //I had to set manually to test it

    dispatch(pricingRulesSuccess(res.data));
  } catch (error) {
    console.log('error', error);
  }
};