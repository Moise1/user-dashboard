import { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { t } from '../../utils/transShim';
import '../../sass/popover.scss';
import { useHistory } from 'react-router';
import { CheckOutlined } from '@ant-design/icons';
import { DataTable, DataTableKey } from '../../small-components/tables/data-table';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
//import { AutoOrderingData } from '../../redux/auto-ordering/autoOrderingSlice'; //Inconsistent use of types
import { getAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';
import { Links } from '../../links';
// import { AutoOrderingData } from 'src/redux/auto-ordering/autoOrderingSlice';
import { getSources } from 'src/redux/sources/sourcesThunk';
import { Source } from 'src/redux/sources/sourceSlice';
import { eCountry } from '../../types/eCountry';
import { AutoOrderingData } from 'src/redux/auto-ordering/autoOrderingSlice';

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
  console.log('The supplier', suppliers);

  // To not show the duplicated suppliers and to sort autoOrders data alphabetically
  // const uniqueData = Array.from(newSources.reduce((map:Source, obj:Source) => map.set(obj.id, obj), new Map()).values()) as Source[];

  let uniqueElements: Source[] = [];

  uniqueElements = newSources.filter((v, i, a) => a.indexOf(v) === i);
  console.log('The uniqueElements', uniqueElements);

  newSources.sort((a, b) => a.name.localeCompare(b.name));
  console.log('New sources after sort', newSources);

  const [newSourcez, setNewSourcez] = useState<unknown>('Enabled');
  const getStatus = (id: number) => {
    return suppliers.map((x: AutoOrderingData) => {
      console.log('The sourceId, supplierId', id, x.id);
      if (x.sourceId === id) {
        setNewSourcez('Enabled');
      }
      else {
        setNewSourcez('');
      }
    });
  };
  console.log('first', newSourcez, emptySource);

  const tableColumns = [
    {
      title: t('AutoOrderingConfiguration.Supplier'),
      dataIndex: '',
      key: 'name',
      render: (render: Source) => (
        <p className="fs-14">{render.name}</p>
      )
    },
    {
      title: t('AutoOrderingConfiguration.Free'),
      dataIndex: '',
      key: 'free',
      render: (render: Source) => (
        <p className="fs-14">{render.autoOrderingFee === 0 || render.autoOrderingFee === null ? <CheckOutlined className="free-icon" /> : ' '}</p>
      )
    },
    {
      title: t('AutoOrderingConfiguration.FeePercentage'),
      dataIndex: '',
      key: 'feepercentage',
      render: (render: Source) => <p className='fs-14'>
        {render.autoOrderingFee === 1 ? ` ${render.autoOrderingFee}%` : ''}
      </p>
    },
    {
      title: t('AutoOrderingConfiguration.Status'),
      dataIndex: '',
      key: '',
      render: (render: Source) => <p className='fs-14'>
        {getStatus(render.id)}  {newSourcez == 'Enabled' && newSourcez}
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
              dataSource={newSources}
              totalItems={newSources?.length}
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
