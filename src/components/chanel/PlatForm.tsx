import { useEffect, useState } from 'react';
import { Row, Col, Radio } from 'antd';
import ebay_logo from '../../assets/channel/ebay.png';
import shopify_logo from '../../assets/channel/shopify-2.png';
import amazon_logo from '../../assets/channel/amazon-2.png';
import { t } from '../../global/transShim';

export interface values {
  platform?: platformType;
}
export interface props {
  handleChangePlatform: (newPlatform: platformType) => void;
  platform: platformType;
  values: values;
  step: number;
}

export const PlatForm = (props: props) => {
  const { handleChangePlatform, platform } = props;
  const [inputs, setInputs] = useState<HTMLInputElement[]>([]);

  useEffect(() => {
    const dt = document.querySelectorAll('.input');
    const arr = [];
    for (const d of dt) {
      arr.push(d as HTMLInputElement);
    }
    setInputs(arr);
  }, []);

  const newDescription = document.querySelector('.new-description-area') as HTMLElement;

  if (inputs[0]?.checked) {
    const newContent = inputs[0].nextSibling?.childNodes[1] as HTMLElement;
    newDescription.innerHTML = newContent.innerHTML;
  }
  if (inputs[1]?.checked) {
    const newContent = inputs[1].nextSibling?.childNodes[1] as HTMLElement;
    newDescription.innerHTML = newContent.innerHTML;
  }
  if (inputs[2]?.checked) {
    const newContent = inputs[2].nextSibling?.childNodes[1] as HTMLElement;
    newDescription.innerHTML = newContent.innerHTML;
  }

  return (
    <form className="platforms-form">
      <div className="platforms-area">
        <h5 className="sell-title">{t('liketosell')} ?</h5>
        <Row className="cards-container" gutter={[26, 0]}>
          <Col className="platforms-card" xs={8} lg={8}>
            <label>
              <Radio
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
          </Col>

          <Col className="platforms-card" xs={8} lg={8}>
            <label>
              <Radio
                name="product"
                value="platform"
                checked={platform == 'shopify'}
                className="input"
                onChange={() => handleChangePlatform('shopify')}
              />
              <div className="card-input">
                <img src={shopify_logo} className="platform-img" alt="shopify logo" />
                <div className="description-area">
                  <div className="market-place">{t('ownStore')}</div>
                  <p>{t('shopslctd')}</p>
                </div>
              </div>
            </label>
          </Col>
          <Col className="platforms-card" xs={8} lg={8}>
            <label>
              <Radio
                name="product"
                value="platform"
                checked={platform == 'amazon'}
                className="input"
                onChange={() => handleChangePlatform('amazon')}
              />
              <div className="card-input">
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
            </label>
          </Col>
          <div className="new-description-area"></div>
        </Row>
      </div>
    </form>
  );
};
