import  { useState } from 'react';
import { Radio } from 'antd';
import { t } from '../../global/transShim';

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
  const { handleChangeApi, platform, api, handleChangeExtension, extension } = props;
  const [, _setEnable] = useState(false); // ignored setEnable
  
  return (
    <form className="account-connect">
      <h5 className="title">
        How do you want HGR to connect to your {platform} account?
      </h5>
      <p className="change-settings">{t('changeset')}</p>
      <div className="with-api">
        <Radio
          type="radio"
          name="product"
          className="card-input-element"
          value={'api'}
          checked={api == 'easy'}
          onChange={() => handleChangeApi('easy')}
        />
        <div>
          <div className="options-label">
            <p>{t('wapi')}</p>
            <p>{t('easy')}</p>
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
      </div>
          
      <div className="no-api">
        <Radio
          name="product"
          className="card-input-element"
          value={'api'}
          checked={api == 'advance'}
          onChange={() => handleChangeApi('advance')}
        />

        <div className="options-label">
          <p>{t('napi')}</p>
          <p className="advance">{t('advnc')}</p>
        </div>
        <div className="content">
          <p>{t('step4para1')} {platform} &apos; s {t('api')}
          </p>
          <div className="computer-extension">
            <Radio
              value={'ext'}
              name="extension"
              checked={extension == 'computer'}
              onChange={() => handleChangeExtension('computer')}
            />
            <span>{t('runext')}</span>
          </div>
          <p><i>{t('oncomputer')} {platform}{t('acnt')}.</i></p>
          <div className="server-extension">
            <Radio
              value={'ext'}
              name="extension"
              checked={extension == 'servers'}
              onChange={() => handleChangeExtension('servers')}
            />
            <span>{t('extpkg')}</span>
          </div>
          <p><i>{t('keeppcon')}</i></p>
          <p className="cause">{t('whyext')}</p>
          <div>
            {platform}
            {t('strictpara')}
            <a href="#"><i>{t('seetut')}</i></a>
          </div>
        </div>
      </div>
    </form>
  );
};
