import { Col, Row } from 'antd';
import ebay_logo from '../../assets/channel/ebay.png';
import shopify_logo from '../../assets/channel/shopify-2.png';
import amazon_logo from '../../assets/channel/amazon-2.png';
import { t } from '../../utils/transShim';
import { ElementEventType } from '../catalog/Catalog';

export interface props {
  handleChangePlatform: (newPlatform: number) => void;
  platform: number;
  step: number;
}

export const PlatForm = (props: props) => {
  const { handleChangePlatform, platform } = props;

  const onSelectPlatform = (e: ElementEventType) => {
    const target = e.currentTarget;
    const selectedPlatform = String(target.getAttribute('id'));
    handleChangePlatform(parseInt(selectedPlatform));
  };
  const mobileScreenSize = window.matchMedia('(max-width: 576px)');

  const eBayPlatform = (
    <div className="description-area">
      <div className="market-place">{t('mrktplc')}</div>
      <p>{t('ebayslctd')}</p>
    </div>
  );

  const shopifyPlatform = (
    <div className="description-area">
      <div className="market-place">{t('ownStore')}</div>
      <p>{t('shopslctd')}</p>
    </div>
  );

  const amazonPlatform = (
    <div className="description-area">
      <div className="market-place">{t('mrktplc')}</div>
      <p>{t('amzsltcd')}</p>
      <p className="amazon-sub">
        {' '}
        <i>{t('amzsub')}</i>
      </p>
    </div>
  );

  const showPlatformInfo = (platform: number) => {
    switch (platform) {
      case 1:
        return eBayPlatform;
      case 2:
        return shopifyPlatform;
      case 3:
        return amazonPlatform;
      default:
        break;
    }
  };

  return (
    <form className="platforms-form">
      <div className="platforms-area">
        <h2 className='title'>{t('liketosell')} ?</h2>
        <Row className="cards-container" gutter={[0, 24]}>
          <Col className="platform-card" md={8} lg={8} onClick={onSelectPlatform} id="1" tabIndex={1}>
            <img src={ebay_logo} className="platform-img" alt="ebay logo" />
            {!mobileScreenSize.matches && (
              <div className="description-area">
                <div className="market-place">{t('mrktplc')}</div>
                <p>{t('ebayslctd')}</p>
              </div>
            )}
          </Col>

          <Col className="platform-card" md={8} lg={8} onClick={onSelectPlatform} id="2" tabIndex={2}>
            <img src={shopify_logo} className="platform-img" alt="shopify logo" />
            {!mobileScreenSize.matches && (
              <div className="description-area">
                <div className="market-place">{t('ownStore')}</div>
                <p>{t('shopslctd')}</p>
              </div>
            )}
          </Col>

          <Col className="platform-card" md={20} lg={20} onClick={onSelectPlatform} id="3" tabIndex={3}>
            <img src={amazon_logo} className="platform-img" alt="amazon logo" />
            {!mobileScreenSize.matches && (
              <div className="description-area">
                <div className="market-place">{t('mrktplc')}</div>
                <p>{t('amzsltcd')}</p>
                <p className="amazon-sub">
                  {' '}
                  <i>{t('amzsub')}</i>
                </p>
              </div>
            )}
          </Col>
          {mobileScreenSize.matches && <div className="platform-info">{showPlatformInfo(platform)}</div>}
          {!platform && <p className="danger-txt">*Please select a store</p>}
        </Row>
      </div>
    </form>
  );
};
