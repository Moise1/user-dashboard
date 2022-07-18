import '../../sass/orders.scss';
import '../../sass/medium-button.scss';
import { useState, useEffect, useContext } from 'react';
import { OrderActionBtns } from './OrderActionBtns';
import { OrderData } from '../../redux/orders/orderSlice';
import { DataTableKey } from '../../small-components/tables/data-table';
import { getOrders } from 'src/redux/orders/orderThunk';
import { PopupModal } from '../modals/PopupModal';
import { BulkEditListings } from '../listings/BulkEditListings';
import { OrderContent } from 'src/small-components/OrderContent';
import { Layout, Spin } from 'antd';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import OrderDetailsContent from 'src/small-components/OrderDetailsContent';
import { AppContext } from '../../contexts/AppContext';
import { ComplexTable } from '../../small-components/tables/complex-table';
import { ColumnsVisibleByDefault } from './orders/active-columns';
import { OrdersColumns } from './orders/columns';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state);
  const { status, loading } = useAppSelector((state) => state.orders);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [orderNumber] = useState(selectedRecord && selectedRecord);
  const [order, setOrder] = useState<OrderData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  //For Modal
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState<boolean>(false);
  const handleBulkOrderModal = () => setBulkEditOpen(!bulkEditOpen);
  const handleSingleOrderModal = () => setSingleEditOpen(!singleEditOpen);
  const handleSingleOrderDetailModal = () => setOrderDetailsOpen(!orderDetailsOpen);

  const handleOrderDetailsOpen = () => {
    handleSingleOrderModal();
    setOrderDetailsOpen(!orderDetailsOpen);
  };

  const handleOrderContentOpen = () => {
    handleSingleOrderModal();
    setOrderDetailsOpen(!orderDetailsOpen);
  };

  const handlePageChange = (currentPage: number) => setCurrentPage(currentPage);

  const { channelId: newChannel } = useContext(AppContext);

  useEffect(() => {
    setOrder(
      orders?.orders.length &&
      orders?.orders.map((item: OrderData): OrderData => ({
        ...item,
        key: item.id,
        profit: item.channelPrice - item.channelPrice - item.fees,
        margin: (item.profit! / item.channelPrice) * 100
      }))
    );
  }, [orders.orders]);

  useEffect(() => {
    dispatch(getOrders({ channelOAuthIds: [newChannel as number] }));
  }, [getOrders, newChannel]);

  const onSelectChange = (selectedRowKeys: DataTableKey[]) => {
    setSelectedRowKeys(selectedRowKeys as number[]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <Layout className="orders-container">
      {loading ? (
        <Spin />
      ) : (
        <>
          {selectedRowKeys.length > 1 ? (
            <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkOrderModal}>
              <BulkEditListings selectedItems={selectedRowKeys.length} />
            </PopupModal>
          ) : (
            <PopupModal open={singleEditOpen} width={900} handleClose={handleSingleOrderModal}>
              <OrderContent
                orderProgress={status}
                data={selectedRecord}
                channelOAuthId={[newChannel]}
                OrderDetailsModalOpen={handleOrderDetailsOpen}
              />
            </PopupModal>
          )}
          <PopupModal open={orderDetailsOpen} width={900} handleClose={handleSingleOrderDetailModal}>
            <OrderDetailsContent data={selectedRecord} OrderContentModalOpen={handleOrderContentOpen} />
          </PopupModal>

          <OrderActionBtns channelOAuthId={[newChannel]} selectedOrderIds={selectedRowKeys} />

          <ComplexTable
            uiIdentifier={'orders'}
            data={order}
            allColumnData={OrdersColumns}
            defaultVisibleColumns={ColumnsVisibleByDefault}
            hideWhenEmpty={false}
            loadingData={loading}
            rowSelection={rowSelection}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  setSelectedRecord(record);
                  handleSingleOrderModal();
                }
              };
            }}
          />
        </>
      )}
    </Layout>
  );
};