import { useEffect } from 'react';
import { Col, Radio, Row } from 'antd';
import { t } from '../../utils/transShim';
import { ElementEventType } from '../catalog/Catalog';
import { eShop } from 'src/utils/eShop';
import {useAppDispatch} from '../../custom-hooks/reduxCustomHooks';
import { paidHostExtension } from '../../redux/new-channel/newChannelThunk';


interface props {
  handleChangeApi: (newApi: string) => void;
  platform: number;
  api?: string;
  handleChangeExtension: (newExtension: string) => void;
  extension: string;
  step: number;

}

export const AccountConnect = (props: props) => {
  const { 
    handleChangeApi,
    platform, 
    handleChangeExtension, 
    extension,
    api,
  } = props;

  const dispatch = useAppDispatch();
  const onSelectAccount = (e: ElementEventType) => {
    const target = e.currentTarget;
    const selectedApi = target.getAttribute('id');
    handleChangeApi(String(selectedApi));
  };

  const handlePaidExtension = () =>{
    handleChangeExtension('servers');
    dispatch(paidHostExtension());
  };

  useEffect(() => {
    localStorage.setItem('newChannelSuccess', 'false');
  }, [api]);

  // console.log(localStorage.getItem('newChannelSuccess'));
  return (
    <form className="account-connect">
      <h2  className='title'>How do you want HGR to connect to your {eShop[platform]} account?</h2>
      <p className="change-settings">{t('changeset')}</p>
      <Row className="api-type-container" gutter={[0, 0]}>
        {platform === 1 && (
          <Col 
            className="with-api"
            key="1" id="easy" 
            onClick={onSelectAccount} 
            tabIndex={1} 
            xs={24}
            lg={24}
          >
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
          </Col>
        )}

        <Col 
          className="no-api" 
          key="2" id="advance" 
          onClick={onSelectAccount} 
          tabIndex={1} 
          xs={24}
          lg={24}
        >
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
                checked={extension === 'computer' && api === 'advance'}
                onChange={() => handleChangeExtension('computer')}
              />
              <span><strong>{t('runext')}</strong></span>
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
                checked={extension === 'servers' && api === 'advance'}
                onChange={handlePaidExtension}
              />
              <span><strong>{t('extpkg')}</strong></span>
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
        </Col>
      </Row>
    </form>
  );
};
