import { Input, Spin } from 'antd';
import { useState } from 'react';

interface SettingNumberProps {
  value: string;
  loading: boolean;
  delayToSave?: number;
  onChange: (value: string) => void;
}

export const SettingNumber = (props: SettingNumberProps) => {
  const { value, delayToSave, onChange, loading } = props;

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

  return <div>
    <Input defaultValue={value} type='number' className='blue-input' onChange={OnChange} disabled={loading} />
    <Spin />
  </div>;
};