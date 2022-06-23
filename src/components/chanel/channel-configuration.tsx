import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, SettingKey } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSettingsList } from './configuration/channel-settings';
import { ChannelSettingsSections } from './configuration/channel-sections';
import { getChannels } from '../../redux/channels/channelsThunk';
import { SettingValue } from '../../types/settings';
import { SettingsPanel } from '../../small-components/settings/settings-panel';

export const ChannelConfiguration = () => {
  //Load from api------------------------------------------------------------
  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getChannelConfiguration());
  }, [getChannelConfiguration]);

  //---------------------------------------------------------------------

  const SaveSetting = async (key: SettingKey, value: SettingValue) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload?.success) {
      dispatch(getChannelConfiguration());
    } else {
      if (key == SettingKey.NoApiName) {
        await dispatch(getChannels());
      }
    }
  };

  const settingsBeingSaved = new Set<SettingKey>(savingSettingsState?.filter(x => x.loading)?.map(x => x.data.key));

  return <SettingsPanel
    Loading={settingsLoading}
    OnSaveSetting={SaveSetting}
    SettingsBeingSaved={settingsBeingSaved}
    SettingsData={settings}
    SettingsInfo={ChannelSettingsList}
    Sections={ChannelSettingsSections}
  />;

};
