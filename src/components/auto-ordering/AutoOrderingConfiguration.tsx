import { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { t } from '../../utils/transShim';
import '../../sass/popover.scss';
import { useHistory } from 'react-router';
import { CheckOutlined } from '@ant-design/icons';
import { DataTable, DataTableKey } from '../../small-components/tables/data-table';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';
import { Links } from '../../links';
import { getSources } from 'src/redux/sources/sourcesThunk';
import { Source } from 'src/redux/sources/sourceSlice';
import { eCountry } from '../../data/countries';

export const AutoOrderingConfiguration = () => {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const { loading, suppliers } = useAppSelector((state) => state.getAutoOrdering);
  const { sources } = useAppSelector((state) => state.sources);
  const [selectedRowKeys, setSelectedRowKeys] = useState<DataTableKey[]>([]);
  const [selectedRecord, setSelectedRecord] = useState({});

  const onSelectChange = (selectedRowKeys: DataTableKey[]) => {
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
    dispatch(getSources());
  }, []);

  const channelId = localStorage.getItem('channelId');
  const { channels } = useAppSelector((state) => state.channels);
  const channel = channels?.filter((x: { id: number }) => x.id as unknown as string == channelId);

  let newSources: Source[] = [];
  const sourcesChannel = () => {
    return newSources = sources.map((s: Source) => {
      if (s.site === eCountry[channel[0]?.isoCountry] && s.hasAutoOrder === true) {
        return s;
      }
    });
  };

  sourcesChannel();

  const emptySource: Source[] = [];

  console.log('The selectedRecord', selectedRecord);

  // To not show the duplicated suppliers and to sort autoOrders data alphabetically
  // const uniqueData = Array.from(newSources.reduce((map:Source, obj:Source) => map.set(obj.id, obj), new Map()).values()) as Source[];

  const uniqueElements = newSources.filter((v, i, a) => a.indexOf(v) === i);
  delete uniqueElements[1]; uniqueElements;
  uniqueElements.sort((a, b) => a.name.localeCompare(b.name));

  const getStatus = (id: number) => {
    for (let i = 0; i < suppliers.length; i++) {
      if (suppliers.length !== 0) {
        if (suppliers[i].sourceId == id) {
          return 'Enabled';
        }
        else {
          return 'Disabled';
        }
      }
    }
    if (suppliers.length === 0) return 'Disabled';
  };


  const tableColumns = [
    {
      title: t('AutoOrderingConfiguration.Supplier'),
      dataIndex: '',
      key: 'name',
      render: (render: Source) => (
        <p className="fs-14">{render?.name}</p>
      )
    },
    {
      title: t('AutoOrderingConfiguration.Free'),
      dataIndex: '',
      key: 'free',
      render: (render: Source) => (
        <p className="fs-14">{render?.autoOrderingFee === 0 || render?.autoOrderingFee === null ? <CheckOutlined className="free-icon" /> : ' '}</p>
      )
    },
    {
      title: t('AutoOrderingConfiguration.FeePercentage'),
      dataIndex: '',
      key: 'feepercentage',
      render: (render: Source) => <p className='fs-14'>
        {render?.autoOrderingFee === 1 ? ` ${render?.autoOrderingFee}%` : ''}
      </p>
    },
    {
      title: t('AutoOrderingConfiguration.Status'),
      dataIndex: '',
      key: '',
      render: (render: Source) => <p className={getStatus(render?.id) === 'Enabled' ? 'green-bg' : 'red-bg'}
      >
        {render?.id && getStatus(render?.id)}
      </p>
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
              currentPage={1}
              page="autoordering"
              columns={tableColumns}
              dataSource={uniqueElements.length > 1 ? uniqueElements : emptySource}
              totalItems={uniqueElements.length ? uniqueElements.length : emptySource.length}
              pageSize={10}
              rowClassName="table-row"
              rowSelection={rowSelection}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setSelectedRecord(record);
                    history.push({ pathname: Links.AutoOrderConfigurationQuery, state: record });
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
