import { CSSProperties, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Channel } from '../../redux/channels/channelsSlice';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { Selector, SelectorData, SelectorValue, SelectorSizeType } from './selector';


interface Props {
  children: Channel[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: SelectorSizeType;
  value?: number;
  dropdownRender?: (
    menu: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
  ) => ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;
  loading?: boolean;
  style?: CSSProperties;
  showFlags?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showSearch?: boolean;
}

export const SelectorChannel = (props: Props) => {
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
    showFlags,
    disabled,
    showSearch
  } = props;

  const OnChange = (value: SelectorValue) => {
    if (onChange) {
      onChange(value as number);
    }
  };

  const CreateLabel = (c: Channel) => {
    return <>
      {showFlags && shopLogo(c.channelId)}
      {showFlags && countryFlag(c.isoCountry)}
      {c.name}
    </>;
  };

  const CreateValue = (c: Channel) => {
    return {
      value: c.id,
      label: <>
        {CreateLabel(c)}
      </>
    };
  };

  const options = children.map(CreateValue);

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
  >
    {options}
  </Selector>;
};