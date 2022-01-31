import { Form, Input, Button } from 'antd';
import { StatusBar } from '../small-components/StatusBar';
import '../../sass/light-theme/pricing-rules.scss';
import { Selector } from '../small-components/Selector';
import { dummyPricingRulesOptions, dummyPricingRulesData } from '../../dummy-data/dummyData';
import { DataTable } from '../tables/DataTable';

export const PricingRules = () => {
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
      dataIndex: 'markup',
      key: 'markup'
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
    <div className="pricing-rules">
      <StatusBar className="pricing-rules-bar">
        <h4 className="add-rule">Add new rule</h4>
        <p className="status-description">
          The initial status of the rule will be “Disabled”, so that you can double check your set of rules before
          enabling it.
        </p>
        <Form className="form" layout="vertical">
          <Form.Item label="Source">
            <Selector defaultValue="Select a source">{dummyPricingRulesOptions}</Selector>
          </Form.Item>
          <Form.Item label="Price From">
            <Input className="blue-input" type="text" placeholder="Set a price from" />
          </Form.Item>
          <Form.Item label="Price To">
            <Input className="blue-input" type="text" placeholder="Set a price to" />
          </Form.Item>
          <Form.Item label="Markup">
            <Input className="blue-input" type="text" placeholder="Mark up" />
          </Form.Item>
          <Button className="rule-btn">Add rule</Button>
        </Form>
      </StatusBar>
      <DataTable dataSource={dummyPricingRulesData} columns={columns} />
    </div>
  );
};
