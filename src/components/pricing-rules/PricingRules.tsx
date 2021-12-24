import { Table, Form, Input, Button } from 'antd';
import { StatusBar } from '../small-components/StatusBar';
import '../../sass/light-theme/pricing-rules.scss';
import { Selector } from '../small-components/Selector';
import { dummyPricingRules } from '../../dummy-data/dummyData';

export const PricingRules = () => {
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
          <Selector defaultValue="Select a source">{dummyPricingRules}</Selector>

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
