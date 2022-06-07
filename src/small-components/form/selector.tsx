import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties } from 'react';
import { Select } from 'antd';
import '../../sass/selector.scss';

const { Option } = Select;
export type SelectorSizeType = 'large' | 'small' | 'middle';

export type SelectorLabel = string | JSX.Element;
export type SelectorValue = React.Key;
export interface SelectorData {
  value: SelectorValue;
  label: SelectorLabel;
}

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
  placeHolder?: string | JSX.Element;
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
    placeHolder
  } = props;

  const childrens = (Array.isArray(children) ? children : [children]);

  const options =
    childrens.map(c => {
      return (
        <Option key={c.value} value={c.value}>
          {c.label}
        </Option>
      );
    });

  const OnChange = (val: SelectorData) => {
    if (onChange) {
      onChange(val.value);
    }
  };

  const dv = childrens.find(x => x.value == defaultValue);
  const v = childrens.find(x => x.value == value);
  const placeHolderU = (!dv && !v) ? {
    value: '',
    label: placeHolder
  } as SelectorData : undefined;

  return (
    <Select
      labelInValue={true}
      disabled={disabled}
      style={style}
      className={'selector ' + (className ?? '')}
      allowClear={false}
      onChange={OnChange}
      showSearch={showSearch}
      placeholder={placeholder}
      defaultValue={dv ?? placeHolderU}
      value={v}
      dropdownRender={dropdownRender}
      loading={loading}
      size={size}
    >
      {options}
    </Select>
  );
};