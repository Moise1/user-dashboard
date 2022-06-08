import { useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t, TransUtils } from '../../utils/transShim';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings, SettingsValue } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSetting, ChannelSettings } from './configuration/settings';
import { ChannelSettingsSections, ChannelSettingSection } from './configuration/sections';
import { SettingInput } from '../../small-components/settings/setting-input';
import { ReactUtils } from '../../utils/react-utils';
import { Platforms } from '../../data/platforms';

export const ChannelConfiguration = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId.toString() ?? '1'];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo)};

  const [activeTab, setActiveTab] = useState<ChannelSettingSection>(ChannelSettingSection.Monitoring);
  const sections = ChannelSettingsSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0));

  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getChannelConfiguration());
  }, [getChannelConfiguration]);

  const SaveSetting = async (key: eChannelSettings, value: SettingsValue) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload) {
      dispatch(getChannelConfiguration());
    }
  };

  const configuration = new Map(settings?.map(x => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map(x => [x.data.key, x]));

  const RenderSetting = (setting: ChannelSetting) => {
    return <SettingInput setting={setting} savingSetting={savingSetting} currentSettingValues={configuration} onSave={SaveSetting} translationValues={translationValues} />;
  };

  const RenderSettings = (section: ChannelSettingSection): JSX.Element => {
    const settings = ChannelSettings.filter(
      x => x.Section == section
      && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
    return <>
      {settings.map(x => RenderSetting(x))}
    </>;
  };

  const RenderContent = (index: ChannelSettingSection): JSX.Element => RenderSettings(index);

  const loading = settingsLoading || !settings;

  return (
    <Layout className='channel-settings'>
      <StatusBar>
        <>
          {!loading && <>
            {
              sections.map((x, i) =>
                <StatusBtn
                  key={i}
                  title={t(x.Label) as string}
                  changeTab={_ => setActiveTab(x.Type)}
                  className={activeTab == x.Type ? 'active-tab' : ''}
                  id={i.toString()}
                />
              )
            }
          </>
          }
        </>
      </StatusBar>
      <Row className="content">
        {!loading && RenderContent(activeTab)}
      </Row>
    </Layout>
  );
};
