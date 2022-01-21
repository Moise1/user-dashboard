import {  useState } from 'react';
import { Layout, Card, Checkbox } from 'antd';
import { SearchBars } from '../small-components/SearchBars';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { DataTable } from '../tables/DataTable';
import '../../sass/light-theme/listings.scss';
import {listingsData} from '../common/ListingsData';
import { Key } from 'antd/lib/table/interface';
import {PopupModal} from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const Listings = () => {
  const [active, setActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [columns, setColumns] = useState( [
    
    {
      title: t('Listings.Column.Img'),
      dataIndex: 'img',
      key: 'img',
      visible: true    },
  
    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'itemNO',
      key: 'itemNo',
      visible: true  
    },
  
    {
      title: t('Listings.Column.Source'),
      dataIndex: 'source',
      key: 'source',
      visible: true    },
  
    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: 'title',
      visible: true    
    },
  
    {
      title: t('Listings.Column.Sell'),
      dataIndex: 'sell',
      key: 'sell',
      visible: true  
    },
    {
      title: t('Listings.Column.Cost'),
      dataIndex: 'cost',
      key: 'cost',
      visible: true  
    },
    {
      title: t('Listings.Column.Profit'),
      dataIndex: 'profit',
      key: 'profit',
      visible: true    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'markup',
      key: 'markup',
      visible: true    },
  
    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'stock',
      key: 'stock',
      visible: true  
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: 'options',
      visible: true    },
  ]);

  const onChangeTab = () => setActive(true);
  const handleModalOpen = () => setOpen(!open);

  const onSelectChange = (selectedRowKeys: Key[])=>{
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCheckBox = (e: CheckboxChangeEvent): void =>{ 
    const cloneColumns = columns.map(col => {
      if(col.key === e.target.value){
        return {...col, visible: !e.target.checked};
      }else{
        return col;
      }
    });
    setColumns(cloneColumns);
  };
  const newCols = () => columns.filter(col => col.visible === true);

  return (
    <Layout className="listings-container">
      <PopupModal open={open} handleClose={handleModalOpen}>
        <h5 className='cols-hide-title'>Select columns to display</h5>
        <Card className='listings-cols'>
          <ul className='cols-list'>
            {columns.map(col => <li key={col.key}><Checkbox className='checkbox'  value={col.key} onChange={handleCheckBox}>{col.title}</Checkbox></li> )}
          </ul>
        </Card>
      </PopupModal>
      <StatusBar>
        <StatusBtn title={`${t('ActiveListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('PendingListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('TerminatedListings')}`} handleClick={onChangeTab} active={active} />
      </StatusBar>
      <SearchBars showColumns onClick={handleModalOpen}/>
      <DataTable 
        columns={newCols()} 
        dataSource={listingsData} 
        rowSelection={rowSelection} 
        selectedRows={selectedRowKeys.length}
        totalItems={listingsData.length}/>
    </Layout>
  );
};
export default Listings;
