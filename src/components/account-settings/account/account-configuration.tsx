import { ReactNode, useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import { StatusBar } from '../../../small-components/StatusBar';
import { StatusBtn } from '../../../small-components/StatusBtn';
import { t, TransUtils } from '../../../utils/transShim';
import '../../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxCustomHooks';
import { getAccountConfiguration, saveAccountSetting } from '../../../redux/account-configuration/account-configuration-thunk';
import { AccountConfigurationState, eAccountSettings, SettingsValue } from '../../../redux/account-configuration/account-configuration-slice';
import { AccountSetting, AccountSettings } from '../configuration/settings';
import { AccountSettingSections, AccountSettingSection } from '../configuration/sections';
import { SettingDataBag, SettingInput } from '../../../small-components/settings/setting-input';
import { ReactUtils } from '../../../utils/react-utils';
import { Platforms } from '../../../data/platforms';

import { getChannels } from '../../../redux/channels/channelsThunk';

export const AccountConfiguration = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId.toString() ?? '1'];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo) };

  const [activeTab, setActiveTab] = useState<AccountSettingSection>(AccountSettingSection.Monitoring);
  const sections = AccountSettingSections.filter(
    (x) => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0)
  );

  const bag: SettingDataBag = { selectedChannel };

  //Load from api------------------------------------------------------------
  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.AccountConfiguration as AccountConfigurationState);

  useEffect(() => {
    dispatch(getAccountConfiguration());
  }, [getAccountConfiguration]);

  const SaveSetting = async (key: eAccountSettings, value: SettingsValue) => {
    const rp = await dispatch(saveAccountSetting({ key: key, value: value }));
    if (!rp.payload?.success) {
      dispatch(getAccountConfiguration());
    } else {
      if (key == eAccountSettings.NoApiName) {
        await dispatch(getChannels());
      }
    }
  };



  const configuration = new Map(settings?.map((x) => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map((x) => [x.data.key, x]));

  const RenderSetting = (setting: AccountSetting) => {
    return (
      <SettingInput
        key={setting.Fields[0]}
        setting={setting}
        savingSetting={savingSetting}
        currentSettingValues={configuration}
        onSave={SaveSetting}
        translationValues={translationValues}
        dataBag={bag}

      />
    );
  };

  const RenderSettings = (section: AccountSettingSection): ReactNode => {
    const settings = AccountSettings.filter(
      (x) => x.Section == section && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
    return <>{settings.map((x) => RenderSetting(x))}</>;
  };

  const RenderContent = (index: AccountSettingSection): ReactNode => RenderSettings(index);

  const loading = settingsLoading || !settings;

  return (
    <Layout className="channel-settings">
      <StatusBar>
        <>
          {!loading && (
            <>
              {sections.map((x, i) => (
                <StatusBtn
                  key={i}
                  title={t(x.Label) as string}
                  changeTab={(_) => setActiveTab(x.Type)}
                  className={activeTab == x.Type ? 'active-tab' : ''}
                  id={i.toString()}
                />
              ))}
            </>
          )}
        </>
      </StatusBar>
      <Row className="content">{!loading && RenderContent(activeTab)}</Row>
    </Layout>
  );
};
