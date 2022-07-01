import { Input, Spin } from 'antd';
import { useState } from 'react';
import '../../sass/settings/settings.scss';
import { t } from '../../utils/transShim';
import { SettingDefaultCustomWrap } from './setting-default-custom-wrap';

interface Props {
  defaultValue?: string | null;
  loading: boolean;
  delayToSave?: number;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  placeholder?: string;

  value?: string;
  onChangeNoDelay?: (value: string | null) => void;

  superiorValue?: string;
}

export const SettingString = (props: Props) => {
  const { defaultValue, delayToSave, onChange, loading, disabled, value, onChangeNoDelay, placeholder, superiorValue } = props;

  const [delayTimer, setDelayTimer] = useState<number>(-1);

  const OnChangeValue = (newValue: string | null) => {
    if (onChangeNoDelay)
      onChangeNoDelay(newValue);

    clearTimeout(delayTimer);
    setDelayTimer(
      window.setTimeout(
        () => {
          if (newValue != defaultValue) {
            onChange(newValue);
          }
        },
        delayToSave ?? 1000
      )
    );
  };

  const OnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    return OnChangeValue(evt.target.value);
  };
  let input = <div className="setting setting-string">
    <Input defaultValue={defaultValue ?? ''} type='text' className='blue-input' onChange={OnChange} disabled={loading || disabled} value={value ?? superiorValue} placeholder={placeholder} />
    {loading && <Spin />}
  </div>;

  if (superiorValue != null) {
    input = <SettingDefaultCustomWrap
      defautlSelectedValue={superiorValue ?? ''}
      defaultValue={defaultValue}
      onChange={OnChangeValue}
      loading={loading}
      disabled={disabled}
      label1={t('Setting.DefinedBySettings', { value: superiorValue }) as string}
      label2={t('Setting.Custom') as string}
    >
      {input}
    </SettingDefaultCustomWrap>;
  }

  return input;
};