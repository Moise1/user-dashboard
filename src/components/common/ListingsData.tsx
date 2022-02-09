import dataoneimg from '../../assets/data1img.png';
import { MoreVertical } from 'react-feather';

export interface ListingsItems {
  id: number;
  key: string;
  img: JSX.Element;
  itemNo: number;
  source: string;
  title: JSX.Element;
  sell: number;
  cost: number;
  profit: number;
  markup: JSX.Element;
  stock: JSX.Element;
  created: Date;
  options: JSX.Element;
  checked: boolean;
}

export const listingsData: ListingsItems[] = [
  {
    id: 1,
    key: '1',
    img: <img src={dataoneimg} />,
    itemNo: 1234546789,
    source: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profit: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: new Date(),
    options: <MoreVertical />,
    checked: false
  },
  {
    id: 2,
    key: '2',
    img: <img src={dataoneimg} />,
    itemNo: 1234546789,
    source: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profit: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: new Date(),
    options: <MoreVertical />,
    checked: false
  },
  {
    id: 3,
    key: '3',
    img: <img src={dataoneimg} />,
    itemNo: 1234546789,
    source: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profit: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: new Date(),
    options: <MoreVertical />,
    checked: false
  },
  {
    id: 4,
    key: '4',
    img: <img src={dataoneimg} />,
    itemNo: 1234546789,
    source: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profit: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: new Date(),
    options: <MoreVertical />,
    checked: false
  },
  {
    id: 5,
    key: '5',
    img: <img src={dataoneimg} />,
    itemNo: 1234546789,
    source: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profit: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: new Date(),
    options: <MoreVertical />,
    checked: false
  }
];
