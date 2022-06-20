import { useState } from 'react';
import { Radio } from 'antd';
import { t } from '../../utils/transShim';
import { ElementEventType } from '../catalog/Catalog';
import { eShop } from 'src/utils/eShop';

interface values {
  extension: string;
  api: string;
}
interface props {
  handleChangeApi: (newApi: string) => void;
  values: values;
  step: number;
  platform: number;
  api?: string;
  handleChangeExtension: (newExtension: string) => void;
  extension: string;
}

export const AccountConnect = (props: props) => {
  const { handleChangeApi, platform, handleChangeExtension, extension } = props;
  const [, _setEnable] = useState(false); // ignored setEnable

  const onSelectAccount = (e: ElementEventType) => {
    const target = e.currentTarget;
    const selectedApi = target.getAttribute('id');
    handleChangeApi(String(selectedApi));
  };

  return (
    <form className="account-connect">
      <h5 className="title">How do you want HGR to connect to your {eShop[platform]} account?</h5>
      <p className="change-settings">{t('changeset')}</p>
      {platform === 1 && (
        <div className="with-api" key="1" id="easy" onClick={onSelectAccount} tabIndex={1}>
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
      )}

      <div className="no-api" key="2" id="advance" onClick={onSelectAccount} tabIndex={1}>
        <div className="options-label">
          <p>{t('napi')}</p>
          <p className="advance">{t('advnc')}</p>
        </div>
        <div className="content">
          <p>
            {t('we-update-txt')} {eShop[platform]} &apos; s {t('api')}
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
          <p>
            <i>
              {t('oncomputer')} {eShop[platform]} {t('account')}.
            </i>
          </p>
          <div className="server-extension">
            <Radio
              value={'ext'}
              name="extension"
              checked={extension == 'servers'}
              onChange={() => handleChangeExtension('servers')}
            />
            <span>{t('extpkg')}</span>
          </div>
          <p>
            <i>{t('keeppcon')}</i>
          </p>
          <p className="cause">{t('whyext')}</p>
          <div>
            {platform}
            {t('strictpara')}
            <a href="#">
              <i>{t('seetut')}</i>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};
