import { Input, Spin } from 'antd';
import { useState } from 'react';
import '../../sass/settings.scss';

interface SettingNumberProps {
  value: string;
  loading: boolean;
  delayToSave?: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SettingNumber = (props: SettingNumberProps) => {
  const { value, delayToSave, onChange, loading, disabled } = props;

  const [delayTimer, setDelayTimer] = useState<number>(-1);

  const OnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    clearTimeout(delayTimer);
    setDelayTimer(
      window.setTimeout(
        () => {
          if (newValue != value) {
            onChange(newValue);
          }
        },
        delayToSave ?? 1000
      )
    );
  };

  return <div className="setting setting-number">
    <Input defaultValue={value} type='number' className='blue-input' onChange={OnChange} disabled={loading || disabled} />
    {loading && <Spin />}
  </div>;
};