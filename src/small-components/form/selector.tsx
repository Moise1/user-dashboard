import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import '../../sass/selector.scss';

const { Option } = Select;
export type SelectorSizeType = 'large' | 'small' | 'middle';

export type SelectorLabel = string | JSX.Element;
export interface SelectorData {
  value: React.Key;
  label: SelectorLabel;
}
export type SelectorValue = React.Key | SelectorData | null | undefined;

interface Props {
  children: SelectorData | SelectorData[];
  defaultValue?: SelectorValue;
  onChange?: (value: SelectorValue) => void;
  size?: SelectorSizeType;
  value?: SelectorValue;
  dropdownRender?: (
    menu: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
  ) => ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showSearch?: boolean;
  labelInValue?: boolean;
}

export const Selector = (props: Props) => {
  const {
    children,
    className,
    placeholder,
    defaultValue,
    value,
    onChange,
    dropdownRender,
    loading,
    style,
    size,
    disabled,
    showSearch,
    labelInValue
  } = props;

  const options = Array.isArray(children) ?
    (
      children.map(c => {
        return (
          <Option key={c.value} value={c.value}>
            {c.label}
          </Option>
        );
      })
    ) : (
      <Option key = { children.value } value = { children.value } >
        {children.label}
      </Option> 
    );

  return (
    <Select
      labelInValue={labelInValue}
      disabled={disabled}
      style={style}
      className={'selector ' + (className ?? '')}
      allowClear={false}
      onChange={onChange}
      showSearch={showSearch}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      dropdownRender={dropdownRender}
      loading={loading}
      size={size}
    >
      {options}
    </Select>
  );
};