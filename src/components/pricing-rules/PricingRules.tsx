import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { Loader } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { getRules } from 'src/redux/pricing-rules/rulesThunk';
import { StatusBar } from '../small-components/StatusBar';
import { Selector } from '../small-components/Selector';
import { DataTable } from '../tables/DataTable';
import { Layout } from 'antd';
import {ConfirmBtn} from '../small-components/ActionBtns';
import '../../sass/light-theme/pricing-rules.scss';

export const PricingRules = () => {
  const [pricingRules, setPricingRules] = useState<Rule[]>([]);
  const dispatch = useAppDispatch();
  const { rules, loading } = useAppSelector((state) => state.pricingRules);
  
  useEffect(() => {
    dispatch(getRules());
    setPricingRules(rules);
  }, [pricingRules]);

  // console.log('PRICING RULES==>', pricingRules);
  const columns = [
    {
      title: 'Source',
      dataIndex: 'sourceId',
      key: 'sourceId'
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
      dataIndex: 'active',
      key: 'active'
    },

    {
      title: '',
      dataIndex: 'options',
      key: 'options'
    }
  ];

  return (
    <Layout className="pricing-rules-container">
      <div className="pricing-rules">
        <StatusBar className="pricing-rules-bar">
          <div className="form-header">
            <h2 className="add-rule">Add new rule</h2>
            <p className="status-description">
              The initial status of the rule will be “Disabled”, so that you can double check your set of rules before
              enabling it.
            </p>
          </div>
          <Form className="form" layout="vertical">
            <Form.Item label="Source">
              <Selector defaultValue="Select a source">{pricingRules}</Selector>
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
            <ConfirmBtn>Add rule</ConfirmBtn>
          </Form>
        </StatusBar>
        <DataTable dataSource={pricingRules} columns={columns} loading={{ indicator: <Loader />, spinning: loading }} />
      </div>
    </Layout>
  );
};
