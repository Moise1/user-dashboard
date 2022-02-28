import { Switch as Toggle } from 'antd';
import '../../sass/light-theme/switch.scss';

interface Props {
  onChange?: regularOnChange | themeChangeType;
  checkedChildren?: string;
  unCheckedChildren?: string;
  checked?: boolean;
  className?: string;
}

type regularOnChange = () => void;
type themeChangeType = (theme: string| boolean) => void;

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
