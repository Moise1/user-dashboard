import { CSSProperties, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Channel } from '../../redux/channels/channelsSlice';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { Selector, sizeType } from './selector';


interface SelectorChannelProps {
  children: Channel[];
  defaultValue?: string;
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
  disabled?: boolean;
  placeholder?: string;
}

export const SelectorChannel = (props: SelectorChannelProps) => {
  const { children, defaultValue, placeholder, className, value, onChange, dropdownRender, loading, style, size, showFlags, disabled } = props;

  return <Selector
    disabled={disabled}
    style={style}
    onChange={onChange}
    defaultValue={defaultValue}
    value={value}
    dropdownRender={dropdownRender}
    loading={loading}
    size={size}
    placeholder={placeholder}
    className={className}
  >
    {
      children.map(c => {
        return {
          key: c.id,
          value: <>
            {showFlags && shopLogo(c.channelId)}
            {showFlags && countryFlag(c.isoCountry)}
            {c.value}
          </>
        };
      }
      )
    }
  </Selector>;
};