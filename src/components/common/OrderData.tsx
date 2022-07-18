import dataoneimg from '../../assets/data1img.png';

export interface OrderItems {
  id: number;
  img: JSX.Element;
  sale: string;
  qty: number;
  source: string;
  title: string;
  sold: number;
  cost: number;
  fees: number;
  profit: number;
  margin: string;
  orderedOn: Date;
  state: JSX.Element | string;
}

export const orderData: OrderItems[] = [
  {
    id: 1,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 2,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'In progress'
  },
  {
    id: 3,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Dispatched'
  },
  {
    id: 4,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Paused'
  },
  {
    id: 5,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 6,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 7,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 8,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 9,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 10,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  },
  {
    id: 11,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Dispatched'
  },
  {
    id: 12,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'AO Disabled'
  },
  {
    id: 13,
    img: <img src={dataoneimg} alt="Image" />,
    sale: '-',
    source: 'Amazon',
    title: 'Title of the product',
    qty: 1,
    sold: 15.99,
    cost: 12.99,
    fees: 1.0,
    profit: 1.0,
    margin: '-',
    orderedOn: new Date(),
    state: 'Error'
  }
];
