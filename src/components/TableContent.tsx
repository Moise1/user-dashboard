import img from '../assets/icon.png';
import doticon from '../assets/doticon.svg';
import editicon from '../assets/editicon.svg';
import ListingTable from './table/ListingTable';

type dataKeyType = string | number;

interface iData {
  key: dataKeyType;
  img: JSX.Element;
  item: number;
  src: srcType;
  title: JSX.Element;
  sell: number;
  cost: number;
  profile: number;
  markup: JSX.Element;
  stock: JSX.Element;
  created: JSX.Element;
}

const data: iData[] = [];

for (let i = 0; i < 26; i++) {
  data.push({
    key: i,

    img: <img src={img} height={30} alt="" />,
    item: 1234546789,
    src: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profile: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
    created: (
      <div className="d-flex justify-content-between">
        13/07/2021 12:56
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  });
}

const TableContent = () =>  <ListingTable className="content-table"/>;

export default TableContent;
