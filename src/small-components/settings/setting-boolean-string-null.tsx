import { useState } from 'react';
import '../../sass/settings.scss';
import { SettingBoolean } from './setting-boolean';
import { SettingString } from './setting-string';

interface Props{
  defaultValue: string | null;
  defaultStringValue: string;
  onChange: (value: string | null) => void;
  loading: boolean;
  disabled?: boolean;

  delayToSave?: number;
}

export const SettingBooleanStringNull = (props: Props) => {
  const { defaultValue, defaultStringValue, onChange, loading, disabled, delayToSave } = props;

  const [currentValue, setCurrentValue] = useState<string | null>(defaultValue);

  const [delayBooleanTimer, setBooleanDelayTimer] = useState<number>(-1);


  const OnChange = (newValue: string | null) => {
    setCurrentValue(newValue);

    clearTimeout(delayBooleanTimer);
    setBooleanDelayTimer(
      window.setTimeout(
        () => {
          if (newValue != defaultValue && newValue != defaultStringValue) {
            onChange(newValue);
          }
        },
        delayToSave ?? 1000
      )
    );
  };

  const OnChangeBool = (v: string) => {
    OnChange(v == '0' ? null : defaultStringValue);
  };


  const switchOn = currentValue != null;

  return <div className="setting setting-boolean-number-null">
    <SettingBoolean
      defaultValue={currentValue == null ? '0' : '1'}
      loading={loading}
      onChange={OnChangeBool}
      disabled={disabled}
    />
    <SettingString
      value={currentValue ?? defaultStringValue}
      loading={loading}
      onChange={_ => null}
      onChangeNoDelay={OnChange}
      disabled={disabled || !switchOn}
      delayToSave={delayToSave}
    />
  </div>;
};