import { useState } from 'react';
import { Select, Input, Form } from 'antd';
import '../../sass/light-theme/selector.scss';
import profile from '../../assets/new-account.svg';

interface Props {
  children: { id: number; value: string }[];
  defaultValue: string;
  addAccount?: boolean;
  onChange?: (value: string) => void;
}

const { Option } = Select;

export const Selector: React.FC<Props> = (props: Props) => {
  const { children, defaultValue, addAccount, onChange } = props;
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showAddAccount] = useState<boolean | undefined>(addAccount);

  const options = [];
  for (let i = 0; i < children.length; i++) {
    options.push(
      <Option key={children[i].id} value={children[i].value}>
        {children[i].value}
      </Option>
    );
  }

  const handleOptionClick = (): void => {
    setShowInput(!showInput);
  };

  const handleFormSubmit = (values: { newAccount: string }): void => {
    const { newAccount } = values;
    children.push({ id: children.length + 1, value: newAccount });
    console.log('form submitted...');
  };

  const newAccBtn = (
    <div>
      {showInput ? (
        <Form onFinish={handleFormSubmit}>
          <Form.Item name="newAccount">
            <Input className="new-acc-input" placeholder="Create account..." name="newAccount" />
          </Form.Item>
        </Form>
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
      onChange={onChange}
      showSearch
      placeholder="Select..."
      defaultValue={defaultValue}
      dropdownRender={(menu) => (
        <>
          {showAddAccount && newAccBtn}
          {menu}
        </>
      )}
    >
      {options}
    </Select>
  );
};
