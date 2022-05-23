import { useEffect } from 'react';
import { Layout } from 'antd';
import { t } from '../../utils/transShim';
import { DataTable } from '../tables/DataTable';
import { SearchOptions } from '../../small-components/SearchOptions';
import { getSources } from '../../redux/source-config/sourcesThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/sources-table.scss';
import '../../sass/popover.scss';

export const AutoOrderingConfiguration = () => {
  const dispatch = useAppDispatch();
  const { sources, loading } = useAppSelector((state) => state.sources);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

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
      <div className="search-options-area">
        <SearchOptions showSearchInput />
      </div>
      {loading && 'Please wait a moment...'}
      <div className="sources-table-container">
        <DataTable columns={columns} dataSource={sources} pageSize={6} total={sources?.length} />
      </div>
    </Layout>
  );
};
