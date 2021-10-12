import React from 'react';
import { sourceData } from './SourceData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
// import PasuedIcon from '../../assets/pasuedicon.svg';
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
      <div className={`${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive  `}>
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
                <span className="mr-2"> Auto ordering </span>
              </th>
            </tr>
          </thead>

          {sourceData.map((obj) => {
            return (
              <tbody className="order-table-body" key={obj.id}>
                <tr>
                  <td className="obj-sale-body  ">{obj.provider}</td>
                  <td className="obj-sale-body  ">{obj.markup}</td>
                  <td className="obj-sale-title   ">{obj.decreaseLimit}</td>
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
                  <td className="obj-sale-cost  ">{obj.template}</td>
                  <td className="shipping-policy-text white-space-pre-wrap">{obj.shippingPolicy}</td>

                  <td className="">
                    <button
                      onClick={() => (obj.autoOrdering === 'Enabled' ? history.push('/sources-setting') : null)}
                      className={`${obj.autoOrdering === 'Disabled' ? 'table-disable-button ' : ''} ${
                        obj.autoOrdering === 'Enabled' ? 'table-enabled-button' : ''
                      } ${obj.autoOrdering === 'Coming Soon' ? 'table-coming-soon-button' : ''} `}
                    >
                      {obj.autoOrdering === 'Error' ? <img className="mr-2" src={ErrorIcon} alt="" /> : ''}
                      {obj.autoOrdering === 'In progress' ? <img className="mr-2" src={InProgressIcon} alt="" /> : ''}
                      {obj.autoOrdering === 'Dispatched' ? <img className="mr-2" src={DispatchIcon} alt="" /> : ''}
                      {obj.autoOrdering}
                    </button>
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
