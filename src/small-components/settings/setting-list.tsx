import { Spin } from 'antd';
import { useState } from 'react';
import '../../sass/settings/settings.scss';
import { t } from '../../utils/transShim';
import { Selector, SelectorValue } from '../form/selector';

export interface ListData {
  value: string | null;
  label: string;
}

interface Props {
  defaultValue?: string | null;
  loading: boolean;//saving
  loadingData: boolean;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  listData: ListData[];
  placeHolder?: string;
}

export const SettingList = (props: Props) => {
  const { defaultValue, onChange, loadingData, disabled, listData, loading, placeHolder } = props;

  const [currentValue, setCurrentValue] = useState<string | null | undefined>(defaultValue);
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
    <Selector
      value={currentValue}
      disabled={disabled || loadingT || loadingData}
      onChange={OnChange}
      loading={loadingData}
      size="large"
      placeHolder={loadingT ? '' : placeHolder ?? t('Select') as string}
      key={loadingData.toString()}
    >
      {listData}
    </Selector>
    {(loadingT || loadingData) && <Spin/>}
  </div>;
};