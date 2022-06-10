import { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { t } from '../../utils/transShim';
import '../../sass/sources-table.scss';
import '../../sass/popover.scss';
import { useHistory } from 'react-router';
import { eCountry } from './eCountry';
import { CheckOutlined } from '@ant-design/icons';
import { DataTable } from '../tables/DataTable';
import { Key } from 'antd/lib/table/interface';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { AutoOrderingData } from '../../redux/auto-ordering/autoOrderingSlice';
import { getAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';

export const AutoOrderingConfiguration = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.getAutoOrdering);
  const [current, setCurrent] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRecord, setSelectedRecord] = useState({});

  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
    getCheckboxProps: () => {
      return {
        style: { display: 'none' }
      };
    }
  };

  useEffect(() => {
    dispatch(getAutoOrdering());
  }, []);

  const dataSource = [
    {
      id: 1,
      name: 'Amazon',
      url: 'www.amazon.co.uk',
      isoCountry: eCountry.UK,
      fee: 1,
      enabled: true
    },
    {
      id: 30,
      name: 'Amazon',
      url: 'www.amazon.com',
      isoCountry: eCountry.US,
      fee: 1,
      enabled: true
    },
    {
      id: 140,
      name: 'Amazon',
      url: 'www.amazon.com.au',
      isoCountry: eCountry.AU,
      fee: 1,
      enabled: true
    },
    {
      id: 141,
      name: 'Amazon',
      url: 'www.amazon.de',
      isoCountry: eCountry.DE,
      fee: 1,
      enabled: true
    },
    {
      id: 3,
      name: 'Costco',
      url: 'www.costco.co.uk',
      isoCountry: eCountry.UK,
      fee: 1,
      enabled: true
    },
    {
      id: 78,
      name: 'Costco',
      url: 'www.costco.com',
      isoCountry: eCountry.US,
      fee: 1,
      enabled: true
    },
    {
      id: 10,
      name: 'Robert Dyas',
      url: 'www.robertdyas.co.uk',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: true
    },
    {
      id: 5,
      name: 'UK Banggood',
      url: 'uk.banggood.com',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: true
    },
    {
      id: 56,
      name: 'US Banggood',
      url: 'us.banggood.com',
      isoCountry: eCountry.US,
      fee: 0,
      enabled: true
    },
    {
      id: 57,
      name: 'Banggood Com',
      url: 'www.banggood.com',
      isoCountry: eCountry.US,
      fee: 0,
      enabled: true
    },
    {
      id: 70,
      name: 'Banggood Com',
      url: 'www.banggood.com',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: true
    },
    {
      id: 59,
      name: 'Costway',
      url: 'www.costway.co.uk',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: true
    },
    {
      id: 31,
      name: 'Walmart',
      url: 'www.walmart.com',
      isoCountry: eCountry.US,
      fee: 0,
      enabled: true
    },
    {
      id: 221,
      name: 'SaleYee',
      url: 'www.saleyee.com',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: true
    },
    {
      id: 222,
      name: 'SaleYee',
      url: 'www.saleyee.com',
      isoCountry: eCountry.US,
      fee: 0,
      enabled: true
    },
    {
      id: 185,
      name: 'Dropship Traders',
      url: 'www.dropship-traders.co.uk',
      isoCountry: eCountry.UK,
      fee: 0,
      enabled: false
    }
  ];

  console.log(selectedRecord);
  //To not show the duplicated suppliers and to sort autoOrders data alphabetically
  const uniqueData = Array.from(dataSource.reduce((map, obj) => map.set(obj.name, obj), new Map()).values());
  uniqueData.sort((a, b) => a.name.localeCompare(b.name));

  const tableColumns = [
    {
      title: t('AutoOrderingConfiguration.Supplier'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('AutoOrderingConfiguration.Free'),
      dataIndex: '',
      key: 'free',
      render: (render: AutoOrderingData) => (
        <p className="fs-14">{render.fee === 0 ? <CheckOutlined className="free-icon" /> : ' '}</p>
      )
    },
    {
      title: t('AutoOrderingConfiguration.FeePercentage'),
      dataIndex: '',
      key: 'feepercentage',
      render: (render: AutoOrderingData) => <p className="fs-14">{render.fee === 1 ? `${render.fee}%` : ' '} </p>
    },
    {
      title: t('AutoOrderingConfiguration.Status'),
      dataIndex: '',
      key: 'status',
      render: (render: AutoOrderingData) => (
        <span className={render.enabled === true ? 'enableBtn' : 'disableBtn'}>
          {render.enabled === true ? 'Enabled' : 'Disabled'}
        </span>
      )
    }
  ];

  return (
    <Layout className="sources-container">
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="sources-table-container">
            <DataTable
              page="autoordering"
              columns={tableColumns}
              dataSource={uniqueData}
              totalItems={uniqueData?.length}
              pageSize={postPerPage}
              setPostPerPage={setPostPerPage}
              current={current}
              onChange={setCurrent}
              rowClassName="table-row"
              rowSelection={rowSelection}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setSelectedRecord(record);
                    history.push({ pathname: '/auto-ordering-configuration-query', state: record });
                  }
                };
              }}
            />
          </div>
        </>
      )}
    </Layout>
  );
};
