import { Input, Spin } from 'antd';
import { useState } from 'react';
import '../../sass/settings.scss';

interface Props {
  defaultValue?: string;
  loading: boolean;
  delayToSave?: number;
  onChange: (value: string) => void;
  disabled?: boolean;

  value?: string;
  onChangeNoDelay?: (value: string) => void;
}

export const SettingNumber = (props: Props) => {
  const { defaultValue, delayToSave, onChange, loading, disabled, value, onChangeNoDelay } = props;

  const [delayTimer, setDelayTimer] = useState<number>(-1);

  const OnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;

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
  return <div className="setting setting-number">
    <Input defaultValue={defaultValue} type='number' className='blue-input' onChange={OnChange} disabled={loading || disabled} value={value} />
    {loading && <Spin />}
  </div>;
};