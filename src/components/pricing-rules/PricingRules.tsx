import { useEffect, useContext, useState } from 'react';
import { Form, Input, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getRules } from 'src/redux/pricing-rules/rulesThunk';
import { getSources } from '../../redux/source-config/sourcesThunk';
import { StatusBar } from '../small-components/StatusBar';
import { Selector } from '../small-components/Selector';
import { DataTable } from '../tables/DataTable';
import { Layout } from 'antd';
import { ConfirmBtn } from '../small-components/ActionBtns';
import { AppContext } from '../../contexts/AppContext';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import '../../sass/pricing-rules.scss';

export const PricingRules = () => {
  const { Item } = Form;
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState<number>(1);
  const { rules } = useAppSelector((state) => state.pricingRules);
  const { sources, loading: sourcesLoading } = useAppSelector((state) => state.sources);
  const { channelId } = useContext(AppContext);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources, channelId]);

  useEffect(() => {
    dispatch(getRules());
  }, [getRules, channelId]);

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
    <Layout>
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
            <Item label="Source">
              <Selector defaultValue="Select a source" loading={sourcesLoading}>
                {sources?.map(({ sourceName: value, sourceId: id }: SourceConfig) => ({ value, id }))}
              </Selector>
            </Item>
            <Item label="Price From">
              <Input className="blue-input" type="text" placeholder="Set a price from" />
            </Item>
            <Item label="Price To">
              <Input className="blue-input" type="text" placeholder="Set a price to" />
            </Item>
            <Item label="Markup">
              <Input className="blue-input" type="text" placeholder="Mark up" />
            </Item>
            <Item>
              <ConfirmBtn>Add rule</ConfirmBtn>
            </Item>
          </Form>
        </StatusBar>
        {sourcesLoading ? (
          <Spin />
        ) : (
          <DataTable
            dataSource={rules}
            columns={columns}
            pageSize={4}
            current={current}
            onChange={setCurrent}
            total={rules.length}
          />
        )}
      </div>
    </Layout>
  );
};
