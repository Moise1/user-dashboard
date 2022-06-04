import { useEffect, useState } from 'react';
import { Layout, Row, Col, Input, Spin, Switch, Radio } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSetting, ChannelSettings, SettingType } from './configuration/settings';
import { SettingBoolean } from '../../small-components/settings/setting-boolean';
import { SettingNumber } from '../../small-components/settings/setting-number';
import { ChannelSettingsSections, ChannelSettingSection } from './configuration/sections';
import { ChannelsState } from '../../redux/channels/channelsSlice';

export const ChannelConfiguration = () => {
  const [index, setIndex] = useState<ChannelSettingSection>(ChannelSettingSection.Monitoring);
  const [activeTab, setActiveTab] = useState<number>(0);

  const selectedChannel = (()=>{
    const { channels } = useAppSelector((state) => state.channels as ChannelsState);
    const selectedChannelId = parseInt(localStorage.getItem('channelId') ?? '');
    return channels.find(x => x.id == selectedChannelId);
  })();

  const dispatch = useAppDispatch();
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);

  useEffect(() => {
    dispatch(getChannelConfiguration());
  }, [getChannelConfiguration]);

  const DisabledAncestors = (setting: ChannelSetting) => {
    if (!setting.Ancestors)
      return false;

    for (const se of setting?.Ancestors) {
      const f = settings?.find(x => x.key == se.Field);
      if (f) {
        if (f.value != se.Value)
          return true;
      } else {//User doesn't have defined a value for this setting, so we will get the default value
        for (const cs of ChannelSettings) {
          for (let i = 0; i < cs.Fields.length; i++) {//O(n^3)... not the best but it is a small quantity of data, no problem
            if (cs.Fields[i] == se.Field && cs.DefaultValues[i] != se.Value) {//Field[n] and DefaultValues[n] should be related
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  const SaveSetting = async (key: eChannelSettings, value: string) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload) {
      dispatch(getChannelConfiguration());
    }
  };

  const configuration = new Map(settings?.map(x => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map(x => [x.data.key, x]));

  const RenderSettingTwoOptionsTwo = (setting: ChannelSetting, disabled: boolean) => {
    const valueC = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];
    const valueV = configuration?.get(setting.Fields[1]) ?? setting.DefaultValues[1];
    const check1 = setting.DefaultValues[2];
    const check2 = setting.DefaultValues[3];
    return (
      <Col span={8} className='limit-section'>
        <div className='limit-area'>
          <Radio className='radio' defaultChecked={valueC == check1} disabled={disabled}>{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' defaultChecked={valueC == check2} disabled={disabled}>{t(setting.Labels[2])}</Radio>
            <Input defaultValue={valueV} className='blue-input limit-input' disabled={disabled} />
          </div>
        </div>
      </Col>
    );
  };

  const RenderSettingTwoOptions = (setting: ChannelSetting, disabled: boolean) => {
    const defaultFValue = setting.DefaultValues[0];
    const value = configuration?.get(setting.Fields[0]) ?? defaultFValue;
    const defaultSValue = setting.DefaultValues[1];
    return (
      <Col span={8} className='limit-section'>
        <div className='limit-area'>
          <Radio className='radio' defaultChecked={value == defaultFValue} disabled={disabled} >{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' defaultChecked={value != defaultFValue} disabled={disabled} >{t(setting.Labels[2])}</Radio>
            <Input defaultValue={value == defaultFValue ? defaultSValue : value} className='blue-input limit-input' disabled={disabled} />
          </div>
        </div>
      </Col>
    );
  };

  const RenderSettingSwitchTwoOptions = (setting: ChannelSetting, disabled: boolean) => {
    const value = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];
    const valueSubvalue = configuration?.get(setting.Fields[1]) ?? setting.DefaultValues[1];
    const valueFirstCheck = setting.DefaultValues[2];
    const valueSecondCheck = setting.DefaultValues[3];
    const switchOn = (value == '1' || value.toLowerCase() == 'true');
    return (
      <Col span={8} className='limit-section'>
        <div className='switch-container'>
          <Switch defaultChecked={switchOn} disabled={disabled}/>
        </div>
        <div className='limit-area'>
          <Radio className='radio' disabled={!switchOn || disabled} defaultChecked={valueSubvalue == valueFirstCheck}>{t(setting.Labels[1])}</Radio>
          <div className='limit'>
            <Radio className='radio' disabled={!switchOn || disabled} defaultChecked={valueSubvalue != valueFirstCheck}>{t(setting.Labels[2])}</Radio>
            <Input defaultValue={valueSubvalue == valueFirstCheck ? valueSecondCheck : valueSubvalue} className='blue-input limit-input' disabled={disabled} />
          </div>
        </div>
      </Col>
    );
  };


  const RenderSettingNumber = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];

    return (
      <Col span={8} className='input-container'>
        <SettingNumber value={value} onChange={v => SaveSetting(setting.Fields[0], v)} key={setting.Fields[0]} loading={savingState?.loading ?? false} disabled={disabled} />
      </Col>
    );
  };

  const RenderSettingBoolean = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.DefaultValues[0];
    return (
      <Col span={8} className='switch-container'>
        <SettingBoolean value={value} onChange={v => SaveSetting(setting.Fields[0], v)} loading={savingState?.loading ?? false} disabled={disabled}/>
      </Col>
    );
  };

  const RenderSetting = (setting: ChannelSetting) => {
    const disabled = DisabledAncestors(setting);

    let input: JSX.Element;
    switch (setting.Type) {
    default:
    case SettingType.Number:
      input = RenderSettingNumber(setting, disabled);
      break;
    case SettingType.Boolean:
      input = RenderSettingBoolean(setting, disabled);
      break;
    case SettingType.TwoOptions:
      input = RenderSettingTwoOptions(setting, disabled);
      break;
    case SettingType.TwoOptionsTwo:
      input = RenderSettingTwoOptionsTwo(setting, disabled);
      break;
    case SettingType.SwitchTwoOptions:
      input = RenderSettingSwitchTwoOptions(setting, disabled);
      break;
    }

    return (
      <Row className={ 'description-and-controls' + (disabled ? ' disabled' : '')} key={setting.Fields[0]}>
        <Col span={12} className='description-area'>
          <h2 className={disabled ? 'disabled' : ''}>{t(setting.Labels[0])}</h2>
          {setting.Description.map((x, i) => <p key={i}>{t(x)}</p>)}
        </Col>
        {input}
      </Row>
    );
  };

  const RenderSettings = (section: ChannelSettingSection): JSX.Element => {
    const settings = ChannelSettings.filter(x => x.Section == section);
    return <>
      {settings.map(x => RenderSetting(x))}
    </>;
  };

  const RenderContent = (index: ChannelSettingSection): JSX.Element => RenderSettings(index);

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
        {ChannelSettingsSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0)).map((x, i) => 
          <StatusBtn
            key={i}
            title={t(x.Label) as string}
            changeTab={(e) => handleChangeTab(e, x.Type)}
            className={activeTab == x.Type ? 'active-tab' : ''}
            id={i.toString()}
          />
        )}
      </StatusBar>
      <Row className='content'>
        {RenderContent(index)}
      </Row>
    </Layout>
  );
};
