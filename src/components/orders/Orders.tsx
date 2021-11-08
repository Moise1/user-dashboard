import { useState } from 'react';
import SearchBar from '../SmallComponents/SearchBar';
import OrdersTable from './OrdersTable';
import OrderTypeButtons from './OrderTypeButtons';
import { Container } from 'react-bootstrap';
import '../../css/orders.min.css';

interface props {
  staticValue: boolean;
}

const Orders = (ordersProps: props) => {
  const [orderNumber, setOrderNumber] = useState(0);
  const { staticValue } = ordersProps;
  return (
    <Container fluid className="orders-container">
      <SearchBar className="web-search-bar" />
      <OrderTypeButtons orderNumber={orderNumber} />
      <OrdersTable tableValue={staticValue} setOrderNumber={setOrderNumber} />
    </Container>
  );
};

export default Orders;
