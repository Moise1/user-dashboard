import { Table, Form, Input, Select, Button } from 'antd';
import {StatusBar} from '../SmallComponents/StatusBar';
import '../../sass/light-theme/pricing-rules.scss';

export const PricingRules = () => {
  const { Option } = Select;

  const dataSource = [
    {
      key: '1',
      source: 'Ali Express',
      priceFrom: 32,
      priceTo: 30,
      markUp: 0,
      status: <button className="status-btn">Disabled</button>,
      options: (
        <div className="options">
          <span role="button" onClick={() => alert('Clicked')}>
            <i className="fa fa-trash" aria-hidden="true" />
          </span>
          <span role="button" onClick={() => alert('Clicked')}>
            <i className="fa fa-pencil" aria-hidden="true" />
          </span>
        </div>
      )
    },
    {
      key: '2',
      source: 'Amazon',
      priceFrom: 32,
      priceTo: 30,
      markUp: 0,
      status: <button className="status-btn enabled">Enabled</button>,
      options: (
        <div className="options">
          <span role="button" onClick={() => alert('Clicked')}>
            <i className="fa fa-trash" aria-hidden="true" />
          </span>
          <span role="button" onClick={() => alert('Clicked')}>
            <i className="fa fa-pencil" aria-hidden="true" />
          </span>
        </div>
      )
    }
  ];

  const columns = [
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: 'Price From',
      dataIndex: 'priceFrom',
      key: 'priceFrom'
    },
    {
      title: 'Price to',
      dataIndex: 'priceTo',
      key: 'priceTo'
    },
    {
      title: 'Mark Up',
      dataIndex: 'markUp',
      key: 'markUp'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },

    {
      title: '',
      dataIndex: 'options',
      key: 'options'
    }
  ];

  return (
    <div className="pricing-rules-container">
      <StatusBar className="pricing-rules-bar">
        <h4 className="add-rule">Add new rule</h4>
        <p className="status-description">
          The initial status of the rule will be “Disabled”, so that you can double check your set of rules before
          enabling it.
        </p>
        <Form className="form" layout="inline">
          <Select
            defaultValue="Select"
            className="select"
            onChange={() => console.log('Selected...')}
          >
            <Option value="Source 1">Source 1</Option>
            <Option value="Source 2">Source 2</Option>
          </Select>

          <Input
            className="input"
            type="text"
            onChange={() => console.log('Input...')}
            placeholder="Set a price from"
          />
          <Input className="input" type="text" onChange={() => console.log('Input...')} placeholder="Set a price to" />
          <Input className="input" type="text" onChange={() => console.log('Input...')} placeholder="Mark up" />
          <Button className="rule-btn">Add rule</Button>
        </Form>
      </StatusBar>
      <Table className="table" dataSource={dataSource} columns={columns} />
    </div>
  );
};