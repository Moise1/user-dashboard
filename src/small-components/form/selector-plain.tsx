import React, { CSSProperties, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Selector, SelectorValue, SelectorSizeType } from './selector';


interface SelectorChannelProps {
  children: { value: React.Key; label: string }[];
  defaultValue?: React.Key;
  onChange?: (value: React.Key) => void;
  size?: SelectorSizeType;
  value?: React.Key;
  dropdownRender?: (
    menu: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
  ) => ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showSearch?: boolean;
}

export const SelectorPlain = (props: SelectorChannelProps) => {
  const {
    children,
    defaultValue,
    placeholder,
    className,
    value,
    onChange,
    dropdownRender,
    loading,
    style,
    size,
    disabled,
    showSearch
  } = props;

  const OnChange = (value: SelectorValue) => {
    if (onChange)
      onChange(value as React.Key);
  };

  return <Selector
    disabled={disabled}
    style={style}
    onChange={OnChange}
    defaultValue={defaultValue}
    value={value}
    dropdownRender={dropdownRender}
    loading={loading}
    size={size}
    placeholder={placeholder}
    className={className}
    showSearch={showSearch}
    labelInValue={false}
  >
    {children}
  </Selector>;
};