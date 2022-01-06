import dataoneimg from '../../assets/data1img.png';
import doticon from '../../assets/doticon.svg';
import editicon from '../../assets/editicon.svg';

export const listingsHeadingData = [
  'Listings.Column.Img',
  'Listings.Column.Item no.',
  'Listings.Column.Source',
  'Listings.Column.Title',
  'Listings.Column.Sell',
  'Listings.Column.Cost',
  'Listings.Column.Profit',
  'Listings.Column.Markup',
  'Listings.Column.Stock',
  'Listings.Column.Created on',
  'Listings.Column.Options'
];

export interface ListingsItems {
  id: number;
  img: string;
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
}

export const listingsData: ListingsItems[] = [
  {
    id: 1,
    img: dataoneimg,
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
    options: (
      <div className="d-flex justify-content-between">
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  },
  {
    id: 2,
    img: dataoneimg,
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
    options: (
      <div className="d-flex justify-content-between">
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  },
  {
    id: 3,
    img: dataoneimg,
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
    options: (
      <div className="d-flex justify-content-between">
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  },
  {
    id: 4,
    img: dataoneimg,
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
    options: (
      <div className="d-flex justify-content-between">
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  },
  {
    id: 5,
    img: dataoneimg,
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
    options: (
      <div className="d-flex justify-content-between">
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  }
];
