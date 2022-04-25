import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import { Rule } from '../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../redux/source-config/sourceSlice';
import { Channel } from '../redux/channels/channelsSlice';
import { DummyData } from '../dummy-data/dummyData';
import { countryFlag } from '../utils/countryFlag';
import { shopLogo } from '../utils/shopLogo';
import '../sass/selector.scss';

interface Props {
  children: Array<DummyData | Rule | SourceConfig | Channel>;
  defaultValue?: string;
  addAccount?: boolean;
  onChange?: (value: string) => void;
  size?: sizeType;
  value?: string;
  dropdownRender?: (
    menu: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
  ) => ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;
  loading?: boolean;
  style?: CSSProperties;
  showFlags?: boolean;
}

const { Option } = Select;
type sizeType = 'large' | 'small' | 'middle';

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, onChange, dropdownRender, loading, style, size, showFlags } = props;

  const options = children?.map((c) => {
    return (
      <Option key={c.id} value={c.value}>
        {showFlags && shopLogo(c.channelId)}
        {showFlags && countryFlag(c.isoCountry)}
        {c.value}
      </Option>
    );
  });

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
      size={size}
    >
      {options}
    </Select>
  );
};
