import { Table, Form, Input, Select, Button } from 'antd';
import StatusBar from '../SmallComponents/StatusBar';
import '../../sass/light-theme/pricing-rules.scss';

export const PricingRules = () => {
  const { Option } = Select;

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  return (
    <div className="pricing-rules-container">
      <StatusBar>
        <h1>Add new rule</h1>
        <p>
          The initial status of the rule will be “Disabled”, so that you can double check your set of rules before
          enabling it.
        </p>
        <Form className="form">
          <Select className="select" value="Select" onChange={() => console.log('Selected...')}>
            <Option value="1">Source 1</Option>
            <Option value="2">Source 2</Option>
          </Select>
          <Input className="input" type="text" onChange={() => console.log('Input...')} placeholder="Add from price" />
          <Input className="input" type="text" onChange={() => console.log('Input...')}  placeholder="Add to price"/>
          <Input className="input" type="text" onChange={() => console.log('Input...')} placeholder="Mark up"/>
          <Button className="rule-btn">Add rule</Button>
        </Form>
      </StatusBar>
      <Table className="table" dataSource={dataSource} columns={columns} />
    </div>
  );
};
