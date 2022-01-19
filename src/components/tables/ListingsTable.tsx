import React, { useState, useMemo } from 'react';
import { Checkbox, Button } from 'antd';
import moment from 'moment';
import { UpdownIcon } from '../common/Icons';
import OrderStateModal from '../modals/OrderStateModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../sass/light-theme/listings.scss';
import { ListingsItems } from '../common/ListingsData';
import { PopupModal } from '../modals/PopupModal';
import { EditSingleListing } from '../listings/EditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface props {
  showModal?: (e: React.MouseEvent) => void;
  headerData: Array<string>;
  bodyData: ListingsItems[];
}

export const ListingsTable = (tableProps: props) => {
  const { headerData, bodyData } = tableProps;
  const [open, setOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [AoDisabledModal, setAoDisabledModal] = useState<boolean>(false);
  const handleSingleListingModal = () => setOpen(!open);

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

  const [data, setData] = useState(modifiedData);
  const updatedData = data;

  const handleAllchecked = (e: CheckboxChangeEvent) => {
    updatedData.forEach((d) => (d.checked = e.target.checked));
    setData([...updatedData]);
    setSelectedItems((prevState) => [...prevState, updatedData.length]);
  };
  const handleItemChecked = (e: CheckboxChangeEvent) => {
    updatedData.forEach((d) => {
      if (d.id === e.target.value) {
        d.checked = e.target.checked;
        setSelectedItems((prevState) => [...prevState, d.id]);
      }
    });
    setData([...updatedData]);
  };
  const handleBulkListingModal = () => {
    setBulkEditOpen(!bulkEditOpen);
  };

  return (
    <div className="listings-table">
      <PopupModal open={open} width={900} handleClose={handleSingleListingModal}>
        <EditSingleListing />
      </PopupModal>

      <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkListingModal}>
        <BulkEditListings selectedItems={selectedItems.length} />
      </PopupModal>

      <Button className="primary-btn" onClick={handleBulkListingModal}>
        Bulk Edit
      </Button>

      <table className="table listings-table mb-0">
        <thead className="listings-table-head">
          <tr>
            <th>
              <label className="select-all-checkbox">
                <Checkbox onChange={handleAllchecked} />
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
          {data.map((dt) => {
            return (
              <tr key={dt.id} className="" data-id={dt.id}>
                <td>
                  <label className="select-all-checkbox">
                    <Checkbox checked={dt.checked} value={dt.id} onChange={handleItemChecked} />
                  </label>
                </td>
                <td>
                  {dt.img}
                </td>
                <td className=" listings-td-none">{dt.itemNo}</td>
                <td className=" listings-td-none">{dt.source}</td>
                <td className="dt-sale-title listings-td-none">{dt.title}</td>
                <td className=" listings-td-none">{dt.sell}</td>
                <td className=" listings-td-none">{dt.cost}</td>
                <td className="">{dt.profit}</td>
                <td className="listings-td-none">{dt.markup}</td>
                <td className="listings-td-none">{dt.stock}</td>
                <td className="  listings-td-none">{dt.created}</td>
                <td className="  listings-td-none options" onClick={handleSingleListingModal}>
                  {dt.options}
                </td>
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
