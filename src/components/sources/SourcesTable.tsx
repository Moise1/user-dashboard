import React from 'react';
import { sourceData } from './SourceData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import { Popover } from 'antd';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import RightCircle from '../../assets/circle-right-green-icon.png';
import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';

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
              <th> {t('SourceTable.Provider')}</th>
              <th>
                <span className="mr-2"> {t('SourceTable.Markup')} </span>{' '}
              </th>
              <th className="source-th-none">
                <span className="mr-2"> {t('SourceTable.MonitorStock')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-2">{t('SourceTable.MonitorPrice')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-2"> {t('SourceTable.PriceDecrease')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-2"> {t('SourceTable.DecreaseLimit')} </span>
              </th>
              <th>
                <span className="mr-2"> {t('SourceTable.Template')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-2"> {t('SourceTable.ShippingPolicy')}</span>
              </th>
              <th>
                <Popover
                  placement="right"
                  content={
                    <div className="pop-over-content">
                      <p className="mb-0"> {t('SourceTable.Beta')}</p>
                    </div>
                  }
                >
                  <span className="mr-2"> {t('SourceTable.AutoOrdering')} </span>
                </Popover>
              </th>
            </tr>
          </thead>

          {sourceData.map((obj) => {
            const { id, provider, markup, decreaseLimit, template, shippingPolicy, autoOrdering } = obj;
            return (
              <tbody className="order-table-body" key={id}>
                <tr>
                  <td className="obj-sale-body">{provider}</td>
                  <td className="obj-sale-body  source-td-none">{markup}</td>
                  <td className="obj-sale-title source-td-none">{decreaseLimit}</td>
                  <td className="obj-sale-qty source-td-none">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty  source-td-none  ">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty   ">
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-cost  ">{template}</td>
                  <td className="w-12per shipping-policy-text white-space-pre-wrap">{shippingPolicy}</td>

                  <td className="w-15per  source-td-none">
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
