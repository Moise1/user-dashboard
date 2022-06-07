import { Button, Spin } from 'antd';
import '../../sass/settings.scss';

interface Props {
  label: string;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const SettingButton = (props: Props) => {
  const { label, onClick, loading, disabled } = props;

  return <div className="setting setting-button">
    <Button className='warning-btn' onClick={onClick} disabled={disabled}>
      {!loading && label}
      {loading && <Spin />}
    </Button>
  </div>;
};