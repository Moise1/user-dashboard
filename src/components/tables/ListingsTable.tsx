import { useState } from 'react';
import { UpdownIcon} from '../common/Icons';
import OrderStateModal from '../modals/OrderStateModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../sass/ligth-theme/orders.scss';
import { ListingsItems } from '../common/ListingsData';

interface props {
  tableValue?: boolean;
  setOrderNumber?: (arg0: number) => void;
  showModal?: (e: React.MouseEvent) => void;
  orderSelectedArray?: Array<number>;
  headerData: Array<string>;
  bodyData: ListingsItems[];
}

export const ListingsTable = (tableProps: props) => {
  const { tableValue, setOrderNumber, showModal, orderSelectedArray, headerData, bodyData } = tableProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);
  const handleAllchecked = () => {
    if (setOrderNumber) setOrderNumber(bodyData.length);
  };

  return (
    <div className={`${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive`}>
      <table className="table order-table mb-0">
        <thead className="order-table-head">
          <tr>
            <th>
              <label className="select-all-checkbox">
                <input onChange={handleAllchecked} type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </th>
            {headerData.map((heading) => (
              <th key={heading} className="order-th-none">
                <span className="mr-2"> {t(heading)}</span> <UpdownIcon />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="order-table-body">
          {bodyData.map((obj) => {
            const isSelected = orderSelectedArray?.includes(obj.id);
            return (
              <tr key={obj.id} className="cursor-pointer" data-id={obj.id} onClick={showModal}>
                <td>
                  <label className="select-all-checkbox">
                    <input type="checkbox" checked={isSelected} />
                    <span className="checkmark"></span>
                  </label>
                </td> 
                <td>
                  <img src={obj.img} alt="" />
                </td>
                <td className="obj-sale-body order-td-none">{obj.itemNo}</td>
                <td className="obj-sale-body order-td-none">{obj.source}</td>
                <td className="obj-sale-title order-td-none">{obj.title}</td>
                <td className="obj-sale-qty order-td-none">{ obj.sell}</td>
                <td className="obj-sale-cost  order-td-none">{obj.cost}</td>
                <td className="obj-profit-text">{obj.profit}</td>
                <td className="obj-sale-cost order-td-none">{obj.markup}</td>
                <td className="obj-sale-qty  order-td-none">{obj.created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <OrderStateModal AoDisabledModal={AoDisabledModal} setAoDisabledModal={setAoDisabledModal} />
      <Pagination />
    </div>
  );
};

