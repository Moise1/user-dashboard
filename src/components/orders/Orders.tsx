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
  const { orders, status, loading } = useAppSelector((state) => state.orders);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [orderNumber] = useState(selectedRecord && selectedRecord);
  const [order, setOrder] = useState<OrderData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData>();
  const [selectedOrders, setSelectedOrders] = useState([]);
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
    const orderList: OrderData[] = orders.orders?.map((l: OrderData) => {
      let item: OrderData = {
        ...l, key: l.id,
        profit: (l.channelPrice * l.quantity + l.channelShipping - l.sourcePrice - l.fees).toFixed(2),
        sourceAOConfigured: orders.sourcesEnabled?.includes(l.sourceId),
        sourceAOEnabled: orders.sourcesEnabled?.includes(l.sourceId)
      }; //Assuming channel and source uses same currency
      //const totalTaxes = (l.channelTax ?? 0) + (l.channelVAT ?? 0) + (l.channelPaymentTaxes ?? 0) + l.fees;
      //l.profit = l.channelPrice * l.quantity + l.channelShipping - l.sourcePrice - totalTaxes;
      //l.sourceAOConfigured = orders.orders.sourcesEnabled.includes(l.sourceId);
      const source = orders.sources[l.sourceId];
      if (source) {
        item = {
          ...item, sourceUrl: 'https://' + source.baseUrl + '/' + l.sourcePath,
          sourceName: source.name,
        };
      }
      return item;
    });
    setOrder(orderList);
  }, [orders]);

  useEffect(() => {
    dispatch(getOrders({ channelOAuthIds: [newChannel as number] }));
  }, [getOrders, newChannel]);

  //eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const onSelectChange = (selectedRowKeys: DataTableKey[], selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys as number[]);
    setSelectedOrders(selectedRows);
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
                data={selectedOrder}
                channelOAuthId={[newChannel]}
                OrderDetailsModalOpen={handleOrderDetailsOpen}
              />
            </PopupModal>
          )}
          <PopupModal open={orderDetailsOpen} width={900} handleClose={handleSingleOrderDetailModal}>
            <OrderDetailsContent data={selectedOrder} OrderContentModalOpen={handleOrderContentOpen} />
          </PopupModal>

          <OrderActionBtns channelOAuthId={[newChannel]} selectedOrderIds={selectedRowKeys} orderList={selectedOrders} />

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
                  console.log(record);
                  setSelectedOrder(record as OrderData);
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