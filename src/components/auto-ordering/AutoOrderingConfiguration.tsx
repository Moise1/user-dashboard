import { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { t } from '../../utils/transShim';
import { DataTable } from '../tables/DataTable';
import { SearchOptions } from '../../small-components/SearchOptions';
import { saveAutoOrdering, getAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/sources-table.scss';
import '../../sass/popover.scss';

interface rawSettingInterface {
  key: number;
  value: string;
}
export const AutoOrderingConfiguration = () => {
  const [channelOAuthId] = useState(590881);
  const [supplierId] = useState(333);
  const [sourceId] = useState(1);
  const [rawSetting, setRawSetting] = useState<rawSettingInterface[]>([]);
  const dispatch = useAppDispatch();
  const { configureStore, loading } = useAppSelector((state) => state.getAutoOrdering);
  console.log('the rawSetting is ', rawSetting);
  useEffect(() => {
    setRawSetting([
      { key: 1, value: 'false' },
      { key: 5, value: 'test' },
      { key: 6, value: 'testo' },
      { key: 8, value: 'fake' }
    ]);
    dispatch(getAutoOrdering());
    dispatch(saveAutoOrdering({ channelOAuthId, supplierId, sourceId }));
  }, []);

  const columns = [
    {
      title: t('AutoOrderingConfiguration.Supplier'),
      dataIndex: 'markup',
      key: 'markup'
    },
    {
      title: t('AutoOrderingConfiguration.Free'),
      dataIndex: 'monitorStock',
      key: 'monitorStock'
    },
    {
      title: t('AutoOrderingConfiguration.FreePercentage'),
      dataIndex: 'monitorPrice',
      key: 'monitorPrice'
    },
    {
      title: t('AutoOrderingConfiguration.Status'),
      dataIndex: 'monitorDecrease',
      key: 'monitorDecrease'
    }
  ];

  return (
    <Layout className="sources-container">
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="search-options-area">
            <SearchOptions showSearchInput />
          </div>
          <div className="sources-table-container">
            <DataTable columns={columns} dataSource={configureStore} pageSize={6} total={configureStore?.length} />
          </div>
        </>
      )}
    </Layout>
  );
};
