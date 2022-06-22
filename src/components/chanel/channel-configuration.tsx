import { ReactNode, useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t, TransUtils } from '../../utils/transShim';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, loadBusinessPolicies, loadShipping, refreshBusinessPolicies, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings, SettingsValue } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSetting, ChannelSettingExtra, ChannelSettings } from './configuration/settings';
import { ChannelSettingsSections, ChannelSettingSection } from './configuration/sections';
import { SettingDataBag, SettingInput } from '../../small-components/settings/setting-input';
import { ReactUtils } from '../../utils/react-utils';
import { Platforms } from '../../data/platforms';
import { getTemplates } from '../../redux/templates/templatesThunk';
import { TemplateState } from '../../redux/templates/templatesSlice';
import { getChannels } from '../../redux/channels/channelsThunk';

export const ChannelConfiguration = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId.toString() ?? '1'];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo) };

  const [activeTab, setActiveTab] = useState<ChannelSettingSection>(ChannelSettingSection.Monitoring);
  const sections = ChannelSettingsSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0));

  const bag: SettingDataBag = { selectedChannel };

  //Load from api------------------------------------------------------------
  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState,
    refreshBusinessInProgress,
    refreshBusinessLoading,
    businessPolicies,
    loadingBusiness,
    loadingShipping,
    shipping
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getChannelConfiguration());
  }, [getChannelConfiguration]);

  const LoadTemplate = () => {//We can do this inside an if because ChannelSettings doesn't change
    const {
      templates,
      loading: tLoading
    } = useAppSelector((state) => state.templates as TemplateState);

    bag.templates = {
      loading: tLoading,
      data: templates
    };

    useEffect(() => {
      dispatch(getTemplates());
    }, [getTemplates]);
  };

  const LoadPolicies = () => {
    bag.refreshBussiness = {
      loading: refreshBusinessLoading,
      data: refreshBusinessInProgress
    };
    bag.business = {
      data: businessPolicies,
      loading: loadingBusiness
    };
    bag.shipping = {
      data: shipping,
      loading: loadingShipping
    };

    useEffect(() => {
      dispatch(loadShipping());
    }, [loadShipping]);

    useEffect(() => {
      dispatch(loadBusinessPolicies());
    }, [loadBusinessPolicies]);
  };

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
