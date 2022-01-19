import { useState } from 'react';
import { Layout } from 'antd';
import { SearchBars } from '../small-components/SearchBars';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { DataTable } from '../small-components/DataTable';
import '../../sass/light-theme/listings.scss';
import {
  listingsData, 
  // listingsHeadingData
} from '../common/ListingsData';
// import { ListingsTable } from '../tables/ListingsTable';

const Listings = () => {
  const [active, setActive] = useState(false);
  const onChangeTab = () => setActive(true);

  const columns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: 'img',
      key: 'img'

    },

    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'itemNO',
      key: 'itemNo'

    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'source',
      key: 'source'

    },

    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: 'title'

    },


    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },
    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },
    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },
    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },

    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },
    // {
    //   title: t('Listings.Column.Img'),
    //   dataIndex: 'img',
    //   key: 'img'

    // },

  ];

  return (
    <Layout className="listings-container">
      <StatusBar>
        <StatusBtn title={`${t('ActiveListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('PendingListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('TerminatedListings')}`} handleClick={onChangeTab} active={active} />
      </StatusBar>
      <SearchBars showColumns />
      <DataTable columns={columns} dataSource={listingsData}/>
      {/* <ListingsTable bodyData={listingsData} headerData={listingsHeadingData} /> */}
    </Layout>
  );
};
export default Listings;
