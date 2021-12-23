import { Switch as Toggle } from 'antd';
import '../../sass/light-theme/switch.scss';

interface Props {
  onChange?: () => void;
}
export const Switch = ({ onChange }: Props): JSX.Element => <Toggle onChange={onChange} />;
