import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import '../sass/selector.scss';

interface Props {
  children: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>> | Array<ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>>;
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
  className?: string;
  isListingsTable?: boolean;
}

type sizeType = 'large' | 'small' | 'middle';

export const SimpleSelect: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, value, onChange, dropdownRender, loading, style, size } = props;

  return (
    <Select
      style={style}
      className="selector"
      allowClear={false}
      onChange={onChange}
      showSearch
      placeholder="Select..."
      value={value}
      defaultValue={defaultValue}
      dropdownRender={dropdownRender}
      loading={loading}
      size={size}
    >
      {children}
    </Select>
  );
};
