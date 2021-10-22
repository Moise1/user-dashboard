import * as React from 'react';
import { sourceData } from './SourceData';
import ErrorIcon from '../../assets/erroricon.svg';
import InProgressIcon from '../../assets/progressicon.svg';
import { Popover } from 'antd';
import DispatchIcon from '../../assets/dispatchedicon.svg';
import RightCircle from '../../assets/circle-right-green-icon.png';
import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';
import { SelectSupplierContext } from 'src/contexts/SelectSupplierProvider';

interface props {
  tableValue: boolean;
  // setSupplierValue : setSupplierValue: (arg0: boolean) => void;
}

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

function SourcesTable(myProps: props) {
  const { tableValue } = myProps;
  const history = useHistory();
  const { supplierValue, setSupplierValue } = React.useContext(SelectSupplierContext) as ContextType;

  const handleSupplierValue = (value: string) => {
    setSupplierValue(value);
    console.log(supplierValue);
    console.log(value, 'value');
    history.push('/sources-setting');
  };
  return (
    <>
      <div className={` ${tableValue ? 'table-order-responsive' : 'table-with-open-sidebar'} table-responsive  `}>
        <table className="table source-table">
          <thead className="source-table-head">
            <tr>
              <th> {t('SourceTable.Provider')}</th>
              <th className="text-center text-md-left">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.Markup')} </span>{' '}
              </th>
              <th className="text-center text-md-left">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.MonitorStock')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-0 mr-sm-2">{t('SourceTable.MonitorPrice')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.PriceDecrease')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.DecreaseLimit')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.Template')} </span>
              </th>
              <th className="source-th-none">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.ShippingPolicy')}</span>
              </th>
              <th className="text-center text-md-left">
                <Popover
                  placement="right"
                  content={
                    <div className="pop-over-content">
                      <p className="mb-0"> {t('SourceTable.Beta')}</p>
                    </div>
                  }
                >
                  <span className="mr-0 mr-sm-2"> {t('SourceTable.AutoOrdering')} </span>
                </Popover>
              </th>
            </tr>
          </thead>

          {sourceData.map((obj) => {
            const { id, provider, markup, decreaseLimit, template, shippingPolicy, autoOrdering } = obj;
            return (
              <tbody className="order-table-body" key={id}>
                <tr onClick={() => handleSupplierValue(provider)}>
                  <td className="obj-sale-body">{provider}</td>
                  <td className="obj-sale-body text-center text-md-left ">{markup}</td>
                  <td className="obj-sale-title source-td-none">{decreaseLimit}</td>
                  <td className="obj-sale-qty source-td-none">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty    text-center text-md-left">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty  source-td-none ">
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-cost source-td-none  ">{template}</td>
                  <td className="w-12per shipping-policy-text white-space-pre-wrap source-td-none">{shippingPolicy}</td>

                  <td className="w-15per text-center text-md-left">
                    <Popover
                      placement="right"
                      content={
                        <div className="pop-over-content">
                          <p className="mb-0">{autoOrdering === 'Coming Soon' ? 'Not ready' : 'Configure'}</p>
                        </div>
                      }
                    >
                      <button
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

        {/* PAGINATION UI  */}
        <div className="d-flex  mx-4  justify-content-between align-items-start align-items-sm-center py-3">
          <div className="d-flex align-items-center ">
            <p className="table-body-sell listing-table-border w-50px pr-3 mb-0">50</p>
            <p className="table-body-sell listing-table-border w-50px px-3 mb-0">100</p>
            <p className="table-body-sell w-50px pl-3 mb-0">500</p>
          </div>
          <p className="mb-0">
            <span className="pagination-number w-50px px-2">1</span>
            <span className="pagination-number w-50px px-2">2</span>
            <span className="pagination-number w-50px px-2">3</span>
            <span className="pagination-number w-50px pl-2">4</span>
            <span className="pagination-number w-50px ">...</span>
            <span className="pagination-number w-50px px-2">5</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SourcesTable;
