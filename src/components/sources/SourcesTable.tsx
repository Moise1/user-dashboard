import { dataSource } from './SourceData';
import {Link} from 'react-router-dom';
// import ErrorIcon from '../../assets/erroricon.svg';
// import InProgressIcon from '../../assets/progressicon.svg';
// import { Popover } from 'antd';
// import DispatchIcon from '../../assets/dispatchedicon.svg';
// import RightCircle from '../../assets/circle-right-green-icon.png';
// import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';
import { DataTable } from '../tables/DataTable';
import '../../sass/light-theme/sources-table.scss';
import '../../sass/light-theme/popover.scss';

export const SourcesTable = () => {
  // const history = useHistory();
  // const [, setSupplierValue] = useState('Supplier');

  // const handleSupplierValue = (value: string) => {
  //   setSupplierValue(value);
  //   history.push('/sources-setting');
  // };

  const columns = [
    {
      title: t('SourceTable.Provider'),
      dataIndex: 'provider',
      key: 'provider',
      render: (value: string) => <Link to="/sources-setting">{value}</Link>
    },
    {
      title: t('SourceTable.Markup'),
      dataIndex: 'markup',
      key: 'markup',
    },
    {
      title: t('SourceTable.MonitorStock'),
      dataIndex: 'monitorStock',
      key: 'monitorStock',
    },
    {
      title: t('SourceTable.MonitorPrice'),
      dataIndex: 'monitorPrice',
      key: 'monitorPrice',
    },
    {
      title: t('SourceTable.PriceDecrease'),
      dataIndex: 'monitorDecrease',
      key: 'monitorDecrease',
    },
    {
      title: t('SourceTable.DecreaseLimit'),
      dataIndex: 'decreaseLimit',
      key: 'decreaseLimit',
    },
    {
      title: t('SourceTable.Template'),
      dataIndex: 'template',
      key: 'template',
    },
    {
      title: t('SourceTable.ShippingPolicy'),
      dataIndex: 'shippingPolicy',
      key: 'shippingPolicy',
    },
    {
      title: t('SourceTable.ReturnPolicy'),
      dataIndex: 'returnPolicy',
      key: 'returnPolicy',
    }
  ];


  //  const handleRowClick = (record: string, index: number) => e: 
  return (
    <div className="sources-table-container">
      {/* <table className="table sources-table">
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

            <th className="source-th-none">
              <span className="mr-0 mr-sm-2"> {t('SourceTable.ReturnPolicy')}</span>
            </th>

            <th className="source-th-none">
              <span className="mr-0 mr-sm-2"> {t('SourceTable.ItemPostcode')}</span>
            </th>

            <th className="source-th-none">
              <span className="mr-0 mr-sm-2"> {t('SourceTable.ItemCity')}</span>
            </th>

            <th className="source-th-none">
              <span className="mr-0 mr-sm-2"> {t('SourceTable.ItemCountryCode')}</span>
            </th>
          </tr>
        </thead> */}
      {/* 
        {sourceData.map((obj) => {
          const {
            id,
            provider,
            markup,
            autoOrdering,
            decreaseLimit,
            template,
            shippingPolicy,
            returnPolicy,
            itemPostcode,
            itemCity,
            itemCountry
          } = obj;
          return (
            <tbody className="order-table-body" key={id}>
              <tr className="">
                <td className="" onClick={() => handleSupplierValue(provider)}>
                  {provider}
                </td>
                <td className=" text-center text-md-left" onClick={() => handleSupplierValue(provider)}>
                  {markup}
                </td>
                <td className="obj-sale-title source-td-none" onClick={() => handleSupplierValue(provider)}>
                  {decreaseLimit}
                </td>
                <td className=" source-td-none" onClick={() => handleSupplierValue(provider)}>
                  {' '}
                  <img src={RightCircle} alt="RightCircle" />
                </td>
                <td className=" text-center text-md-left" onClick={() => handleSupplierValue(provider)}>
                  {' '}
                  <img src={RightCircle} alt="RightCircle" />
                </td>
                <td className="  source-td-none" onClick={() => handleSupplierValue(provider)}>
                  <img src={RightCircle} alt="RightCircle" />
                </td>
                <td className="source-td-none" onClick={() => handleSupplierValue(provider)}>
                  {template}
                </td>
                <td className="w-12per shipping-policy-text source-td-none">{shippingPolicy}</td>
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
                      onClick={() => (autoOrdering === 'Coming Soon' ? '' : handleSupplierValue(provider))}
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
                <td className="return-policy-text source-td-none">{returnPolicy}</td>
                <td className="item-postcode-text source-td-none">{itemPostcode}</td>
                <td className="item-city-text source-td-none">{itemCity}</td>
                <td className="item-country-text source-td-none">{itemCountry}</td>
              </tr>
            </tbody>
          );
        })}
      </table> */}

      <DataTable columns={columns} dataSource={dataSource} 
      // onRow={() =>{
      //   return {onClick: (e: React.MouseEvent<Element, MouseEvent>) => console.log('CLICKED TABLE ROW', e)};
      // }}
      />
    </div>
  );
};

