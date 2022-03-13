import {useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { t } from '../../utils/transShim';
import { DataTable } from '../tables/DataTable';
import { SearchOptions } from '../small-components/SearchOptions';
import {getSources} from '../../redux/source-config/sourcesThunk';
import {useAppDispatch, useAppSelector} from '../../custom-hooks/reduxCustomHooks';
import {AppContext} from '../../contexts/AppContext';
import '../../sass/sources-table.scss';
import '../../sass/popover.scss';

export const SourcesTable = () => {
  const dispatch = useAppDispatch();
  const { sources, loading } = useAppSelector((state) => state.sources);
  const {channelId} = useContext(AppContext);
  
  useEffect(() => {
    dispatch(getSources());
  }, [getSources, channelId]);
  
  const columns = [
    {
      title: t('SourceTable.Provider'),
      dataIndex: 'sourceName',
      key: 'sourceName',
      render: (value: string) => (
        <Link to="/sources-settings" className="back-link">
          {value}
        </Link>
      )
    },
    {
      title: t('SourceTable.Markup'),
      dataIndex: 'markup',
      key: 'markup'
    },
    {
      title: t('SourceTable.MonitorStock'),
      dataIndex: 'monitorStock',
      key: 'monitorStock'
    },
    {
      title: t('SourceTable.MonitorPrice'),
      dataIndex: 'monitorPrice',
      key: 'monitorPrice'
    },
    {
      title: t('SourceTable.PriceDecrease'),
      dataIndex: 'monitorDecrease',
      key: 'monitorDecrease'
    },
    {
      title: t('SourceTable.DecreaseLimit'),
      dataIndex: 'decreaseLimit',
      key: 'decreaseLimit'
    },
    {
      title: t('SourceTable.Template'),
      dataIndex: 'template',
      key: 'template'
    },
    {
      title: t('SourceTable.ShippingPolicy'),
      dataIndex: 'shippingPolicy',
      key: 'shippingPolicy'
    },
    {
      title: t('SourceTable.ReturnPolicy'),
      dataIndex: 'returnPolicy',
      key: 'returnPolicy'
    }
  ];

  return (
    <Layout className="sources-container">
      <div className="search-options-area">
        <SearchOptions showSearchInput />
      </div>
      {loading && 'Please wait a moment...'}
      <div className="sources-table-container">
        <DataTable columns={columns} dataSource={sources} />
      </div>
    </Layout>
  );
};
