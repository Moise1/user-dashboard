import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';

import {
  // UpdownIcon,
  DustbinDeleteOrderIcon,
  DispatchedOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon,
  ThreeDotsColumnIcon
} from '../common/Icons';
// import ErrorIcon from '../../assets/erroricon.svg';
// import InProgressIcon from '../../assets/progressicon.svg';
// import PasuedIcon from '../../assets/pasuedicon.svg';
// import DispatchIcon from '../../assets/dispatchedicon.svg';
// import AoDisabled from '../../assets/ao-disabled-img.png';
import { Dropdown } from 'react-bootstrap';
import OrderStateModal from '../modals/OrderStateModal';
import { t } from '../../global/transShim';
import Pagination from '../common/Pagination';
import '../../sass/orders.scss';
// import { OrderItems } from '../common/OrderData';
import { orderData } from '../common/OrderData';

interface Props {
  tableValue?: boolean;
  setOrderNumber?: (arg0: number) => void;
  showModal?: (e: React.MouseEvent) => void;
  orderSelectedArray?: Array<number>;
}

export const OrdersTable = (tableProps: Props) => {
  const {setOrderNumber,showModal, orderSelectedArray} = tableProps;
  const [AoDisabledModal, setAoDisabledModal] = useState(false);
  const handleAllchecked = () => {
    if (setOrderNumber) setOrderNumber(orderData.length);
  };

  const data = useMemo(() => orderData, []);

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Item',
        accessor: 'img'
      },
      {
        Header: 'Sale',
        accessor: 'sale'
      },
      {
        Header: 'Source',
        accessor: 'source'
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'QTY',
        accessor: 'qty'
      },
      {
        Header: 'Cost',
        accessor: 'cost'
      },
      {
        Header: 'Fees',
        accessor: 'fees'
      },
      {
        Header: 'Profit',
        accessor: 'profit'
      },
      {
        Header: 'Margin',
        accessor: 'margin'
      },
      {
        Header: 'OrderedOn',
        accessor: 'orderedOn'
      },
      {
        Header: 'State',
        accessor: 'state'
      }
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

  return (
    <div className="table-with-open-sidebar">
      <table className="table order-table mb-0" {...getTableProps()}>
        <thead className="order-table-head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup.headers.map((h) => h.id)}`}>
              <th>
                <label className="select-all-checkbox">
                  <input onChange={handleAllchecked} type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </th>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`${column.id}`}
                  className="order-th-none"
                >
                  <span className="mr-2">{column.render('Header')}</span>
                  <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="order-table-body" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const isSelected = orderSelectedArray?.includes(parseInt(row.id));

            return (
              <tr
                {...row.getRowProps()}
                className="cursor-pointer"
                data-id={`${rows.map((r) => r.id)}`}
                onClick={showModal}
                key={`${rows.map((r) => r.id)}`}
              >
                <td>
                  <label className="select-all-checkbox">
                    <input type="checkbox" checked={isSelected} />
                    <span className="checkmark"></span>
                  </label>
                </td>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={`${row.cells.map((c) => c.value)}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
               
                {/* <td>
                  <button
                    onClick={() => (row.original.state === 'AO Disabled' ? setAoDisabledModal(true) : undefined)}
                    className={`btn btn-state-style ${row.original.state === 'Error' ? 'bg-dark-pink' : ''} ${
                      row.original.state === 'In progress' ? 'in-progress-btn' : ''
                    } ${row.original.state === 'Dispatched' ? 'bg-color-dark-green' : ''} ${
                      row.original.state === 'Paused' ? 'bg-color-light-orange' : ''
                    } ${row.original.state === 'AO Disabled' ? 'ao-disabled-btn-style' : ''} obj-state-text `}
                  >
                    {row.original.state === 'Error' ? <img className="mr-2" src={ErrorIcon} alt="" /> : ''}
                    {row.original.state === 'In progress' ? <img className="mr-2" src={InProgressIcon} alt="" /> : ''}
                    {row.original.state === 'Dispatched' ? <img className="mr-2" src={DispatchIcon} alt="" /> : ''}
                    {row.original.state === 'Paused' ? <img className="mr-2" src={PasuedIcon} alt="" /> : ''}
                    {row.original.state === 'AO Disabled' ? <img className="mr-2" src={AoDisabled} alt="" /> : ''}
                    {row.original.state}
                  </button>
                </td> */}
                <td className="order-three-dots-dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <ThreeDotsColumnIcon />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <ProcessOrderIcon />
                        <span className="ml-2"> {t('OrderDetails.ProcessOrder')}</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span>
                          <HandStopOrderIcon />
                          <span className="ml-2"> {t('OrderDetails.StopOrder')} </span>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <DispatchedOrderIcon />
                        <span className="ml-2"> {t('OrderDetails.MarkAsDispatched')}</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <DustbinDeleteOrderIcon />
                        <span className="ml-2">{t('OrderDetails.DeleteOrder')} </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
