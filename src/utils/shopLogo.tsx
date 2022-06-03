import ebay from '../assets/online-shops/ebay.svg';
import ebayNoApi from '../assets/online-shops/ebay-no-api.svg';

import shopify from '../assets/online-shops/shopify.svg';

type channelIdType = number | undefined | string | boolean | Date;

export const shopLogo = (channelId: channelIdType) => {
  switch (channelId) {
  case 1:
    return <img src={ebay} className="shop-logo" title="Ebay" />;
  case 2:
    return <img src={shopify} className="shop-logo" title="Shopify" />;
  case 3:
    return <img src={ebayNoApi} className="shop-logo" title="Ebay No API" />;
  default:
    break;
  }
};
