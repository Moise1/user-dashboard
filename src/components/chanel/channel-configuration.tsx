import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState } from '../../redux/channel-configuration/channels-configuration-slice';
import { getChannels } from '../../redux/channels/channelsThunk';
import { ChannelSettingKey, SettingValue } from '../../types/settings';
import { SettingsPanel } from '../../small-components/settings/settings-panel';
import { ChannelSettingsList } from './configuration/settings-list';
import { ChannelSettingsSections } from './configuration/sections';

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

  const SaveSetting = async (key: ChannelSettingKey, value: SettingValue) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload?.success) {
      dispatch(getChannelConfiguration());
    } else {
      if (key == ChannelSettingKey.NoApiName) {
        await dispatch(getChannels());
      }
    }
  };

  const settingsBeingSaved = new Set<ChannelSettingKey>(savingSettingsState?.filter(x => x.loading)?.map(x => x.data.key));

  return <SettingsPanel
    Loading={settingsLoading}
    OnSaveSetting={SaveSetting}
    SettingsBeingSaved={settingsBeingSaved}
    SettingsData={settings}
    SettingsInfo={ChannelSettingsList}
    Sections={ChannelSettingsSections}
  />;

};
