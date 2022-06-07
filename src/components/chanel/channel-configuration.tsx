import { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import '../../sass/channel-settings.scss';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getChannelConfiguration, saveChannelSetting } from '../../redux/channel-configuration/channels-configuration-thunk';
import { ChannelConfigurationState, eChannelSettings } from '../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSetting, ChannelSettingExtra, ChannelSettings, SettingType } from './configuration/settings';
import { SettingBoolean } from '../../small-components/settings/setting-boolean';
import { SettingNumber } from '../../small-components/settings/setting-number';
import { ChannelSettingsSections, ChannelSettingSection } from './configuration/sections';
import { ChannelsState } from '../../redux/channels/channelsSlice';
import { SettingTwoOptions } from '../../small-components/settings/settings-two-options';
import { SettingBooleanTwoOptions } from '../../small-components/settings/settings-boolean-two-options';
import { SettingString } from '../../small-components/settings/setting-string';
import { SettingList } from '../../small-components/settings/setting-list';
import { SettingWordList } from '../../small-components/settings/setting-word-list';
import { SettingBooleanNumber } from '../../small-components/settings/setting-boolean-number';
import { SettingBooleanString } from '../../small-components/settings/setting-boolean-string';
import { SettingBooleanStringNull } from '../../small-components/settings/setting-boolean-string-null';
import { SettingButton } from '../../small-components/settings/setting-button';
import { AppContext } from '../../contexts/AppContext';

