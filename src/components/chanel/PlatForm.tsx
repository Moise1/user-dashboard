import React from 'react';
import ebay_logo from '../../assets/channel/ebay.png';
import shopify_logo from '../../assets/channel/shopify-2.png';
import amazon_logo from '../../assets/channel/amazon-2.png';
import { ProgressBar } from './ProgressBar';
import { NextBtn} from './NextBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/platform.scss';

export interface values {
  platform?: platformType;
}
export interface props {
  nextStep: () => void;
  handleChangePlatform: (newPlatform: platformType) => void;
  platform: platformType;
  values: values;
  step: number;
}

export const PlatForm = (props: props) => {
  const { nextStep, handleChangePlatform, platform, values, step } = props;
  const Continue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <form className="platforms-form">
      <div className="platforms-area">
        <h5 className="sell-title">{t('liketosell')} ?</h5>
        <div className="cards-container">
          <div className="platforms-card">
            <label>
              <input
                type="radio"
                name="product"
                value="platform"
                className="input"
                checked={platform == 'ebay'}
                onChange={() => handleChangePlatform('ebay')}
              />
              <div className="card-input">
                <img src={ebay_logo} className="platform-img" alt="ebay logo" />
                <div className="description-area">
                  <div className="market-place">{t('mrktplc')}</div>
                  <p>{t('ebayslctd')}</p>
                </div>
              </div>
            </label>
          </div>

          <div className="platforms-card">
            <label>
              <input
                type="radio"
                name="product"
                value={'platform'}
                checked={platform == 'shopify'}
                className="input"
                onChange={() => handleChangePlatform('shopify')}
              />
              <div className="card-input">
                <img src={shopify_logo} className="platform-img" alt="ebay logo" />
                <div className="description-area">
                  <div className="market-place">{t('onwstore')}</div>
                  <p>{t('shopslctd')}</p>
                </div>
              </div>
            </label>
          </div>
          <div className="platforms-card">
            <label>
              <input
                type="radio"
                name="product"
                value={'platform'}
                checked={platform == 'amazon'}
                className="input"
                onChange={() => handleChangePlatform('amazon')}
              />
              <div className="card-input">
                <img src={amazon_logo} className="platform-img" alt="ebay logo" />
                <div className="description-area">
                  <div className="market-place">{t('mrktplc')}</div>
                  <div>{t('amzsltcd')}</div>
                  <p>
                    <i className="amazon-sub">{t('amzsub')}</i>
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <div className="action-area">
          <NextBtn onClick={Continue} disabled={!values.platform} title={t('nxt')} />
          <p className="select-warning">{!values.platform ? t('platchck') : ''}</p>
        </div>
      </div>
      <ProgressBar platform={platform} step={step} />
    </form>
  );
};
