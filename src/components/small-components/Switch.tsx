
import { Switch as Toggle } from 'antd';
// import { SwitchChangeEventHandler } from 'antd/lib/switch';
import '../../sass/switch.scss';

interface Props {
  onChange?: () => void
  checkedChildren?: string;
  unCheckedChildren?: string;
  checked?: boolean;
  className?: string;
}



export const Switch = (props: Props): JSX.Element => {
  const { onChange, checkedChildren, unCheckedChildren, checked, className } = props;
  return (
    <Toggle
      className={className}
      checked={checked}
      onChange={onChange}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    />
  );
};
