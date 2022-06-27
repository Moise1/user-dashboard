import { ReactElement, JSXElementConstructor, ReactNode, CSSProperties, useState, useEffect } from 'react';
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
  onChange?: (value: string) => void;
  size?: SelectorSizeType;
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
  placeHolder?: string | JSX.Element;
}

export const MultipleSelector = (props: Props) => {
  const {
    children,
    className,
    placeholder,
    //defaultValue,
    value,
    onChange,
    dropdownRender,
    loading,
    style,
    size,
    disabled,
    showSearch,
    //placeHolder
  } = props;

  const childrens = (Array.isArray(children) ? children : [children]);
  const selectedValues = value?.split(',');
  const [selectedItems, setSelectedItems] = useState<SelectorData[]>([]);
  const [filteredOptions, setFilteredOptions] = useState(childrens.filter((o) => !selectedItems.includes(o)));
  const [defaultselected, setDefaultSelected] = useState<SelectorData[]>(childrens?.filter((o) => selectedValues?.includes(o.value.toString())));

  const options =
    filteredOptions.map(c => {
      return (
        <Option key={c.value} value={c.value}>
          {c.label}
        </Option>
      );
    });

  const OnChange = (val: SelectorData[]) => {
    setSelectedItems(val);
    console.log('val');
    console.log(val);

    if (onChange) {
      let values = '';
      val.map((x) => {
        values = values === '' ? x.value.toString() : values + ',' + x.value;
      });
      onChange(values);
      console.log(values);
    }
    const filtered = childrens.filter((o) => !selectedItems.includes(o));
    setFilteredOptions(filtered);
  };

  useEffect(() => {

    const selectedValues = value?.split(',');
    const childrens = (Array.isArray(props.children) ? props.children : [props.children]);
    const included = childrens.filter((o) => selectedValues?.includes(o.value.toString()));
    setSelectedItems(included);
    setDefaultSelected(included);
    const filtered = childrens.filter((o) => !included.includes(o));
    setFilteredOptions(filtered);
  }, [props.children, props.value]);


  //const dv = childrens.find(x => x.value == defaultValue);
  //const v = childrens.find(x => x.value == value);
  //const placeHolderU = (!dv && !v) ? {
  //  value: '',
  //  label: placeHolder
  //} as SelectorData : undefined;

  return (
    <Select
      mode='multiple'
      labelInValue={true}
      disabled={disabled}
      style={style}
      className={'selector ' + (className ?? '')}
      allowClear={false}
      showSearch={showSearch}
      onChange={OnChange}
      placeholder={placeholder}
      defaultValue={defaultselected}
      dropdownRender={dropdownRender}
      loading={loading}
      size={size}
      value={selectedItems}
    >
      {options}
    </Select>
  );
};