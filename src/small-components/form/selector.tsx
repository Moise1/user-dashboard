import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import '../../sass/selector.scss';

const { Option } = Select;
export type sizeType = 'large' | 'small' | 'middle';

interface SelectorData {
  key: string | number;
  value: string | JSX.Element;
}

interface Props {
  children: SelectorData | SelectorData[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: sizeType;
  value?: string;
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
          <Option key={c.key} value={c.key}>
            {c.value}
          </Option>
        );
      })
    ) : (
      <Option key = { children.key } value = { children.key } >
        {children.value}
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