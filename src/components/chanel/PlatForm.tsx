import ebay_logo from '../../assets/channel/ebay.png';
import shopify_logo from '../../assets/channel/shopify-2.png';
import amazon_logo from '../../assets/channel/amazon-2.png';
import { t } from '../../utils/transShim';
import { ElementEventType } from '../catalog/Catalog';

export interface props {
  handleChangePlatform: (newPlatform: number) => void;
  platform: number;
  values?: platformType;
  step: number;
}

export const PlatForm = (props: props) => {
  const { handleChangePlatform } = props;
  
  const onSelectPlatform = (e: ElementEventType) => {
    const target = e.currentTarget;
    const selectedPlatform = String(target.getAttribute('id'));
    handleChangePlatform(parseInt(selectedPlatform));
  };

  return (
    <form className="platforms-form">
      <div className="platforms-area">
        <h5 className="sell-title">{t('liketosell')} ?</h5>
        <div className="cards-container">
          <div className="platform-card" onClick={onSelectPlatform} id='1' tabIndex={1}>
            <img src={ebay_logo} className="platform-img" alt="ebay logo" />
            <div className="description-area">
              <div className="market-place">{t('mrktplc')}</div>
              <p>{t('ebayslctd')}</p>
            </div>
          </div>


          <div className="platform-card" onClick={onSelectPlatform} id='3' tabIndex={3}>
            <img src={amazon_logo} className="platform-img" alt="amazon logo" />
            <div className="description-area">
              <div className="market-place">{t('mrktplc')}</div>
              <p>{t('amzsltcd')}</p>
              <p className="amazon-sub">
                {' '}
                <i>{t('amzsub')}</i>
              </p>
            </div>
          </div>

          <div className="platform-card" onClick={onSelectPlatform} id='2' tabIndex={2}>
            <img src={shopify_logo} className="platform-img" alt="shopify logo" />
            <div className="description-area">
              <div className="market-place">{t('ownStore')}</div>
              <p>{t('shopslctd')}</p>
            </div>
          </div>
          <div className="new-description-area"></div>
        </div>
      </div>
    </form>
  );
};
