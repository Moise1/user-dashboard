import { Input } from 'antd';
import { useState } from 'react';

interface SettingNumberProps {
  value: string;
  delayToSave?: number;
  onChange: (value: string) => void;
}

export const SettingNumber = (props: SettingNumberProps) => {
  const { value, delayToSave, onChange } = props;

  const [delayTimer, setDelayTimer] = useState<number>(-1);

  const OnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {

    clearTimeout(delayTimer);
    setDelayTimer(
      window.setTimeout(
        () => {
          if (evt.target.value != value) {
            onChange(evt.target.value);
          }
        },
        delayToSave ?? 1000
      )
    );

  };

  return <Input defaultValue={value} type='number' className='blue-input' onChange={OnChange} />;
};