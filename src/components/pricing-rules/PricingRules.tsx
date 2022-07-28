import { useEffect, useContext, useState } from 'react';
import { Form, Input, Spin, Popconfirm } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
// import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { getRules, createRule, deleteRule, updateRule } from '../../redux/pricing-rules/rulesThunk';
import { StatusBar } from '../../small-components/StatusBar';
import { DataTable, DataTableKey } from '../../small-components/tables/data-table';
import { Layout } from 'antd';
import { ConfirmBtn, TransparentBtn } from '../../small-components/ActionBtns';
import { AppContext } from '../../contexts/AppContext';
import { PriceRule } from '../../redux/pricing-rules/rulesSlice';
import { CloseIcon } from '../../small-components/CloseIcon';
import '../../sass/pricing-rules.scss';
import { Selector } from '../../small-components/form/selector';
import { getSources } from '../../redux/sources/sourcesThunk';
import { Source } from '../../redux/sources/sourceSlice';

export const PricingRules = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<DataTableKey[]>([]);

  const { Item } = Form;
  const dispatch = useAppDispatch();
  const { rules, loading: rulesLoading } = useAppSelector((state) => state.pricingRules);
  const { sources, loading: sourcesLoading } = useAppSelector((state) => state.sources);
  const { channelId } = useContext(AppContext);
  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  useEffect(() => {
    dispatch(getRules());
  }, [getRules, channelId]);

  const onFinish = async (values: PriceRule) => {
    const source = sources.filter((s: Source) => s.name === values.sourceId);
    await dispatch(
      createRule({
        ...values,
        sourceId: source[0].sourceId
      })
    );
    dispatch(getRules());
  };

  const removeRecord = async (id: PriceRule['id']) => {
    await dispatch(deleteRule({ id, active: true }));
    dispatch(getRules());
  };

  const updateStatus = async (id: PriceRule['id'], active: PriceRule['active']) => {
    await dispatch(updateRule({ id, active: !active }));
    dispatch(getRules());
  };

  const onSelectChange = (selectedRowKeys: DataTableKey[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const getSourceName = (id: number) => {
    return sources?.map((x: { id: number; name: string; }) => {
      if (x.id === id)
        return x.name;
    });
  };

  const tableColumns = [
    {
      title: 'Source',
      dataIndex: 'sourceId',
      key: 'sourceId',
      render: (value: number) =>
        value ? getSourceName(value) : ''
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
      render: (value: boolean, record: PriceRule) =>
        value ? (
          <TransparentBtn className="status-btn enabled" handleClick={() => updateStatus(record.id, record.active)}>
            Enabled
          </TransparentBtn>
        ) : (
          <TransparentBtn className="status-btn disabled" handleClick={() => updateStatus(record.id, record.active)}>
            Disabled
          </TransparentBtn>
        )
    },

    {
      title: 'Delete',
      dataIndex: '',
      key: '',
      render: (record: PriceRule) => {
        return (
          <Popconfirm title="Sure to delete this record?" onConfirm={() => removeRecord(record.id)}>
            <CloseIcon className="remove-rule" />
          </Popconfirm>
        );
      }
    }
  ];

  const [columns,
    // setColumns
  ] = useState(tableColumns);

  // const handleCheckBox = (e: CheckboxChangeEvent): void => {
  //   const cloneColumns = columns.map((col) => {
  //     if (col.key === e.target.value) {
  //       return { ...col, visible: e.target.checked };
  //     } else {
  //       return col;
  //     }
  //   });
  //   setColumns(cloneColumns);
  // };

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
              <Selector placeHolder="Select a source" loading={sourcesLoading}>
                {sources?.map(({ name: label, id: value }: Source) => ({ value, label }))}
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
            dataSource={rules}
            columns={columns}
            totalItems={rules.length}
            rowSelection={rowSelection}
          />
        )}
      </div>
    </Layout>
  );
};
