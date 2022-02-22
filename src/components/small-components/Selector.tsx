import { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { PlusCircle } from 'react-feather';
import {Rule} from '../../redux/pricing-rules/rulesSlice';
import '../../sass/light-theme/selector.scss';

interface Props {
  children: Array<dummyUsersTypes| Rule>;
  defaultValue: string;
  addAccount?: boolean;
  onChange?: (value: string) => void;
}

type dummyUsersTypes = {
  value?: string,
  id?: number,
  alias?: string,
  phone?: string,
  otp?: string,
  password?: string
};

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, addAccount, onChange } = props;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showAddAccount] = useState<boolean | undefined>(addAccount);
  const [newAccount, setNewAccount] = useState({ value: '' });
  
  const options = children.map((d) => (
    <Option key={d.id} value={d.id}>
      {d.id}
    </Option>
  ));
  const handleOptionClick = (): void => {
    setShowInput(!showInput);
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setNewAccount({ value: e?.currentTarget?.value });
  };

  const handleSubmit = () => {
    children.push({ id: children.length + 1, value: newAccount.value });
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
                    <PlusCircle className="add-icon" size="35" />
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
