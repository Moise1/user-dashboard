import '../../sass/settings.scss';
import { Selector } from '../form/selector';

interface ListData {
  key: string;
  value: string;
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

  return <div className="setting setting-list">
    <Selector defaultValue={defaultValue} disabled={disabled} onChange={onChange} loading={loading} size="large">{listData}</Selector>
  </div>;
};