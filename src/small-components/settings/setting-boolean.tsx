import { Spin, Switch } from 'antd';
import '../../sass/settings.scss';

interface SettingBooleanProps{
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export const SettingBoolean = (props: SettingBooleanProps) => {
  const { value, onChange, loading } = props;

  return <div className="setting setting-boolean">
    {!loading && <Switch defaultChecked={value == '1' || value.toLowerCase() == 'true'} onChange={x => onChange(x ? '1' : '0')} /> }
    {loading && <Spin />}
  </div>;
};