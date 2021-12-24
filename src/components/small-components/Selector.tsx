import { useState } from 'react';
import { Select, Input } from 'antd';
import { ReactNode } from 'react';
import '../../sass/light-theme/selector.scss';
import profile from '../../assets/new-account.svg';

interface Props {
  children: ReactNode;
  defaultValue: string;
  addAccount?: boolean;
}

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, addAccount } = props;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState<string>('');
  // const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showAddAccount] = useState<boolean | undefined>(addAccount);
  const options = [];
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      options.push(
        <Option key={children[i].id} value={children[i].value}>
          {children[i].value}
        </Option>
      );
    }
  }
 
  // const handleFocus = () => setShowSearch(!showSearch);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> & React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    setNewAccount(e.target.value);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLSpanElement | HTMLParagraphElement>): void => {
    e.stopPropagation();
    setShowInput(!showInput);
  };

  const newAccBtn = (
    <div>
      {showInput ? (
        <Input
          className="new-acc-input"
          placeholder="Create account..."
          name="new-account"
          value={newAccount}
          onClick={handleChange}
          onChange={handleChange}
        >
          {/* <span onClick={handleOptionClick} role="">
            {' '}
            <img src={profile} alt="New acc" />
          </span> */}
        </Input>
      ) : (
        <p className="new-acc-btn" onClick={handleOptionClick}>
          <span>Add acount</span>
          <span>
            <img src={profile} alt="New acc" />
          </span>
        </p>
      )}
    </div>
  );

  return (
    <Select
      className="selector"
      allowClear={false}
      showSearch
      placeholder="Select..."
      defaultValue={defaultValue}
    >
      {showAddAccount && newAccBtn}
      {options}
    </Select>
  );
};
