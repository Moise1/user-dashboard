import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { t } from '../../utils/transShim';
import { SimpleTable } from '../tables/SimpleTable';
import { getSources } from '../../redux/source-configuration/sourcesThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { SearchInput } from '../../small-components/TableActionBtns';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import '../../sass/sources-table.scss';
import '../../sass/popover.scss';

export const SourcesConfiuration = () => {
  const dispatch = useAppDispatch();
  const { sources, loading } = useAppSelector((state) => state.sources);
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  const [data, setData] = useState(sources);

  function parentToChild(value: string): void {
    localStorage.setItem('selectedSource', value);
  }

  const onSearch = (value: string) => {
    console.log('search: ' + value);
    const tempData = sources.filter((src: { sourceName: string; }) => src.sourceName.toLowerCase().includes(value.toLowerCase()));
    setData(tempData);
  };

  const columns = [
    {
      title: t('SourceTable.Provider'),
      dataIndex: 'sourceName',
      key: 'sourceName',
      render: (value: string) => (
        <Link to={'/sources-settings/'} onClick={() => parentToChild(value)} className="back-link">
          {value}
        </Link>
      )
    },
    {
      title: t('SourceTable.Markup'),
      dataIndex: 'markup',
      key: 'markup',
    },
    {
      title: t('SourceTable.MonitorStock'),
      dataIndex: 'monitorStock',
      key: 'monitorStock',
      render: (value: boolean) => {
        return value ? <CheckOutlined style={{ fontSize: '19px'}} /> : <CloseOutlined />;
      }
    },
    {
      title: t('SourceTable.MonitorPrice'),
      dataIndex: 'monitorPrice',
      key: 'monitorPrice',
      render: (value: boolean) => {
        return value ? <CheckOutlined style={{ fontSize: '19px'}} /> : '';
      }
    },
    {
      title: t('SourceTable.PriceDecrease'),
      dataIndex: 'monitorPriceDecrease',
      key: 'monitorPriceDecrease',
      render: (value: boolean) => {
        return value ? <CheckOutlined style={{ fontSize: '19px'}} /> : '';
      }
    },
    {
      title: t('SourceTable.DecreaseLimit'),
      dataIndex: 'monitorPriceDecreasePercentage',
      key: 'monitorPriceDecreasePercentage'
    },
    {
      title: t('SourceTable.Template'),
      dataIndex: 'template',
      key: 'template'
    },
    {
      title: t('SourceTable.ShippingPolicy'),
      dataIndex: 'defaultShipping',
      key: 'defaultShipping'
    },
    {
      title: t('SourceTable.ReturnPolicy'),
      dataIndex: 'returns',
      key: 'returns'
    }
  ];

  return (
    <Layout className="sources-container">
      <div className="search-options-area">
        <SearchInput onSearch={onSearch} />
      </div>
      {loading && 'Please wait a moment...'}
      <div className="sources-table-container">
        <SimpleTable
          current={current}
          onChange={setCurrent}
          columns={columns} dataSource={data} pageSize={10} totalItems={sources?.length} />
      </div>
    </Layout>
  );
};
