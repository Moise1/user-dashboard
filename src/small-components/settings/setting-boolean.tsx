import { Switch } from 'antd';

interface SettingBooleanProps{
  value: string;
}

export const SettingBoolean = (props: SettingBooleanProps) => {
  const { value } = props;
  
  return <Switch defaultChecked={value == '1' || value.toLowerCase() == 'true'} />;
};