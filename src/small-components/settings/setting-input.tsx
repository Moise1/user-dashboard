import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { SettingExtra, SettingInfo, SettingKey, SettingType, SettingValue } from '../../types/settings';
import { BusinessPolicy, BusinessPolicyType, ShippingOption } from '../../redux/channel-configuration/channels-configuration-slice';
import { Channel } from '../../redux/channels/channelsSlice';
import { Template } from '../../redux/templates/templatesSlice';
import '../../sass/settings/settings.scss';
import { t as trans, TransLinksValues, TransPlatformValues, TransValueTypeValue } from '../../utils/transShim';
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
import { SettingBooleanNumberNull } from './setting-boolean-number-null';

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
  setting: SettingInfo;
  currentSettingValues: Map<SettingKey, SettingValue>;
  settingsBeingSaved: Set<SettingKey>;
  onSave: (key: SettingKey, value: SettingValue) => void;
  translationValues: TransPlatformValues | TransLinksValues;
  dataBag: SettingDataBag;
  onButtonClick: () => void;
  superiorData: Map<number, SettingValue>;
  superiorRelation?: Map<SettingKey, SettingKey>;
}

export const SettingInput = (props: Props) => {
  const { setting, currentSettingValues: configuration, settingsBeingSaved, onSave, translationValues, dataBag, onButtonClick, superiorData, superiorRelation} = props;

  const t = (c: string, values?: Record<string, TransValueTypeValue>) => trans(c, {...translationValues, ...values});

  const TranslateV = (v: string | null) => {
    if (!v?.startsWith('_t:'))
      return v;
    const s = v.substr(3);
    const g = t(s) as string;
    if (g === s)
      return v;
    return g;
  };

  const disabled = ((setting: SettingInfo) => {
    if (!setting.Ancestors)
      return false;

    for (const se of setting?.Ancestors) {
      if (se.Field != null) {
        if (configuration.has(se.Field)) {
          if (configuration.get(se.Field) != se.Value) {
            return true;
          }
        }
      } else {//If Field is null/undefined Superior must have a value
        if (configuration.has(se?.Superior ?? 0)) {
          if (configuration.get(se?.Superior ?? 0) != se.Value) {
            return true;
          }
        }
      }
    }

    return false;
  })(setting);

  if (disabled && setting.AncestorsHide)
    return <></>;

  const GetSuperiorValue = (superior?: SettingKey) => {
    return superiorData.get(superior ?? -1);
  };
  const GetSuperiorLabel = (superiorValue: SettingValue | undefined) => {
    if (superiorValue != null) {
      return t('Setting.DefinedBySettings', { 'value': superiorValue }) as SettingValue;
    }
    return undefined;
  };

  const RenderNumber = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isBeingSaved = settingsBeingSaved.has(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    const superior = superiorRelation ? superiorRelation.get(fields[0]) : undefined;
    const sValue = GetSuperiorValue(superior);

    return (
      <Col span={8} className='input-container'>
        <SettingNumber
          defaultValue={value}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={isBeingSaved}
          disabled={disabled}

          superiorValue={sValue as string | undefined}
        />
      </Col>
    );
  };

  const RenderString = (values: SettingValue[], fields: SettingKey[], extra: SettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    const isBeingSaved = settingsBeingSaved.has(fields[0]);
    let value = configuration?.get(fields[0]) ?? values[0];

    if (extra?.find(x => x == SettingExtra.NoApiName) ?? false) {
      value = dataBag.selectedChannel?.name ?? value;
    }

    const superior = superiorRelation ? superiorRelation.get(fields[0]) : undefined;
    const sValue = GetSuperiorValue(superior);

    return (
      <Col span={8} className='input-container'>
        <SettingString
          defaultValue={value}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={isBeingSaved}
          disabled={disabled}

          superiorValue={sValue as string | undefined}
        />
      </Col>
    );
  };

  const RenderList = (values: SettingValue[], fields: SettingKey[], extra: SettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    const isSaving = settingsBeingSaved.has(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    const superior = superiorRelation ? superiorRelation.get(fields[0]) : undefined;
    let placeHolderV = GetSuperiorValue(superior);


    let loadingData = false;

    const AA = (data: SettingDataBagData<({ id: number | string, name: string })[]> | undefined) => {
      loadingData = loadingData || (data?.loading ?? false);
      const retV: SettingValue[] = [...values];
      if (!data?.loading ?? false) {
        const ds = data?.data ?? [];
        if (ds.length > 0) {
          const vs = ds.map(x => [x.id?.toString() , x.name]);
          for (const g of vs) {
            for (const g2 of g) {
              retV.push(g2);
            }
          }
        }
      }
      return retV;
    };

    //Business Settings, Templates, etc.
    for (const e of extra ?? []) {
      switch (e) {
        case SettingExtra.TemplateList:
          values = AA(dataBag.templates);
          break;
        case SettingExtra.BusinessPayment:
          values = AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Payment) });
          break;
        case SettingExtra.BusinessReturn:
          values = AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Returns) });
          break;
        case SettingExtra.BusinessShipping:
          values = AA({ loading: dataBag.business?.loading ?? false, data: dataBag.business?.data?.filter(x => x.policyType == BusinessPolicyType.Shipping) });
          break;
        case SettingExtra.PolicyDelivery:
          values = AA({ loading: dataBag.business?.loading ?? false, data: dataBag.shipping?.data?.map(x => ({ id: x.value, name: x.text })) });
          break;
      }
    }

    //Source Settings (Defined by settings ())
    const listValues: ListData[] = [];
    if (placeHolderV != null) {
      let found = false;
      for (let i = 1; i < values.length; i += 2) {
        found = placeHolderV == values[i];
        if (found) {
          placeHolderV = TranslateV(values[i + 1]);
          break;
        }
      }
      let placeHolder:string;
      if (found) {
        placeHolder = GetSuperiorLabel(placeHolderV) as string;
      } else {
        placeHolder = t('Setting.DefinedBySettingsEmpty') as string;
      }
      listValues.push({ value:null, label: placeHolder });
    }
    //List Values
    for (let i = 1; i < values.length; i += 2) {
      listValues.push({ value: values[i], label: TranslateV(values[i + 1]) as string });
    }

    return (
      <Col span={8} className='input-container'>
        <SettingList
          defaultValue={value ?? ''}
          listData={listValues}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loadingData={loadingData}
          loading={isSaving}
          disabled={disabled}
          placeHolder={setting.PlaceHolder}
        />
      </Col>
    );
  };

  const RenderBoolean = (values: SettingValue[], fields: SettingKey[], extra: SettingExtra[] | undefined, disabled: boolean) => {
    const isBeingSaved = settingsBeingSaved.has(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    const superior = superiorRelation ? superiorRelation.get(fields[0]) : undefined;
    if (superior != null) {
      return RenderList(
        [
          values[0],
          '0',
          '_t:Setting.No',
          '1',
          '_t:Setting.Yes'
        ],
        fields,
        extra,
        disabled,
        dataBag);
    }

    return (
      <Col span={8} className='switch-container'>
        <SettingBoolean
          defaultValue={value ?? '0'}
          onChange={v => onSave(fields[0], v)}
          loading={isBeingSaved}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderTwoOptions = (labels: string[], values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const value1 = configuration?.get(fields[0]) ?? values[0];
    const value2 = configuration?.get(fields[1]) ?? values[1];
    const check1Value = values[2];
    const check2Value = values[3];
    const label1 = labels[1];
    const label2 = labels[2];
    const is1Saving = settingsBeingSaved.has(fields[0]);
    const is2Saving = settingsBeingSaved.has(fields[1]);
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
          loading1={is1Saving}
          loading2={is2Saving}
        />
      </Col>
    );
  };

  const RenderSwitchTwoOptions = (labels: string[], values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const value1 = configuration?.get(fields[0]) ?? values[0];
    const value2 = configuration?.get(fields[1]) ?? values[1];
    const check1Value = values[2];
    const defaultNumberValue = values[3];
    const label1 = labels[1];
    const label2 = labels[2];
    const is1Saving = settingsBeingSaved.has(fields[0]);
    const is2Saving = settingsBeingSaved.has(fields[1]);

    const superior1 = superiorRelation ? superiorRelation.get(fields[0]) : undefined;
    const superior2 = superiorRelation ? superiorRelation.get(fields[1]) : undefined;
    const sValue1 = GetSuperiorValue(superior1);
    const sValue2 = GetSuperiorValue(superior2);

    return (
      <Col span={8} className='limit-section'>
        <SettingBooleanTwoOptions
          defaultValue1={value1}
          defaultValue2={value2}
          defaultNumberValue1={check1Value ?? ''}
          defaultNumberValue2={defaultNumberValue ?? ''}
          label1={t(label1)}
          label2={t(label2)}
          onChange1={v => onSave(fields[0], v)}
          onChange2={v => onSave(fields[1], v)}
          disabled={disabled}
          loading1={is1Saving}
          loading2={is2Saving}
          superiorValue1={sValue1 as string | undefined}
          superiorValue2={sValue2 as string | undefined}
        />
      </Col>
    );
  };

  const RenderBooleanNumber = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isBeingSaved1 = settingsBeingSaved.has(fields[0]);
    const isBeingSaved2 = settingsBeingSaved.has(fields[1]);
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
          loading1={isBeingSaved1}
          loading2={isBeingSaved2}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanString = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isBeingSaved1 = settingsBeingSaved.has(fields[0]);
    const isBeingSaved2 = settingsBeingSaved.has(fields[1]);
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
          loading1={isBeingSaved1}
          loading2={isBeingSaved2}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanNumberNull = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isBeingSaved = settingsBeingSaved.has(fields[0]);
    const defaultValue = values[0];
    const defaultNumberValue = values[1];
    const value = configuration?.get(fields[0]) ?? defaultValue;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanNumberNull
          defaultValue={value}
          defaultNumberValue={defaultNumberValue ?? ''}
          onChange={v => onSave(fields[0], v)}
          loading={isBeingSaved}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderBooleanStringNull = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isBeingSaved = settingsBeingSaved.has(fields[0]);
    const defaultValue = values[0];
    const defaultStringValue = values[1];
    const value = configuration?.get(fields[0]) ?? defaultValue;
    return (
      <Col span={8} className='switch-container'>
        <SettingBooleanStringNull
          defaultValue={value}
          defaultStringValue={defaultStringValue ?? ''}
          onChange={v => onSave(fields[0], v)}
          loading={isBeingSaved}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderWordList = (values: SettingValue[], fields: SettingKey[], disabled: boolean) => {
    const isSaving = settingsBeingSaved.has(fields[0]);
    const value = configuration?.get(fields[0]) ?? values[0];

    return (
      <Col span={8} className='input-container'>
        <SettingWordList
          defaultValue={value ?? ''}
          onChange={v => onSave(fields[0], v)}
          key={fields[0]}
          loading={isSaving}
          disabled={disabled}
        />
      </Col>
    );
  };

  const RenderButton = (values: SettingValue[], extra: SettingExtra[] | undefined, disabled: boolean, dataBag: SettingDataBag) => {
    let loading = false;
    let label = t(values[0] ?? '');
    for (const e of extra ?? []) {
      switch (e) {
        case SettingExtra.RefreshPolicies:
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

  const values = ((setting: SettingInfo) => {
    const values = [...setting.Values];
    for (let i = 0; i < values.length; i++) {
      values[i] = TranslateV(values[i]);
    }
    return values;
  })(setting);

  let input: JSX.Element;
  switch (setting.Type) {
    default:
    case SettingType.Number:
      input = RenderNumber(values, setting.Fields, disabled);
      break;
    case SettingType.Boolean:
      input = RenderBoolean(values, setting.Fields, setting.Extra, disabled);
      break;
    case SettingType.String:
      input = RenderString(values, setting.Fields, setting.Extra, disabled, dataBag);
      break;
    case SettingType.List:
      input = RenderList(values, setting.Fields, setting.Extra, disabled, dataBag);
      break;
    case SettingType.TwoOptions:
      input = RenderTwoOptions(setting.Labels, values, setting.Fields, disabled);
      break;
    case SettingType.SwitchTwoOptions:
      input = RenderSwitchTwoOptions(setting.Labels, values, setting.Fields, disabled);
      break;
    case SettingType.WordList:
      input = RenderWordList(values, setting.Fields, disabled);
      break;
    case SettingType.BooleanNumber:
      input = RenderBooleanNumber(values, setting.Fields, disabled);
      break;
    case SettingType.BooleanNumberNull:
      input = RenderBooleanNumberNull(values, setting.Fields, disabled);
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
