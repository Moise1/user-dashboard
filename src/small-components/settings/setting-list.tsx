import { Spin } from 'antd';
import { useState } from 'react';
import '../../sass/settings.scss';
import { t } from '../../utils/transShim';
import { Selector, SelectorValue } from '../form/selector';

export interface ListData {
  value: string;
  label: string;
}

interface Props {
  defaultValue?: string;
  loading: boolean;//saving
  loadingData: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  listData: ListData[];
  placeHolder?: string;
}

export const SettingList = (props: Props) => {
  const { defaultValue, onChange, loadingData, disabled, listData, loading, placeHolder } = props;

  const [currentValue, setCurrentValue] = useState<string | undefined>(defaultValue);
  const [wasLoadingData, setWasLoadingData] = useState<boolean>(loadingData);

  const OnChange = (value: SelectorValue) => {
    setCurrentValue(value as string);
    onChange(value as string);
  };

  if (wasLoadingData && !loadingData) {
    setWasLoadingData(false);
    setCurrentValue(defaultValue);
  }

  const loadingT = loading || loadingData;

  return <div className="setting setting-list">
    <Selector value={currentValue} disabled={disabled || loadingT} onChange={OnChange} loading={loadingData} size="large" placeHolder={loadingT ? '' : placeHolder ?? t('Select') as string}>{listData}</Selector>
    {loadingT && <Spin/>}
  </div>;
};