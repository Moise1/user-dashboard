import { useEffect, useState } from 'react';
import { Layout, Row, Col, Input, Spin, Switch, Radio } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { ChannelListing } from '../../small-components/ChannelListing';
import { ChannelBusiness } from '../../small-components/ChannelBusiness';
import { ChannelOther } from '../../small-components/ChannelOther';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSetting, ChannelSettings, ChannelSettingSection, SettingType } from './configuration/settings';
import { SettingBoolean } from '../../small-components/settings/setting-boolean';
import { SettingNumber } from '../../small-components/settings/setting-number';

export const ChannelConfiguration = () => {
  const [index, setIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getChannelConfiguration());
  }, [getChannelConfiguration]);

  const SaveSetting = async (key: eChannelSettings, value:string) => {
    await dispatch(saveChannelSetting({ key: key, value: value }));
  };

  const configuration = new Map(settings?.map(x => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map(x => [x.data.key, x]));

  const RenderSettingTwoOptionsTwo = (setting: ChannelSetting) => {
    const valueC = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];
    const valueV = configuration?.get(setting.Fields[1]) ?? setting.DefaultValues[1];
    const check1 = setting.DefaultValues[2];
    const check2 = setting.DefaultValues[3];
    return (
      <Col span={8} className='limit-section'>
        <div className='limit-area'>
          <Radio className='radio' defaultChecked={valueC == check1}>{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' defaultChecked={valueC == check2}>{t(setting.Labels[2])}</Radio>
            <Input defaultValue={valueV} className='blue-input limit-input' />
          </div>
        </div>
      </Col>
    );
  };

  const RenderSettingTwoOptions = (setting: ChannelSetting) => {
    const defaultFValue = setting.DefaultValues[0];
    const value = configuration?.get(setting.Fields[0]) ?? defaultFValue;
    const defaultSValue = setting.DefaultValues[1];
    return (
      <Col span={8} className='limit-section'>
        <div className='limit-area'>
          <Radio className='radio' defaultChecked={value == defaultFValue} >{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' defaultChecked={value != defaultFValue}>{t(setting.Labels[2])}</Radio>
            <Input defaultValue={value == defaultFValue ? defaultSValue : value} className='blue-input limit-input' />
          </div>
        </div>
      </Col>
    );
  };

  const RenderSettingSwitchTwoOptions = (setting: ChannelSetting) => {
    const value = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];
    const valueSubvalue = configuration?.get(setting.Fields[1]) ?? setting.DefaultValues[1];
    const valueFirstCheck = setting.DefaultValues[2];
    const valueSecondCheck = setting.DefaultValues[3];
    const switchOn = (value == '1' || value.toLowerCase() == 'true');
    return (
      <Col span={8} className='limit-section'>
        <div className='switch-container'>
          <Switch defaultChecked={switchOn} />
        </div>
        <div className='limit-area'>
          <Radio className='radio' disabled={!switchOn} defaultChecked={valueSubvalue == valueFirstCheck} >{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' disabled={!switchOn} defaultChecked={valueSubvalue != valueFirstCheck}>{t(setting.Labels[2])}</Radio>
            <Input defaultValue={valueSubvalue == valueFirstCheck ? valueSecondCheck : valueSubvalue} className='blue-input limit-input' />
          </div>
        </div>
      </Col>
    );
  };

  const RenderSettingNumber = (setting: ChannelSetting) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];

    return (
      <Col span={8} className='input-container'>
        <SettingNumber value={value} onChange={v => SaveSetting(setting.Fields[0], v)} key={setting.Fields[0]} loading={savingState?.loading ?? false} />
      </Col>
    );
  };

  const RenderSettingBoolean = (setting: ChannelSetting) => {
    const value = (configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0]);
    return (
      <Col span={8} className='switch-container'>
        <SettingBoolean value={value}/>
      </Col>
    );
  };

  const RenderSetting = (setting: ChannelSetting) => {
    let input: JSX.Element;
    switch (setting.Type) {
    default:
    case SettingType.Number:
      input = RenderSettingNumber(setting);
      break;
    case SettingType.Boolean:
      input = RenderSettingBoolean(setting);
      break;
    case SettingType.TwoOptions:
      input = RenderSettingTwoOptions(setting);
      break;
    case SettingType.TwoOptionsTwo:
      input = RenderSettingTwoOptionsTwo(setting);
      break;
    case SettingType.SwitchTwoOptions:
      input = RenderSettingSwitchTwoOptions(setting);
      break;
    }

    const statusSaving = setting.Fields.map(x => savingSetting.get(x));
    const isSavingLoading = statusSaving.some(x => x?.loading);

    return (
      <Row className='description-and-controls' key={setting.Fields[0]}>
        <Col span={11} className='description-area'>
          <h2>{t(setting.Labels[0])}</h2>
          {setting.Description.map((x, i) => <p key={i}>{t(x)}</p>)}
        </Col>
        {input}
        <Col span={1}>
          {isSavingLoading && <div><Spin /></div>}
        </Col>
      </Row>
    );
  };

  const RenderSettings = (section: ChannelSettingSection): JSX.Element => {
    const settings = ChannelSettings.filter(x => x.Section == section);
    return <>
      {settings.map(x => RenderSetting(x))}
    </>;
  };

  const ChannelMonitoring = () => RenderSettings(ChannelSettingSection.Monitoring);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return ChannelMonitoring();
    case 1:
      return <ChannelListing />;
    case 2:
      return <ChannelBusiness />;
    case 3:
      return <ChannelOther />;
    default:
      return <></>;
    }
  };

  const handleChangeTab = (e: React.MouseEvent, index: number): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setIndex(index);
  };

  if (settingsLoading || !settings)
    return <Spin />;

  return (
    <Layout className='channel-settings'>
      <StatusBar>
        <StatusBtn
          title={`${t('Channel.Monitoring')}`}
          changeTab={(e) => handleChangeTab(e, 0)}
          className={activeTab === 0 ? 'active-tab' : ''}
          id='0'
        />
        <StatusBtn
          title={`${t('Channel.Listing')}`}
          changeTab={(e) => handleChangeTab(e, 1)}
          className={activeTab === 1 ? 'active-tab' : ''}
          id='1'
        />
        <StatusBtn
          title={`${t('Channel.Business')}`}
          changeTab={(e) => handleChangeTab(e, 2)}
          className={activeTab === 2 ? 'active-tab' : ''}
          id='2'
        />
        <StatusBtn
          title={`${t('Channel.Other')}`}
          changeTab={(e) => handleChangeTab(e, 3)}
          className={activeTab === 3 ? 'active-tab' : ''}
          id='3'
        />
      </StatusBar>
      <Row className='content'>
        {renderContent(index)}
      </Row>
    </Layout>
  );
};
