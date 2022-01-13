import  { useState } from 'react';
import { t } from '../../global/transShim';
import '../../sass/light-theme/account-connect.scss';

interface values {
  extension: string;
  api: string;
}
interface props {
  handleChangeApi: (newApi: string) => void;
  values: values;
  step: number;
  platform: platformType;
  api: string;
  handleChangeExtension: (newExtension: string) => void;
  extension: string;
}

export const AccountConnect = (props: props) => {
  const { handleChangeApi, values, platform, api, handleChangeExtension, extension } = props;
  const [, _setEnable] = useState(false); // ignored setEnable
  
  return (
    <form className="account-connect">
      <div className="">
        <h5 className="title">
        How do you want HGR to connect to your {platform} account?
        </h5>
        <p className="change-settings">{t('changeset')}</p>
        {platform == 'ebay' ? (
          <div className="col-md-10 mx-auto px-md-3 px-0">
            <label className=" mb-0">
              <input
                type="radio"
                name="product"
                className="card-input-element"
                value={'api'}
                checked={api == 'easy'}
                onChange={() => handleChangeApi('easy')}
              />
              <div
                className={`panel panel-default  card-input   my-1
              ${api == 'easy' ? '' : ''}
              
              `}
              >
                <div className="d-flex justify-content-between">
                  <div className=" font-weight-bold text-dark">{t('wapi')}</div>
                  <div className="text-success">{t('easy')}</div>
                </div>
                <div className="panel-body">
                  <p>We automatically connect to {platform} using their official API.</p>
                  <ul>
                    <li>{t('easier')}</li>
                    <li>{t('automated')}</li>
                    <li>{t('support')}</li>
                  </ul>
                </div>
              </div>
            </label>
          </div>
        ) : (
          ''
        )}
        <div className="col-md-10 mx-auto px-md-3 px-0">
          <label className="">
            <input
              type="radio"
              name="product"
              className="card-input-element"
              value={'api'}
              checked={api == 'advance'}
              onChange={() => handleChangeApi('advance')}
            />

            <div
              className={`panel panel-default  card-input   my-1
                ${api == 'advance' ? '' : ''}
                
                `}
            >
              <div className="d-flex justify-content-between">
                <div className="font-weight-bold text-dark">{t('napi')}</div>
                <div className="">
                  <i>{t('advnc')}</i>
                </div>
              </div>
              <div className="panel-body">
                <div className="mb-md-1">
                  {t('step4para1')}
                  {platform == 'ebay' ? ' eBay’s ' : platform == 'amazon' ? " Amazon's " : " Shopify's "}
                  {t('api')}
                </div>
                <div className="d-flex align-items-center">
                  <input
                    value={'ext'}
                    type="radio"
                    name="extension"
                    checked={extension == 'computer'}
                    onChange={() => handleChangeExtension('computer')}
                    className="w-fit mr-2"
                  />
                  <span className="d-purple">{t('runext')}</span>
                </div>
                <div className="m-1 lh-1">
                  <i>
                    {t('oncomputer')}
                    {platform == 'ebay' ? ' eBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}
                    {t('acnt')}.
                  </i>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    value={'ext'}
                    type="radio"
                    name="extension"
                    checked={extension == 'servers'}
                    className="w-fit mr-2"
                    onChange={() => handleChangeExtension('servers')}
                  />
                  <span className="d-purple">{t('extpkg')}</span>
                </div>
                <div className="m-1 lh-1">
                  <i>{t('keeppcon')}</i>
                </div>
                <div className="font-weight-bold">{t('whyext')}</div>
                <div className="my-1">
                  {platform == 'ebay' ? ' eBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}
                  {t('strictpara')}
                  <i className="purple ml-1">{t('seetut')} </i>
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="mx-auto text-xl-center text-right text-md-center col-12 next-fix">
          <div className="d-block d-md-none w-100 text-center">
            <div
              className={` mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                values.api == '' ? '' : 'd-none'
              } `}
            >
              <i>{t('step4check')}</i>
            </div>
            <div
              className={` mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                values.api == 'advance' && values.extension == '' ? '' : 'd-none'
              } `}
            >
              <i> {t('howextrun')}</i>
            </div>
          </div>
          
          <div className="d-md-block d-none w-100 text-center">
            <div
              className={`small mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                values.api == '' ? '' : 'd-none'
              } `}
            >
              <i>{t('step4check')} </i>
            </div>
            <div
              className={`small mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                values.api == 'advance' && values.extension == '' ? '' : 'd-none'
              } `}
            >
              <i>{t('howextrun')} </i>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
