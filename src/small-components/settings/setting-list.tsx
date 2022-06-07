import '../../sass/settings.scss';
import { Selector } from '../form/selector';

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
    <Selector defaultValue={defaultValue} disabled={disabled} onChange={OnChange} loading={loading} size="large">{listData}</Selector>
  </div>;
};