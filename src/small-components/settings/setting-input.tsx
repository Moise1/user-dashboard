import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { ChannelSetting, ChannelSettingExtra, ChannelSettings, SettingType } from '../../components/chanel/configuration/settings';
import { BusinessPolicy, BusinessPolicyType, eChannelSettings, SavingSetting, SettingsValue, ShippingOption } from '../../redux/channel-configuration/channels-configuration-slice';
import { Channel } from '../../redux/channels/channelsSlice';
import { Template } from '../../redux/templates/templatesSlice';
import '../../sass/settings.scss';
import { t as trans, TransLinksValues, TransPlatformValues } from '../../utils/transShim';
import { SettingBoolean } from './setting-boolean';
import { SettingBooleanNumber } from './setting-boolean-number';
import { SettingBooleanString } from './setting-boolean-string';
import { SettingBooleanStringNull } from './setting-boolean-string-null';
import { SettingButton } from './setting-button';
import { ListData, SettingList } from './setting-list';
import { SettingNumber } from './setting-number';
import { SettingString } from './setting-string';
import { SettingWordList } from './setting-word-list';
import { SettingBooleanTwoOptions } from './settings-boolean-two-options';
import { SettingTwoOptions } from './settings-two-options';

interface SettingDataBagData<T> {
  data: T | undefined;
  loading: boolean;
}

export interface SettingDataBag {
  templates?: SettingDataBagData<Template[]>;
  refreshBussiness?: SettingDataBagData<boolean>;
  shipping ?: SettingDataBagData<ShippingOption[]>;
  business?: SettingDataBagData<BusinessPolicy[]>;
  selectedChannel: Channel | undefined;
}

interface Props {
  setting: ChannelSetting;
  currentSettingValues: Map<eChannelSettings, SettingsValue>;
  savingSetting: Map<eChannelSettings, SavingSetting>;
  onSave: (key: eChannelSettings, value: SettingsValue) => void;
  translationValues: TransPlatformValues | TransLinksValues;
  dataBag: SettingDataBag
  onButtonClick : () => void
}

