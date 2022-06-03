import { Spin, Switch } from 'antd';

interface SettingBooleanProps{
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export const SettingBoolean = (props: SettingBooleanProps) => {
  const { value, onChange, loading } = props;

  return <>
    {!loading && <Switch defaultChecked={value == '1' || value.toLowerCase() == 'true'} onChange={x => onChange(x ? '1' : '0')} /> }
    {loading && <Spin />}
  </>;
};