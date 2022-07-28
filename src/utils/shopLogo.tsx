import ebay from '../assets/channel/user-shops/ebay.svg';
import ebayNoApi from '../assets/channel/user-shops/ebay-no-api.svg';
import amazon from '../assets/channel/user-shops/amazon.svg';
import shopify from '../assets/channel/user-shops/shopify.svg';

type channelIdType = number | undefined | string | boolean | Date;

export const shopLogo = (channelId: channelIdType, title?: string) => {
  switch (channelId) {
    case 1:
      return <img src={ebay} className='shop-logo' title={title ? title : 'Ebay'} />;
    case 2:
      return <img src={shopify} className='shop-logo' title={title ? title : 'Shopify'} />;
    case 3:
      return <img src={ebayNoApi} className='shop-logo' title={title ? title : 'Ebay No API'} />;
    case 4:
      return <img src={amazon} className='shop-logo' title={title ? title : 'Amazon'} />;
    default:
      break;
  }
};
