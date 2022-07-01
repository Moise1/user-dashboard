import { Radio, RadioChangeEvent, Spin } from 'antd';
import { ReactNode, useState } from 'react';
import '../../sass/settings/settings.scss';
import { SettingNumber } from './setting-number';

interface Props {
  value1: string | null;
  value2: string | null;
  check1Value: string;
  check2Value: string;

  label1: string | ReactNode;
  label2: string | ReactNode;

  loading1: boolean;
  loading2: boolean;
  onChange1: (value: string | null) => void;
  onChange2: (value: string | null) => void;
  delayToSave?: number;

  disabled?: boolean;
}

export const SettingTwoOptions = (props: Props) => {
  const { value1, value2, check1Value, check2Value, label1, label2, delayToSave, onChange1, onChange2, loading1, loading2, disabled } = props;
  const [currentValue1, setCurrentValue1] = useState<string | null>(value1);

  const OnChange1 = (evt: RadioChangeEvent) => {
    setCurrentValue1(evt.target.value);
    onChange1(evt.target.value);
  };

  return <div className="setting setting-two-options-two">
    <div className='limit-area'>
      <Radio.Group defaultValue={value1} onChange={OnChange1} disabled={disabled || loading1}>
        <Radio className='radio' value={check1Value}>{label1}</Radio>
        <div className='limit'>
          <Radio className='radio' value={check2Value}>{label2}</Radio>
          <SettingNumber loading={loading2} defaultValue={value2} delayToSave={delayToSave} disabled={loading1 || disabled || currentValue1 != check2Value} onChange={onChange2} />
        </div>
      </Radio.Group>
    </div>
    {loading1 && <Spin />}
  </div>;
};