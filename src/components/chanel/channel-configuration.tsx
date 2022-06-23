import { useEffect } from 'react';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings } from '../../redux/channel-configuration/channels-configuration-slice';
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

  const SaveSetting = async (key: eChannelSettings, value: SettingValue) => {
    const rp = await dispatch(saveChannelSetting({ Key: key, Value: value }));
    if (!rp.payload?.success) {
      dispatch(getChannelConfiguration());
    } else {
      if (key == eChannelSettings.NoApiName) {
        await dispatch(getChannels());
      }
    }
  };

  const settingsBeingSaved = new Set<eChannelSettings>(savingSettingsState?.filter(x => x.loading)?.map(x => x.data.Key));

  return <SettingsPanel
    Loading={settingsLoading}
    OnSaveSetting={SaveSetting}
    SettingsBeingSaved={settingsBeingSaved}
    SettingsData={settings}
    SettingsInfo={ChannelSettingsList}
    Sections={ChannelSettingsSections}
  />;

};
