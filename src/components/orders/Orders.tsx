import { useState } from 'react';
import { SearchBars } from '../SmallComponents/SearchBars';
import { OrdersTable } from '../tables/OrdersTable';
import { OrderActionBtns} from './OrderActionBtns';
import { Container } from 'react-bootstrap';
import OrderStateProgressModal from '../modals/OrderStateProgressModal';
import OrderDetailsModal from '../modals/OrderDetailsModal';
import '../../sass/light-theme/orders.scss';

interface props {
  staticValue: boolean;
}

const Orders = (ordersProps: props) => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [show, setShow] = useState(false);
  const { staticValue } = ordersProps;
  const [addressModalShow, setAddressModalShow] = useState(false);
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);

  let orderSelectedArray: Array<number> = [];

  const handleChange = (saveObjectId: number) => {
    if (orderSelectedArray.length > 0) {
      if (orderSelectedArray.filter((order) => order === saveObjectId).length > 0) {
        orderSelectedArray = orderSelectedArray.filter((order) => order !== saveObjectId);
      } else {
        orderSelectedArray.push(saveObjectId);
      }
    } else {
      orderSelectedArray.push(saveObjectId);
    }

    setOrderNumber(orderSelectedArray.length);
  };

  const handleShowModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLInputElement)?.className === 'checkmark') {
      const id = parseInt((e.currentTarget as HTMLInputElement).dataset.id || '0', 10);
      handleChange(id);
      e.preventDefault();
    } else {
      setShow(true);
    }
  };

  const handleCloseAllModals = () => {
    setAddressModalShow(false);
    setOrderDetailsModalShow(false);
    setShow(false);
  };

  return (
    <Container fluid className="orders-container">
      <SearchBars />
      <OrderActionBtns orderNumber={orderNumber} />
      <OrdersTable
        orderSelectedArray={orderSelectedArray}
        tableValue={staticValue}
        setOrderNumber={setOrderNumber}
        showModal={handleShowModal}
      />

      <OrderStateProgressModal
        addressModalShow={addressModalShow}
        setAddressModalShow={setAddressModalShow}
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        orderProgress={1}
        show={show}
        setShow={setShow}
        handleCloseAllModals={handleCloseAllModals}
      />

      <OrderDetailsModal
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        addressModalShow={addressModalShow}
        setAddressModalShow={setAddressModalShow}
        handleCloseAllModals={handleCloseAllModals}
        setShow={setShow}
      />
    </Container>
  );
};

export default Orders;
