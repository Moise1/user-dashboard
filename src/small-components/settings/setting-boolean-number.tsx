import { useState } from 'react';
import '../../sass/settings/settings.scss';
import { SettingBoolean } from './setting-boolean';
import { SettingNumber } from './setting-number';

interface Props{
  defaultValue1: string | null;
  defaultValue2: string | null;
  onChange1: (value: string | null) => void;
  onChange2: (value: string | null) => void;
  loading1: boolean;
  loading2: boolean;
  disabled?: boolean;
}

export const SettingBooleanNumber = (props: Props) => {
  const { defaultValue1, defaultValue2, onChange1, onChange2, loading1, loading2, disabled } = props;

  const [currentValue1, setCurrentValue1] = useState<string | null>(defaultValue1);
  const booleanEnabled = currentValue1 == '1' || currentValue1?.toLowerCase() == 'True';

  const OnChangeBool = (v: string | null) => {
    onChange1(v);
    setCurrentValue1(v);
  };

  return <div className="setting setting-boolean-number">
    <SettingBoolean defaultValue={defaultValue1} loading={loading1} onChange={OnChangeBool} disabled={disabled} />
    <SettingNumber defaultValue={defaultValue2} loading={loading2} onChange={onChange2} disabled={disabled || !booleanEnabled} />
  </div>;
};