export const SettingInput = (props: Props) => {
  const { setting, currentSettingValues: configuration, savingSetting, onSave, translationValues, dataBag, onButtonClick} = props;

  const t = (c:string) => trans(c, translationValues);

  const disabled = ((setting: ChannelSetting) => {
    if (!setting.Ancestors)
      return false;

    for (const se of setting?.Ancestors) {
      if (configuration.has(se.Field)) {
        if (configuration.get(se.Field) != se.Value) {
          return true;
        }
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
  })(setting);

  if (disabled && setting.AncestorsHide)
    return <></>;

  const RenderSettingTwoOptions = (labels: string[], values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const value1 = configuration?.get(fields[0]) ?? values[0];
    const value2 = configuration?.get(fields[1]) ?? values[1];
    const check1Value = values[2];
    const check2Value = values[3];
    const label1 = labels[1];
    const label2 = labels[2];
    const savingState1 = savingSetting.get(fields[0]);
    const savingState2 = savingSetting.get(fields[1]);
    return (
      <Col span={8} className='limit-section'>
        <SettingTwoOptions
          value1={value1 ?? ''}
          value2={value2 ?? ''}
          check1Value={check1Value ?? ''}
          check2Value={check2Value ?? ''}
          label1={t(label1)}
          label2={t(label2)}
          onChange1={v => onSave(fields[0], v)}
          onChange2={v => onSave(fields[1], v)}
          disabled={disabled}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
        />
      </Col>
    );
  };

  const RenderSettingSwitchTwoOptions = (labels: string[], values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const value1 = configuration?.get(fields[0]) ?? values[0];
    const value2 = configuration?.get(fields[1]) ?? values[1];
    const check1Value = values[2];
    const defaultNumberValue = values[3];
    const label1 = labels[1];
    const label2 = labels[2];
    const savingState1 = savingSetting.get(fields[0]);
    const savingState2 = savingSetting.get(fields[1]);
    return (
      <Col span={8} className='limit-section'>
        <SettingBooleanTwoOptions
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          defaultNumberValue1={check1Value ?? ''}
          defaultNumberValue2={defaultNumberValue ?? ''}
          label1={t(label1)}
          label2={t(label2)}
          onChange1={v => onSave(fields[0], v)}
          onChange2={v => onSave(fields[1], v)}
          disabled={disabled}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
        />
      </Col>
    );
  };

  const RenderSettingNumber = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState = savingSetting.get(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingNumber
          defaultValue={value ?? ''}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderSettingString = (values: SettingsValue[], fields: eChannelSettings[], extra: ChannelSettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    const savingState = savingSetting.get(fields[0]);
    let value = configuration?.get(fields[0]) ?? values[0];

    if (fields[0] == eChannelSettings.NoApiName) {
      value = dataBag.selectedChannel?.name ?? value;
    }

    return (
      <Col span={8} className='input-container'>
        <SettingString
          defaultValue={value ?? ''}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled} />
      </Col>
    );
  };

  const RenderSettingBoolean = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState = savingSetting.get(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];
    return (
      <Col span={8} className='switch-container'>
        <SettingBoolean
          defaultValue={value ?? '0'}
          onChange={v => onSave(fields[0], v)}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanNumber = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState1 = savingSetting.get(fields[0]);
    const savingState2 = savingSetting.get(fields[1]);
    const defaultValue1 = values[0];
    const defaultValue2 = values[1];
    const value1 = configuration?.get(fields[0]) ?? defaultValue1;
    const value2 = configuration?.get(fields[1]) ?? defaultValue2;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanNumber
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          onChange1={v => onSave(fields[0], v)}
          onChange2={v => onSave(fields[1], v)}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanString = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState1 = savingSetting.get(fields[0]);
    const savingState2 = savingSetting.get(fields[1]);
    const defaultValue1 = values[0];
    const defaultValue2 = values[1];
    const value1 = configuration?.get(fields[0]) ?? defaultValue1;
    const value2 = configuration?.get(fields[1]) ?? defaultValue2;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanString
          defaultValue1={value1 ?? ''}
          defaultValue2={value2 ?? ''}
          onChange1={v => onSave(fields[0], v)}
          onChange2={v => onSave(fields[1], v)}
          loading1={savingState1?.loading ?? false}
          loading2={savingState2?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanStringNull = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState = savingSetting.get(fields[0]);
    const defaultValue = values[0];
    const defaultStringValue = values[1];
    const value = configuration?.get(fields[0]) ?? defaultValue;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanStringNull
          defaultValue={value}
          defaultStringValue={defaultStringValue ?? ''}
          onChange={v => onSave(fields[0], v)}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderSettingList = (values: SettingsValue[], fields: eChannelSettings[], extra: ChannelSettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    const savingState = savingSetting.get(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    const listValues: ListData[] = [];
    for (let i = 1; i < values.length; i += 2) {
      listValues.push({ value: values[i] ?? '', label: t(values[i + 1] ?? '') as string });
    }

    let loadingData = false;

    const AA = (data: SettingDataBagData<({ id: number | string, name: string })[]> | undefined) => {
      loadingData = loadingData || (data?.loading ?? false);
      if (!data?.loading ?? false) {
        const ds = data?.data ?? [];
        if (ds.length > 0) {
          listValues.push(...(ds.map(x => ({ label: x.name, value: x.id?.toString() })) ?? []));
        }
      }
    };

    for (const e of extra ?? []) {
      switch (e) {
      case ChannelSettingExtra.TemplateList:
        AA(dataBag.templates);
        break;
      case ChannelSettingExtra.BusinessPayment:
        AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Payment) });
        break;
      case ChannelSettingExtra.BusinessReturn:
        AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Returns) });
        break;
      case ChannelSettingExtra.BusinessShipping:
        AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Shipping) });
        break;
      case ChannelSettingExtra.PolicyDelivery:
        AA({ loading: dataBag.business?.loading ?? false, data: dataBag.shipping?.data?.map(x => ({ id: x.value, name: x.text })) });
        break;
      }
    }

    return (
      <Col span={8} className='input-container'>
        <SettingList
          defaultValue={value ?? ''}
          listData={listValues}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loadingData={loadingData}
          loading={savingState?.loading ?? false}
          disabled={disabled}
          placeHolder={setting.PlaceHolder}
        />
      </Col>
    );
  };

  const RenderWordList = (values: SettingsValue[], fields: eChannelSettings[], disabled: boolean) => {
    const savingState = savingSetting.get(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingWordList
          defaultValue={value ?? ''}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={savingState?.loading ?? false}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderButton = (values: SettingsValue[], extra: ChannelSettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    let loading = false;
    let label = t(values[0] ?? '');
    for (const e of extra ?? []) {
      switch (e) {
      case ChannelSettingExtra.RefreshPolicies:
        loading = loading || (dataBag.refreshBussiness?.loading ?? false);
        if (dataBag.refreshBussiness?.data ?? false) {
          label = t('Channel.Setting.Option.PoliciesWillUpdate');
          disabled = true;
        }
        break;
      }
    }
    return <SettingButton label={label} loading={loading} disabled={disabled} onClick={onButtonClick} />;
  };

  const values = ((setting: ChannelSetting) => {
    let translate = false;
    for (const e of setting?.Extra ?? []) {
      if (e == ChannelSettingExtra.TranslateDefaultValue) {
        translate = true;
        break;
      }
    }
    if (!translate) {
      return setting.Values;
    }

    const values = [...setting.Values];
    for (let i = 0; i < values.length; i++) {
      values[i] = t(values[i] ?? '') as string;
    }
    return values;
  })(setting);

  let input: JSX.Element;
  switch (setting.Type) {
  default:
  case SettingType.Number:
    input = RenderSettingNumber(values, setting.Fields, disabled);
    break;
  case SettingType.Boolean:
    input = RenderSettingBoolean(values, setting.Fields, disabled);
    break;
  case SettingType.String:
    input = RenderSettingString(values, setting.Fields, setting.Extra, disabled, dataBag);
    break;
  case SettingType.List:
    input = RenderSettingList(values, setting.Fields, setting.Extra, disabled, dataBag);
    break;
  case SettingType.TwoOptions:
    input = RenderSettingTwoOptions(setting.Labels, values, setting.Fields, disabled);
    break;
  case SettingType.SwitchTwoOptions:
    input = RenderSettingSwitchTwoOptions(setting.Labels, values, setting.Fields, disabled);
    break;
  case SettingType.WordList:
    input = RenderWordList(values, setting.Fields, disabled);
    break;
  case SettingType.BooleanNumber:
    input = RenderBooleanNumber(values, setting.Fields, disabled);
    break;
  case SettingType.BooleanString:
    input = RenderBooleanString(values, setting.Fields, disabled);
    break;
  case SettingType.BooleanStringNull:
    input = RenderBooleanStringNull(values, setting.Fields, disabled);
    break;
  case SettingType.Button:
    input = RenderButton(values, setting.Extra!, disabled, dataBag);
  }

  const CapitalizeFirstLetter = (s: string | ReactNode) => {
    if (!s)
      return s;

    if (typeof (s) != 'string')
      return s;

    if (s.startsWith('eBay'))//eBay is an exception
      return s;

    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Row className={'description-and-controls' + (disabled ? ' disabled' : '')} key={setting.Fields[0]}>
      <Col span={12} className='description-area'>
        <h2 className={disabled ? 'disabled' : ''}>{CapitalizeFirstLetter(t(setting.Labels[0]))}</h2>
        {setting.Description.map((x, i) => <p key={i}>{t(x)}</p>)}
      </Col>
      {input}
    </Row>
  );

};
