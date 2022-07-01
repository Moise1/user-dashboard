import { Radio, RadioChangeEvent, Spin } from 'antd';
import { ReactNode, useState } from 'react';
import '../../sass/settings/settings.scss';
import { t } from '../../utils/transShim';
import { SettingBoolean } from './setting-boolean';
import { SettingDefaultCustomWrap } from './setting-default-custom-wrap';
import { SettingList } from './setting-list';
import { SettingNumber } from './setting-number';

interface Props {
  defaultValue1: string | null;
  defaultValue2: string | null;
  defaultNumberValue1: string;
  defaultNumberValue2: string;

  label1: string | ReactNode;
  label2: string | ReactNode;

  loading1: boolean;
  loading2: boolean;
  onChange1: (value: string | null) => void;
  onChange2: (value: string | null) => void;
  delayToSave?: number;

  disabled?: boolean;

  superiorValue1?: string | null;
  superiorValue2?: string | null;
}

export const SettingBooleanTwoOptions = (props: Props) => {
  const { defaultValue1, defaultValue2, defaultNumberValue1, defaultNumberValue2, label1, label2, delayToSave, onChange1, onChange2, loading1, loading2, disabled, superiorValue1, superiorValue2} = props;
  const [switchCheked, setSwitchChecked] = useState<string | null>(defaultValue1);
  const [currentValue2, setCurrentValue2] = useState<string | null>(defaultValue2);

  const OnChangeSwitch = (value: string | null) => {
    setSwitchChecked(value);
    onChange1?.(value);
  };

  const OnChangeRadioValue = (value: string | null) => {
    setCurrentValue2(value);
    onChange2?.(value);
  };
  const OnChangeRadio = (evt: RadioChangeEvent) => OnChangeRadioValue(evt.target.value);

  const inValue = (value: string | null) => {
    setCurrentValue2(value);
  };

  let booleanInput: JSX.Element;
  if (superiorValue1 == null) {
    booleanInput = <SettingBoolean loading={loading1} onChange={OnChangeSwitch} defaultValue={defaultValue1 ?? superiorValue1 ?? '0'} disabled={disabled} />;
  } else {
    booleanInput = <SettingList
      defaultValue={defaultValue1}
      disabled={disabled}
      loading={loading1}
      loadingData={false}
      onChange={OnChangeSwitch}
      listData={
        [
          { label: t('Setting.DefinedBySettings', { value: superiorValue1 == '1' ? t('Setting.Yes') : t('Setting.No') }) as string, value: null },
          { label: t('Setting.Yes') as string, value: '1' },
          { label: t('Setting.No') as string, value: '2' }
        ]
      }
    />;
  }

  const switchOn = (switchCheked != null && (switchCheked == '1' || switchCheked.toLowerCase() == 'true')) || (switchCheked == null && (superiorValue1 == '1' || superiorValue1?.toLowerCase() == 'true'));
  const radio1Checked = (currentValue2 == defaultNumberValue1);
  let cInput = <div className='limit-area'>
    <Radio.Group onChange={OnChangeRadio} defaultValue={radio1Checked ? defaultNumberValue1 : defaultNumberValue2}>
      <Radio className='radio' disabled={!switchOn || loading2 || disabled} value={defaultNumberValue1}>{label1}</Radio>
      <div className='limit'>
        <Radio className='radio' disabled={!switchOn || loading2 || disabled} value={defaultNumberValue2}>{label2}</Radio>
        <SettingNumber
          loading={false}
          defaultValue={defaultValue2 ?? superiorValue2 ?? ''}
          delayToSave={delayToSave}
          disabled={loading1 || loading2 || disabled || !switchOn || radio1Checked}
          onChange={onChange2}
          onChangeNoDelay={inValue}
          value={(radio1Checked ? defaultNumberValue2 : currentValue2) ?? superiorValue2 ?? ''}
        />
      </div>
    </Radio.Group>
    {loading2 && <Spin />}
  </div>;

  if (superiorValue2 != null) {
    cInput = <SettingDefaultCustomWrap
      defautlSelectedValue={superiorValue2}
      defaultValue={defaultValue2}
      onChange={OnChangeRadioValue}
      loading={loading2}
      disabled={disabled}
      label1={t('Setting.DefinedBySettings', { value: (superiorValue2 == defaultNumberValue1 ? label1 : label2 + ': ' + superiorValue2) }) as string}
      label2={t('Setting.Custom') as string}
    >
      {cInput}
    </SettingDefaultCustomWrap>;
  }

  return <div className="setting setting-switch-two-options">
    {booleanInput}
    {cInput}
  </div>;
};

