import React from 'react';
import { sourceData } from './SourceData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import { Popover } from 'antd';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import RightCircle from '../../assets/circle-right-green-icon.png';
import { useHistory } from 'react-router-dom';

interface props {
  tableValue: boolean;
}

function SourcesTable(myProps: props) {
  const { tableValue } = myProps;
  const history = useHistory();

  return (
    <>
      <div className={` ${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive  `}>
        <table className="table source-table">
          <thead className="source-table-head">
            <tr>
              <th>Provider</th>
              <th>
                <span className="mr-2"> Markup </span>{' '}
              </th>
              <th>
                <span className="mr-2"> Monitor Stock </span>
              </th>
              <th>
                <span className="mr-2"> Monitor Price </span>
              </th>
              <th>
                <span className="mr-2"> Price Decrease </span>
              </th>
              <th>
                <span className="mr-2"> Decrease Limit % </span>
              </th>
              <th>
                <span className="mr-2"> Template </span>
              </th>
              <th>
                <span className="mr-2"> Shipping Policy </span>
              </th>
              <th>
                <Popover
                  placement="right"
                  content={
                    <div className="pop-over-content">
                      <p className="mb-0">Beta</p>
                    </div>
                  }
                >
                  <span className="mr-2"> Auto ordering </span>
                </Popover>
              </th>
            </tr>
          </thead>

          {sourceData.map((obj) => {
            const { id, provider, markup, decreaseLimit, template, shippingPolicy, autoOrdering } = obj;
            return (
              <tbody className="order-table-body" key={id}>
                <tr>
                  <td className="obj-sale-body  ">{provider}</td>
                  <td className="obj-sale-body  ">{markup}</td>
                  <td className="obj-sale-title   ">{decreaseLimit}</td>
                  <td className="obj-sale-qty   ">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty   ">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty   ">
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-cost  ">{template}</td>
                  <td className="w-12per shipping-policy-text white-space-pre-wrap">{shippingPolicy}</td>

                  <td className="w-15per">
                    <Popover
                      placement="right"
                      content={
                        <div className="pop-over-content">
                          <p className="mb-0">{autoOrdering === 'Coming Soon' ? 'Not ready' : 'Configure'}</p>
                        </div>
                      }
                    >
                      <button
                        onClick={() => (autoOrdering === 'Enabled' ? history.push('/sources-setting') : null)}
                        className={`  ${autoOrdering === 'Disabled' ? 'table-disable-button ' : ''} ${
                          autoOrdering === 'Enabled' ? 'table-enabled-button' : ''
                        } ${autoOrdering === 'Coming Soon' ? 'table-coming-soon-button' : ''} `}
                      >
                        {autoOrdering === 'Error' ? <img className="mr-2" src={ErrorIcon} alt="" /> : ''}
                        {autoOrdering === 'In progress' ? <img className="mr-2" src={InProgressIcon} alt="" /> : ''}
                        {autoOrdering === 'Dispatched' ? <img className="mr-2" src={DispatchIcon} alt="" /> : ''}
                        {autoOrdering}
                      </button>
                    </Popover>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default SourcesTable;
