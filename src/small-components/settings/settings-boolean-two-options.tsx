import { Radio, RadioChangeEvent, Spin } from 'antd';
import { ReactNode, useState } from 'react';
import '../../sass/settings/settings.scss';
import { SettingBoolean } from './setting-boolean';
import { SettingNumber } from './setting-number';

interface Props {
  defaultValue1: string;
  defaultValue2: string;
  defaultNumberValue1: string;
  defaultNumberValue2: string;

  label1: string | ReactNode;
  label2: string | ReactNode;

  loading1: boolean;
  loading2: boolean;
  onChange1: (value: string) => void;
  onChange2: (value: string) => void;
  delayToSave?: number;

  disabled?: boolean;
}

export const SettingBooleanTwoOptions = (props: Props) => {
  const { defaultValue1, defaultValue2, defaultNumberValue1, defaultNumberValue2, label1, label2, delayToSave, onChange1, onChange2, loading1, loading2, disabled } = props;
  const [switchCheked, setSwitchChecked] = useState<string>(defaultValue1);
  const [currentValue2, setCurrentValue2] = useState<string>(defaultValue2);

  const OnChangeSwitch = (value: string) => {
    setSwitchChecked(value);
    onChange1(value);
  };

  const OnChangeRadio = (evt: RadioChangeEvent) => {
    const value = evt.target.value;
    onChange2(value);
    setCurrentValue2(value);
  };

  const inValue = (value: string) => {
    setCurrentValue2(value);
  };

  const switchOn = (switchCheked == '1' || switchCheked.toLowerCase() == 'true');
  const radio1Checked = (currentValue2 == defaultNumberValue1);

  return <div className="setting setting-switch-two-options">
    <SettingBoolean loading={loading1} onChange={OnChangeSwitch} defaultValue={defaultValue1} disabled={disabled} />
    <div className='limit-area'>
      <Radio.Group onChange={OnChangeRadio} defaultValue={radio1Checked ? defaultNumberValue1 : defaultNumberValue2}>
        <Radio className='radio' disabled={!switchOn || loading2 || disabled} value={defaultNumberValue1}>{label1}</Radio>
        <div className='limit'>
          <Radio className='radio' disabled={!switchOn || loading2 || disabled} value={defaultNumberValue2}>{label2}</Radio>
          <SettingNumber
            loading={false}
            defaultValue={defaultValue2}
            delayToSave={delayToSave}
            disabled={loading1 || loading2 || disabled || !switchCheked || radio1Checked}
            onChange={onChange2}
            onChangeNoDelay={inValue}
            value={radio1Checked ? defaultNumberValue2 : currentValue2}
          />
        </div>
      </Radio.Group>
      {loading2 && <Spin/>}
    </div>
  </div>;

};

