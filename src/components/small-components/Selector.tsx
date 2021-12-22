import { Select } from 'antd';
import '../../sass/light-theme/selector.scss';

interface Props {
  children:  { id: number; value: string }[];
  defaultValue: string;
}

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const {children, defaultValue} = props;
  const options = [];
  for (let i = 0; i < children.length; i++) {
    options.push(
      <Option key={children[i].id} value={children[i].value}>
        {children[i].value}
      </Option>
    );
  }
  return (
    <Select className="selector" allowClear={false}  showSearch placeholder="Select..." defaultValue={defaultValue}>
      {options}
    </Select>
  );
};
