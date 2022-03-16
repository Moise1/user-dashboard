import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { DummyData } from '../../dummy-data/dummyData';
import '../../sass/selector.scss';

interface Props {
  children: Array<DummyData | Rule | SourceConfig>;
  defaultValue: string;
  addAccount?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  dropdownRender?: (
    menu: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
  ) => ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;
  loading?: boolean;
  style?: CSSProperties;
}

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, onChange, dropdownRender, loading, style } = props;
  const options = children.map((c) => (
    <Option key={c.id} value={c.value}>
      {c.value}
    </Option>
  ));

  return (
    <Select
      style={style}
      className="selector"
      allowClear={false}
      onChange={onChange}
      showSearch
      placeholder="Select..."
      defaultValue={defaultValue}
      dropdownRender={dropdownRender}
      loading={loading}
    >
      {options}
    </Select>
  );
};
