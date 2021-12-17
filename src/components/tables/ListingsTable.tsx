import { useState, useMemo } from 'react';
import moment from 'moment';
import { UpdownIcon } from '../common/Icons';
import OrderStateModal from '../modals/OrderStateModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../sass/light-theme/listings.scss';
import { ListingsItems } from '../common/ListingsData';
import { PopupModal } from '../modals/PopupModal';
import { DeleteAccount } from '../listings/DeleteAccount';

interface props {
  setOrderNumber?: (arg0: number) => void;
  showModal?: (e: React.MouseEvent) => void;
  orderSelectedArray?: Array<number>;
  headerData: Array<string>;
  bodyData: ListingsItems[];
}

export const ListingsTable = (tableProps: props) => {
  const { setOrderNumber, orderSelectedArray, headerData, bodyData } = tableProps;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [AoDisabledModal, setAoDisabledModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleCancel = () => setOpenModal(!openModal);
  const handleDelete = () => setOpenModal(!openModal);
  const handleCheck = () => setChecked(!checked);

  const handleAllchecked = () => {
    if (setOrderNumber) setOrderNumber(bodyData.length);
  };

  const modifiedData = useMemo(
    () =>
      bodyData.map((d) => {
        return {
          ...d,
          created: moment(d.created).format('DD/MM/h:mm')
        };
      }),
    []
  );
  return (
    <div className="listings-table">
      <PopupModal open={openModal}>
        <DeleteAccount
          checked={checked}
          handleCheck={handleCheck}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </PopupModal>

      <table className="table listings-table mb-0">
        <thead className="listings-table-head">
          <tr>
            <th>
              <label className="select-all-checkbox">
                <input onChange={handleAllchecked} type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </th>
            {headerData.map((heading) => (
              <th key={heading} className="">
                <span className="mr-2"> {t(heading)}</span> <UpdownIcon />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="listings-table-body">
          {modifiedData.map((obj) => {
            const isSelected = orderSelectedArray?.includes(obj.id);
            return (
              <tr key={obj.id} className="cursor-pointer" data-id={obj.id} onClick={handleOpenModal}>
                <td>
                  <label className="select-all-checkbox">
                    <input type="checkbox" checked={isSelected} />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <img src={obj.img} alt="" />
                </td>
                <td className=" listings-td-none">{obj.itemNo}</td>
                <td className=" listings-td-none">{obj.source}</td>
                <td className="obj-sale-title listings-td-none">{obj.title}</td>
                <td className=" listings-td-none">{obj.sell}</td>
                <td className=" listings-td-none">{obj.cost}</td>
                <td className="">{obj.profit}</td>
                <td className="listings-td-none">{obj.markup}</td>
                <td className="listings-td-none">{obj.stock}</td>
                <td className="  listings-td-none">{obj.created}</td>
                <td className="  listings-td-none">{obj.options}</td>
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
