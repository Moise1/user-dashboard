import { useState } from 'react';
import { Select, Input, Button } from 'antd';
import '../../sass/light-theme/selector.scss';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  children: { id: number; value: string, alias?: string }[];
  defaultValue: string;
  addAccount?: boolean;
  onChange?: (value: string) => void;
}

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, addAccount, onChange } = props;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showAddAccount] = useState<boolean | undefined>(addAccount);
  const [newAccount, setNewAccount] = useState({ value: '' });
  const [data] = useState<Props['children']>(children);

  const options = data.map((d) => (
    <Option key={d.id} value={d.alias ? d.alias : d.value}>
      {d.alias ? d.alias : d.value}
    </Option>
  ));
  const handleOptionClick = (): void => {
    setShowInput(!showInput);
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setNewAccount({ value: e?.currentTarget?.value });
  };

  const handleSubmit = () => {
    data.push({ id: data.length + 1, value: newAccount.value });
    setNewAccount({ value: '' });
  };

  return (
    <Select
      className="selector"
      allowClear={false}
      onChange={onChange}
      showSearch
      placeholder="Select..."
      defaultValue={defaultValue}
      dropdownRender={(menu) => (
        <>
          {showAddAccount && (
            <div className="action-ctrl">
              {showInput ? (
                <div className="input-container">
                  <Input
                    className="new-acc-input"
                    placeholder="Create account..."
                    value={newAccount.value}
                    name="newAccount"
                    onChange={handleChange}
                  />
                  <a onClick={handleSubmit}>
                    <PlusOutlined className="add-icon" />
                  </a>
                </div>
              ) : (
                <Button className="new-acc-btn" onClick={handleOptionClick}>
                  New Account
                </Button>
              )}
            </div>
          )}
          {menu}
        </>
      )}
    >
      {options}
    </Select>
  );
};
