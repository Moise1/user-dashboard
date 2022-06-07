import '../../sass/settings.scss';
import { SelectorPlain } from '../form/selector-plain';

interface ListData {
  value: string;
  label: string;
}

interface Props {
  defaultValue?: string;
  loading: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  listData: ListData[]
}

export const SettingList = (props: Props) => {
  const { defaultValue, onChange, loading, disabled, listData} = props;

  const OnChange = (value: React.Key) => onChange(value as string);

  return <div className="setting setting-list">
    <SelectorPlain defaultValue={defaultValue} disabled={disabled} onChange={OnChange} loading={loading} size="large">{listData}</SelectorPlain>
  </div>;
};