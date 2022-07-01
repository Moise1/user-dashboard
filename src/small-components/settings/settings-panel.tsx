import { ReactNode, useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
import { StatusBar } from '../StatusBar';
import { StatusBtn } from '../StatusBtn';
import { t, TransUtils } from '../../utils/transShim';
import '../../sass/settings/settings-panel.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { loadBusinessPolicies, loadShipping, refreshBusinessPolicies, } from '../../redux/channel-configuration/channels-configuration-thunk';
import { SettingDataBag, SettingInput } from './setting-input';
import { ReactUtils } from '../../utils/react-utils';
import { Platforms } from '../../data/platforms';
import { getTemplates } from '../../redux/templates/templatesThunk';
import { TemplateState } from '../../redux/templates/templatesSlice';
import { ePlatform } from '../../types/ePlatform';
import { SettingData, SettingExtra, SettingInfo, SettingKey, SettingSectionId, SettingSectionsInfo, SettingValue } from '../../types/settings';
import { ChannelConfigurationState } from '../../redux/channel-configuration/channels-configuration-slice';

interface Props {
  Sections?: SettingSectionsInfo[];
  SettingsData?: SettingData[] | null;
  SettingsInfo: SettingInfo[];
  OnSaveSetting: (key: SettingKey, value: SettingValue) => void;
  SettingsBeingSaved: Set<SettingKey>;
  Loading: boolean;
  SuperiorData?: SettingData[] | null;
  SuperiorRelation?: Map<SettingKey, SettingKey>;
}

export const SettingsPanel = (props: Props) => {
  const { Sections, SettingsData, SettingsInfo, OnSaveSetting, SettingsBeingSaved, Loading, SuperiorData, SuperiorRelation } = props;

  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId ?? ePlatform.eBay];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo) };

  const [activeTab, setActiveTab] = useState<SettingSectionId>((!!Sections && Sections.length > 0 ? Sections[0]?.Type : undefined) ?? 0);
  const sections = Sections?.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0));

  const bag: SettingDataBag = { selectedChannel };

  const superiorDataDic =  new Map<SettingKey, SettingValue>(SuperiorData?.map(x => [x.key, x.value]));

  //Load from api------------------------------------------------------------
  const dispatch = useAppDispatch();
  const {
    refreshBusinessInProgress,
    refreshBusinessLoading,
    businessPolicies,
    loadingBusiness,
    loadingShipping,
    shipping,

  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  const LoadTemplate = () => {//We can do this inside an if because ChannelSettings doesn't change
    const {
      templates,
      loading: loadingTemplates
    } = useAppSelector((state) => state.templates as TemplateState);

    bag.templates = {
      loading: loadingTemplates,
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
      dispatch(loadBusinessPolicies());
    }, [loadShipping, loadBusinessPolicies]);
  };

  {
    const allExtras = ([] as SettingExtra[]).concat.apply([], SettingsInfo.filter(x => !!x.Extra).map(x => x.Extra!));
    let policies = false;
    let templates = false;
    for (const e of allExtras ?? []) {
      switch (e) {
        case SettingExtra.TemplateList:
          templates = true;
          break;
        case SettingExtra.BusinessPayment:
        case SettingExtra.BusinessReturn:
        case SettingExtra.BusinessShipping:
        case SettingExtra.PolicyDelivery:
        case SettingExtra.RefreshPolicies:
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

  const OnButtonClick = async (setting: SettingInfo) => {
    for (const e of setting.Extra ?? []) {
      switch (e) {
        case SettingExtra.RefreshPolicies:
          dispatch(refreshBusinessPolicies());
          break;
      }
    }
  };

  const configuration = new Map(SettingsData?.map(x => [x.key, x.value]) ?? []);

  const RenderSetting = (setting: SettingInfo) => {
    return <SettingInput
      key={setting.Fields[0] ?? ('_' + setting.Extra?.join('_'))}
      setting={setting}
      settingsBeingSaved={SettingsBeingSaved}
      currentSettingValues={configuration}
      onSave={OnSaveSetting}
      translationValues={translationValues}
      dataBag={bag}
      onButtonClick={() => OnButtonClick(setting)}
      superiorData={superiorDataDic}
      superiorRelation={SuperiorRelation}
    />;
  };

  const RenderSettings = (section: SettingSectionId): ReactNode => {
    const settings = SettingsInfo.filter(
      x => (
        (sections?.length ?? 0) == 0 || x.Section == section)
        && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
    return <>
      {settings.map(x => RenderSetting(x))}
    </>;
  };

  const RenderContent = (index: SettingSectionId): ReactNode => RenderSettings(index);

  const loading = Loading || !SettingsData;

  return (
    <Layout className='settings-panel'>
      {(sections?.length ?? 0) > 0 &&
        <StatusBar>
          <>
            {!loading && <>
              {
                sections?.map((x, i) =>
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
      }
      <Row className="content">
        {!loading && RenderContent(activeTab)}
      </Row>
    </Layout>
  );
};
