import { useState } from 'react';
import '../../sass/settings/settings.scss';
import { SettingList } from './setting-list';

interface Props {
  defaultValue?: string | null;
  defautlSelectedValue: string;
  onChange: (value: string | null) => void;
  loading: boolean;
  disabled?: boolean;

  delayToSave?: number;
  label1: string;
  label2: string;

  children: JSX.Element;
}

export const SettingDefaultCustomWrap = (props: Props) => {
  const { defaultValue, defautlSelectedValue, onChange, loading, disabled, delayToSave, label1, label2, children } = props;

  const [currentValue, setCurrentValue] = useState<string | null | undefined>(defaultValue);

  const [delayBooleanTimer, setBooleanDelayTimer] = useState<number>(-1);


  const OnChange = (newValue: string | null) => {
    setCurrentValue(newValue);

    clearTimeout(delayBooleanTimer);
    setBooleanDelayTimer(
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

  const OnChangeBool = (v: string | null) => {
    OnChange(v == '0' ? null : defautlSelectedValue);
  };


  const switchOn = currentValue != null;

  return <div className="setting setting-list-number-null">
    <SettingList
      listData={[{ label: label1, value: '0' }, { label: label2, value: '1' }]}
      defaultValue={switchOn ? '1' : '0'}
      loading={loading}
      onChange={OnChangeBool}
      disabled={disabled}
      loadingData={false}
    />
    {switchOn && children}
  </div>;
};