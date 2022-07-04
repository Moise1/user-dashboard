import { Button, Spin } from 'antd';
import { ReactNode } from 'react';
import '../../sass/settings/settings.scss';

interface Props {
  label: string | ReactNode;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const SettingButton = (props: Props) => {
  const { label, onClick, loading, disabled } = props;

  return <div className="setting setting-button">
    <Button className='primary-btn' onClick={onClick} disabled={disabled}>
      {!loading && label}
      {loading && <Spin />}
    </Button>
  </div>;
};