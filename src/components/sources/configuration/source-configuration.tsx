import { ReactNode, useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import { StatusBar } from '../../../small-components/StatusBar';
import { StatusBtn } from '../../../small-components/StatusBtn';
import { t, TransUtils } from '../../../utils/transShim';
import '../../sass/channel-settings.scss';
import { SettingDataBag, SettingInput } from '../../../small-components/settings/setting-input';
import { ReactUtils } from '../../../utils/react-utils';
import { Platforms } from '../../../data/platforms';
import { getChannels } from '../../../redux/channels/channelsThunk';
import { ePlatform } from '../../../utils/ePlatform';

interface Props {
  Sections: number[],

}

export const SourceConfiguration = (props: Props) => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId ?? ePlatform.eBay];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo) };

  const [activeTab, setActiveTab] = useState<ChannelSettingSection>(Sections);
  const sections = SettingsSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0));

  const bag: SettingDataBag = { selectedChannel };

  {
    const allExtras = ([] as ChannelSettingExtra[]).concat.apply([], ChannelSettings.filter(x => !!x.Extra).map(x => x.Extra!));
    let policies = false;
    let templates = false;
    for (const e of allExtras ?? []) {
      switch (e) {
        case ChannelSettingExtra.TemplateList:
          templates = true;
          break;
        case ChannelSettingExtra.BusinessPayment:
        case ChannelSettingExtra.BusinessReturn:
        case ChannelSettingExtra.BusinessShipping:
        case ChannelSettingExtra.PolicyDelivery:
        case ChannelSettingExtra.RefreshPolicies:
          policies = true;
          break;
      }
    }
    if (templates) {
      LoadTemplate();
    }
    if (policies) {
      LoadPolicies();
    }
  }
  //---------------------------------------------------------------------

  const SaveSetting = async (key: eChannelSettings, value: SettingsValue) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload?.success) {
      dispatch(getChannelConfiguration());
    } else {
      if (key == eChannelSettings.NoApiName) {
        await dispatch(getChannels());
      }
    }
  };

  const OnButtonClick = async (setting: ChannelSetting) => {
    for (const e of setting.Extra ?? []) {
      switch (e) {
        case ChannelSettingExtra.RefreshPolicies:
          dispatch(refreshBusinessPolicies());
          break;
      }
    }
  };

  const configuration = new Map(settings?.map(x => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map(x => [x.data.key, x]));

  const RenderSetting = (setting: ChannelSetting) => {
    return <SettingInput
      key={setting.Fields[0] ?? ('_' + setting.Extra?.join('_'))}
      setting={setting}
      savingSetting={savingSetting}
      currentSettingValues={configuration}
      onSave={SaveSetting}
      translationValues={translationValues}
      dataBag={bag}
      onButtonClick={() => OnButtonClick(setting)}
    />;
  };

  const RenderSettings = (section: ChannelSettingSection): ReactNode => {
    const settings = ChannelSettings.filter(
      x => x.Section == section
        && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
    return <>
      {settings.map(x => RenderSetting(x))}
    </>;
  };

  const RenderContent = (index: ChannelSettingSection): ReactNode => RenderSettings(index);

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
