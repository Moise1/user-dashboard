import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration } from '../../../redux/channel-configuration/channels-configuration-thunk';
import { SettingValue, SourceSettingKey, SourceSettingSuperior } from '../../../types/settings';
import { SettingsPanel } from '../../../small-components/settings/settings-panel';
import { getSourceConfiguration, saveSourceSetting } from '../../../redux/source-configuration/sources.coonfiguration-thunk';
import { SourceConfigurationState } from '../../../redux/source-configuration/source-configuration-slice';
import { SourceSettingsList } from './settings-list';
import { ChannelConfigurationState } from '../../../redux/channel-configuration/channels-configuration-slice';

interface Props {
  sourceId: number;
}

export const SourceSettings = (props:Props) => {
  const { sourceId } = props;

  //Load from api------------------------------------------------------------
  const dispatch = useAppDispatch();
  const {
    get: { loading: settingsLoading, settings },
    saving
  } = useAppSelector((state) => state.sourcesConfiguration as SourceConfigurationState);
  const {
    settings: chSettings,
    loading: chSettingsLoading,
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getSourceConfiguration());
    dispatch(getChannelConfiguration());
  }, [getSourceConfiguration, getChannelConfiguration]);

  //---------------------------------------------------------------------

  const SaveSetting = async (key: SourceSettingKey, value: SettingValue) => {
    const rp = await dispatch(saveSourceSetting({ key: key, value: value, sourceId: sourceId }));
    if (!rp.payload?.success) {
      dispatch(getSourceConfiguration());
    }
  };

  const settingsBeingSaved = new Set<SourceSettingKey>(saving?.filter(x => x.loading && x.data.sourceId == sourceId)?.map(x => x.data.key));

  return <SettingsPanel
    key={sourceId}
    Loading={settingsLoading || chSettingsLoading}
    OnSaveSetting={SaveSetting}
    SettingsBeingSaved={settingsBeingSaved}
    SettingsData={settings?.filter(x => x.sourceId == sourceId)}
    SettingsInfo={SourceSettingsList.filter(x => !x.Sources || x.Sources.includes(sourceId))}
    Sections={[]}
    SuperiorData={chSettings}
    SuperiorRelation={SourceSettingSuperior}
  />;

};
