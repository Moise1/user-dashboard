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
              <th className="text-center">
                <span className="mr-0 mr-sm-2"> {t('SourceTable.Markup')} </span>{' '}
              </th>
              <th className="text-center">
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
              <th className="text-center">
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
                <tr>
                  <td className="obj-sale-body">{provider}</td>
                  <td className="obj-sale-body text-center  ">{markup}</td>
                  <td className="obj-sale-title source-td-none">{decreaseLimit}</td>
                  <td className="obj-sale-qty source-td-none">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty    text-center">
                    {' '}
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-qty  source-td-none ">
                    <img src={RightCircle} alt="RightCircle" />
                  </td>
                  <td className="obj-sale-cost source-td-none  ">{template}</td>
                  <td className="w-12per shipping-policy-text white-space-pre-wrap source-td-none">{shippingPolicy}</td>

                  <td className="w-15per text-center ">
                    <Popover
                      placement="right"
                      content={
                        <div className="pop-over-content">
                          <p className="mb-0">{autoOrdering === 'Coming Soon' ? 'Not ready' : 'Configure'}</p>
                        </div>
                      }
                    >
                      <button
                        onClick={() => handleSupplierValue(provider)}
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
