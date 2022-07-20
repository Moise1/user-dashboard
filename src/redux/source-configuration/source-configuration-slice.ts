import { createSlice } from '@reduxjs/toolkit';
import { getSourceConfiguration, saveSourceSetting } from './sources.coonfiguration-thunk';
import { ComputedSettingsData, SavingSetting, SourceSettingData } from './types';

export interface SourceConfigurationState {
  get: {
    loading: boolean;
    settings?: SourceSettingData[];
  };
  saving: SavingSetting[],
  computedConfiguration: {
    loading: boolean;
    settings?: ComputedSettingsData;
  }
}

const initialState: SourceConfigurationState = {
  get: {
    loading: false,
    settings:[]
  },
  saving: [],
  computedConfiguration: {
    loading:false
  }
};

export const sourceSlice = createSlice({
  name: 'source-configuration',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder.addCase(getSourceConfiguration.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(getSourceConfiguration.fulfilled, (state, { payload }) => {
      state.get.loading = false;
      state.get.settings = payload.settings;
      state.saving = [];
    });
    builder.addCase(getSourceConfiguration.rejected, (state) => {
      state.get.loading = false;
    });

    //SAVE
    builder.addCase(saveSourceSetting.pending, (state, { meta }) => {
      if (!state.saving)
        state.saving = [];
      const prv = state.saving.find(x => x.data.key == meta.arg.key && x.data.sourceId == meta.arg.sourceId);
      if (prv) {
        prv.loading = true;
        prv.data = meta.arg;
        prv.success = false;
      } else {
        state.saving.push({
          loading: true,
          data: meta.arg,
          success: false,
        });
      }
    });
    builder.addCase(saveSourceSetting.fulfilled, (state, { payload, meta }) => {
      const prv = state.saving.find(x => x.data.key == meta.arg.key && x.data.sourceId == meta.arg.sourceId);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = payload?.success;
      }
      if (payload?.success && state.get.settings) {
        const vk = state.get.settings.find(x => x.key == meta.arg.key && x.sourceId == meta.arg.sourceId);
        if (vk) {
          vk.value = meta.arg.value;
        } else {
          state.get.settings.push(meta.arg);
        }
      }
    });
    builder.addCase(saveSourceSetting.rejected, (state, { meta }) => {
      const prv = state.saving.find(x => x.data.key == meta.arg.key && x.data.sourceId == meta.arg.sourceId);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = false;
      }
    });
  }
});

export const { reducer: sourcesConfigReducer } = sourceSlice;
