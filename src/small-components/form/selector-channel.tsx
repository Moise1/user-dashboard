import { CSSProperties, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Channel } from '../../redux/channels/channelsSlice';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { Selector, SelectorData, SelectorValue, SelectorSizeType } from './selector';


interface SelectorChannelProps {
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

export const SelectorChannel = (props: SelectorChannelProps) => {
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
    if (onChange)
      onChange((value as SelectorData).value as number);
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

  let dV: SelectorValue;
  if (defaultValue != undefined && defaultValue != null) {
    const c = children.find(x => x.id == defaultValue);
    if (c) {
      dV = CreateValue(c);
    }
  }

  let v: SelectorValue;
  if (value != undefined && value != null) {
    const c = children.find(x => x.id == value);
    if (c) {
      v = CreateValue(c);
    }
  }


  return <Selector
    disabled={disabled}
    style={style}
    onChange={OnChange}
    defaultValue={dV}
    value={v}
    dropdownRender={dropdownRender}
    loading={loading}
    size={size}
    placeholder={placeholder}
    className={className}
    showSearch={showSearch}
    labelInValue={true}
  >
    {children.map(CreateValue)}
  </Selector>;
};