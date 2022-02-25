import { dataSource } from './SourceData';
import { Link } from 'react-router-dom';
import { t } from '../../global/transShim';
import { DataTable } from '../tables/DataTable';
import '../../sass/light-theme/sources-table.scss';
import '../../sass/light-theme/popover.scss';
import { Layout } from 'antd';
import { SearchOptions } from '../small-components/SearchOptions';

export const SourcesTable = () => {
  const columns = [
    {
      title: t('SourceTable.Provider'),
      dataIndex: 'provider',
      key: 'provider',
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
      <div className="sources-table-container">
        <DataTable columns={columns} dataSource={dataSource} />
      </div>
    </Layout>
  );
};
