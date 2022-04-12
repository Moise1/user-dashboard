import { useEffect, useState, useContext } from 'react';
import { Form, Input, Spin, Popconfirm } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getRules, createRule, deleteRule } from '../../redux/pricing-rules/rulesThunk';
import { getSources } from '../../redux/source-config/sourcesThunk';
import { StatusBar } from '../small-components/StatusBar';
import { Selector } from '../small-components/Selector';
import { DataTable } from '../tables/DataTable';
import { Layout } from 'antd';
import { ConfirmBtn, TransparentBtn } from '../small-components/ActionBtns';
import { AppContext } from '../../contexts/AppContext';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { X as CloseIcon } from 'react-feather';
import '../../sass/pricing-rules.scss';

export const PricingRules = () => {
  const { Item } = Form;
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState<number>(1);
  const { rules, loading: rulesLoading } = useAppSelector((state) => state.pricingRules);
  const { sources, loading: sourcesLoading } = useAppSelector((state) => state.sources);
  const { channelId } = useContext(AppContext);
  const [dataSource, setDataSource] = useState<Rule[]>(rules);
  // const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  useEffect(() => {
    dispatch(getRules());
  }, [getRules, channelId]);

  const onFinish = async (values: Rule) => {
    const source = sources.filter((s: SourceConfig) => s.sourceName === values.sourceId);
    await dispatch(
      createRule({
        ...values,
        sourceId: source[0].sourceId
      })
    );
    dispatch(getRules());
  };

  const removeRecord = async(id: Rule['id']) => {
    const rule = dataSource.filter((item: Rule) => item.id === id)[0];
    await dispatch(deleteRule(rule.id));
    setDataSource(dataSource.filter((item: Rule) => item.id !== id));
    
  };

  const updateStatus = (id: Rule['id']) => {
    setDataSource((prevState: Rule[]) => prevState.map((r: Rule) => {
      if(r.id === id){
        return {
          ...r,
          active: !r.active
        };
      }
      return r;
    }));
  };

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
      key: 'active',
      render: (value: boolean, record: Rule) =>
        value ? (
          <TransparentBtn className="status-btn enabled" handleClick={() => updateStatus(record.id)}>
            Enabled
          </TransparentBtn>
        ) : (
          <TransparentBtn className="status-btn disabled" handleClick={() => updateStatus(record.id)}>
            Disabled
          </TransparentBtn>
        )
    },

    {
      title: 'Delete',
      dataIndex: '',
      key: '',
      render: (record: Rule) => {
        return (
          <Popconfirm title="Sure to delete this record?" onConfirm={() => removeRecord(record.id)}>
            <CloseIcon className="remove-rule" />
          </Popconfirm>
        );
      }
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
          <Form className="form" layout="vertical" onFinish={onFinish}>
            <Item label="Source" name="sourceId">
              <Selector defaultValue="Select a source" loading={sourcesLoading}>
                {sources?.map(({ sourceName: value, sourceId: id }: SourceConfig) => ({ value, id }))}
              </Selector>
            </Item>
            <Item label="Price From" name="priceFrom">
              <Input className="blue-input" type="text" placeholder="Set a price from" />
            </Item>
            <Item label="Price To" name="priceTo">
              <Input className="blue-input" type="text" placeholder="Set a price to" />
            </Item>
            <Item label="Markup" name="markup">
              <Input className="blue-input" type="text" placeholder="Mark up" />
            </Item>
            <Item>
              <ConfirmBtn htmlType="submit" disabled={rulesLoading}>
                {rulesLoading ? 'Please wait...' : 'Add rule'}
              </ConfirmBtn>
            </Item>
          </Form>
        </StatusBar>
        {sourcesLoading ? (
          <Spin />
        ) : (
          <DataTable
            dataSource={dataSource}
            columns={columns}
            pageSize={4}
            current={current}
            onChange={setCurrent}
            total={dataSource.length}
          />
        )}
      </div>
    </Layout>
  );
};
