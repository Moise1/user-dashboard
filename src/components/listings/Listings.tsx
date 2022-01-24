import { useState, useMemo } from 'react';
import { Layout, Card, Checkbox, Row, Col } from 'antd';
import { TableActionBtns, SearchInput } from '../small-components/TableActionBtns';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { DataTable } from '../tables/DataTable';
import '../../sass/light-theme/listings.scss';
import { listingsData } from '../common/ListingsData';
import { Key } from 'antd/lib/table/interface';
import { PopupModal } from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { AdvancedSearch } from '../small-components/AdvancedSearch';
import { SuccessBtn, CancelBtn } from '../small-components/ActionBtns';


const Listings = () => {
  const [active, setActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  
  const tableColumns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: 'img',
      key: 'img',
      visible: false
    },

    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'itemNo',
      key: 'itemNo',
      visible: true
    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'source',
      key: 'source',
      visible: true
    },

    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: 'title',
      visible: false
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
      visible: true
    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'markup',
      key: 'markup',
      visible: false
    },

    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'stock',
      key: 'stock',
      visible: false
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: 'options',
      visible: false
    }
  ];
  const [columns, setColumns] = useState(tableColumns);

  const onChangeTab = () => setActive(true);

  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handleCheckBox = (e: CheckboxChangeEvent): void => {
    const cloneColumns = columns.map((col) => {
      if (col.key === e.target.value) {
        return { ...col, visible: e.target.checked };
      } else {
        return col;
      }
    });
    setColumns(cloneColumns);
  };

  const handleClose = () => {
    setColumns(tableColumns);
    setOpen(!open);
  };

  const handleApplyChanges = () => setOpen(!open);

  const handleCancelChanges = () => {
    setColumns(tableColumns);
    setOpen(!open);
  };

  const visibleCols = useMemo(() => columns.filter((col) => col.visible === true), [columns]);

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Layout className="listings-container">
      <PopupModal open={open} handleClose={handleClose} width={900}>
        <h5 className="cols-display-title">Select columns to display</h5>
        <p className="description">Display columns in the listing table that suit your interests.</p>
        <Card className="listings-card">
          <Row className="listings-cols">
            <Col>
              <ul className="cols-list">
                {columns.map((col) => (
                  <li key={col.key}>
                    <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
                      {col.title}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </Col>
            <Col>
              <div className="cols-amount">
                <p>Amount of columns on your listings table</p>
                <h3>{visibleCols.length}</h3>
              </div>
            </Col>
          </Row>
          <div className="action-btns">
            <CancelBtn handleClose={handleCancelChanges}>{t('Cancel')}</CancelBtn>
            <SuccessBtn handleClose={handleApplyChanges}>{t('ApplyChanges')}</SuccessBtn>
          </div>
        </Card>
      </PopupModal>
      <StatusBar>
        <StatusBtn title={`${t('ActiveListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('PendingListings')}`} handleClick={onChangeTab} active={active} />
        <StatusBtn title={`${t('TerminatedListings')}`} handleClick={onChangeTab} active={active} />
      </StatusBar>
      <div className="action-components">
        <SearchInput />
        <TableActionBtns showColumns onClick={handleClose} handleSideDrawer={handleSideDrawer} />
      </div>
      <AdvancedSearch title="Advanced Search" placement="right" onClose={handleSideDrawer} visible={drawerOpen}>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
      </AdvancedSearch>
      <DataTable
        columns={visibleCols}
        dataSource={listingsData}
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={listingsData.length}
      />
    </Layout>
  );
};
export default Listings;