export const ChannelConfiguration = () => {
  const [index, setIndex] = useState<ChannelSettingSection>(ChannelSettingSection.Monitoring);
  const [activeTab, setActiveTab] = useState<number>(0);

  const selectedChannel = (()=>{
    const { channels } = useAppSelector((state) => state.channels as ChannelsState);
    const { channelId: selectedChannelId  } = useContext(AppContext);
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
            if (cs.Fields[i] == se.Field && cs.Values[i] != se.Value) {//Field[n] and DefaultValues[n] should be related
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  const SaveSetting = async (key: eChannelSettings, value: string | null) => {
    const rp = await dispatch(saveChannelSetting({ key: key, value: value }));
    if (!rp.payload) {
      dispatch(getChannelConfiguration());
    }
  };

  const configuration = new Map(settings?.map(x => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map(x => [x.data.key, x]));

  const RenderSettingTwoOptions = (setting: ChannelSetting, disabled: boolean) => {
    const value1 = configuration?.get(setting.Fields[0]) ?? setting.Values[0];
    const value2 = configuration?.get(setting.Fields[1]) ?? setting.Values[1];
    const check1Value = setting.Values[2];
    const check2Value = setting.Values[3];
    const label1 = setting.Labels[1];
    const label2 = setting.Labels[2];
    const savingState1 = savingSetting.get(setting.Fields[0]);
    const savingState2 = savingSetting.get(setting.Fields[1]);
    return (
      <Col span={8} className='limit-section'>
        <SettingTwoOptions
          value1={value1 ?? ''}
          value2={value2 ?? ''}
          check1Value={check1Value ?? ''}
          check2Value={check2Value ?? ''}
          label1={t(label1)}
          label2={t(label2)}
          onChange1={v => SaveSetting(setting.Fields[0], v)}
          onChange2={v => SaveSetting(setting.Fields[1], v)}
          disabled={disabled}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
        />
      </Col>
    );
  };

  const RenderSettingSwitchTwoOptions = (setting: ChannelSetting, disabled: boolean) => {
    const value1 = configuration?.get(setting.Fields[0]) ?? setting.Values[0];
    const value2 = configuration?.get(setting.Fields[1]) ?? setting.Values[1];
    const check1Value = setting.Values[2];
    const defaultNumberValue = setting.Values[3];
    const label1 = setting.Labels[1];
    const label2 = setting.Labels[2];
    const savingState1 = savingSetting.get(setting.Fields[0]);
    const savingState2 = savingSetting.get(setting.Fields[1]);
    return (
      <Col span={8} className='limit-section'>
        <SettingBooleanTwoOptions
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          defaultNumberValue1={check1Value ?? ''}
          defaultNumberValue2={defaultNumberValue ?? ''}
          label1={t(label1)}
          label2={t(label2)}
          onChange1={v => SaveSetting(setting.Fields[0], v)}
          onChange2={v => SaveSetting(setting.Fields[1], v)}
          disabled={disabled}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
        />
      </Col>
    );
  };

  const RenderSettingNumber = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.Values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingNumber
          defaultValue={value ?? ''}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          key={setting.Fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderSettingString = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.Values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingString
          defaultValue={value ?? ''}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          key={setting.Fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled} />
      </Col>
    );
  };

  const RenderSettingBoolean = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.Values[0];
    return (
      <Col span={8} className='switch-container'>
        <SettingBoolean
          defaultValue={value ?? '0'}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanNumber = (setting: ChannelSetting, disabled: boolean) => {
    const savingState1 = savingSetting.get(setting.Fields[0]);
    const savingState2 = savingSetting.get(setting.Fields[1]);
    const defaultValue1 = setting.Values[0];
    const defaultValue2 = setting.Values[1];
    const value1 = configuration?.get(setting.Fields[0]) ?? defaultValue1;
    const value2 = configuration?.get(setting.Fields[1]) ?? defaultValue2;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanNumber
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          onChange1={v => SaveSetting(setting.Fields[0], v)}
          onChange2={v => SaveSetting(setting.Fields[1], v)}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanString = (setting: ChannelSetting, disabled: boolean) => {
    const savingState1 = savingSetting.get(setting.Fields[0]);
    const savingState2 = savingSetting.get(setting.Fields[1]);
    const defaultValue1 = setting.Values[0];
    const defaultValue2 = setting.Values[1];
    const value1 = configuration?.get(setting.Fields[0]) ?? defaultValue1;
    const value2 = configuration?.get(setting.Fields[1]) ?? defaultValue2;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanString
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          onChange1={v => SaveSetting(setting.Fields[0], v)}
          onChange2={v => SaveSetting(setting.Fields[1], v)}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanStringNull = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const defaultValue = setting.Values[0];
    const defaultStringValue = setting.Values[1];
    const value = configuration?.get(setting.Fields[0]) ?? defaultValue;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanStringNull
          defaultValue={value}
          defaultStringValue={defaultStringValue ?? ''}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderSettingList = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.Values[0];

    const listValues: {value: string, label: string}[] = [];
    for (let i = 1; i < setting.Values.length; i += 2) {
      listValues.push({ value: setting.Values[i] ?? '', label: t(setting.Values[i + 1] ?? '') as string });
    }

    return (
      <Col span={8} className='input-container'>
        <SettingList
          defaultValue={value ?? ''}
          listData={listValues}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          key={setting.Fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderWordList = (setting: ChannelSetting, disabled: boolean) => {
    const savingState = savingSetting.get(setting.Fields[0]);
    const value = configuration?.get(setting.Fields[0]) ?? setting.Values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingWordList
          defaultValue={value ?? ''}
          onChange={v => SaveSetting(setting.Fields[0], v)}
          key={setting.Fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderButton = (setting: ChannelSetting, disabled: boolean) => {
    switch (setting.Extra![0]) {
    case ChannelSettingExtra.RefreshPolicies:
      break;
    }

    return <SettingButton label={t(setting.Values[0] ?? '') as string} loading={false} disabled={disabled} onClick={() => { return null;}} />;
  };

  const RenderSetting = (setting: ChannelSetting) => {
    const disabled = DisabledAncestors(setting);
    if (disabled && setting.AncestorsHide)
      return <></>;

    let input: JSX.Element;
    switch (setting.Type) {
    default:
    case SettingType.Number:
      input = RenderSettingNumber(setting, disabled);
      break;
    case SettingType.Boolean:
      input = RenderSettingBoolean(setting, disabled);
      break;
    case SettingType.String:
      input = RenderSettingString(setting, disabled);
      break;
    case SettingType.List:
      input = RenderSettingList(setting, disabled);
      break;
    case SettingType.TwoOptions:
      input = RenderSettingTwoOptions(setting, disabled);
      break;
    case SettingType.SwitchTwoOptions:
      input = RenderSettingSwitchTwoOptions(setting, disabled);
      break;
    case SettingType.WordList:
      input = RenderWordList(setting, disabled);
      break;
    case SettingType.BooleanNumber:
      input = RenderBooleanNumber(setting, disabled);
      break;
    case SettingType.BooleanString:
      input = RenderBooleanString(setting, disabled);
      break;
    case SettingType.BooleanStringNull:
      input = RenderBooleanStringNull(setting, disabled);
      break;
    case SettingType.Button:
      input = RenderButton(setting, disabled);
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
    const settings = ChannelSettings.filter(
      x => x.Section == section
      && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
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

  const loading = settingsLoading || !settings;

  return (
    <Layout className='channel-settings'>
      <StatusBar>
        <>
          {!loading && <>
            {
              ChannelSettingsSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0)).map((x, i) =>
                <StatusBtn
                  key={i}
                  title={t(x.Label) as string}
                  changeTab={(e) => handleChangeTab(e, x.Type)}
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
        {!loading && RenderContent(index)}
      </Row>
    </Layout>
  );
};
