import { Spin, Switch } from 'antd';
import '../../sass/settings/settings.scss';

interface Props{
  defaultValue: string;
  onChange: (value: string) => void;
  loading: boolean;
  disabled?: boolean;
  value?: string;
}

export const SettingBoolean = (props: Props) => {
  const { defaultValue, value, onChange, loading, disabled } = props;

  const defautlChecked = defaultValue == '1' || defaultValue.toLowerCase() == 'true';
  const checked = !value ? undefined : value == '1' || value.toLowerCase() == 'true';

  return <div className="setting setting-boolean">
    {!loading && <Switch checked={checked} defaultChecked={defautlChecked} onChange={x => onChange(x ? '1' : '0')} disabled={disabled} />}
    {loading && <Spin />}
  </div>;
};