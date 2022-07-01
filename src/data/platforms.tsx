import { ePlatform } from '../types/ePlatform';
import { eCountry } from '../types/eCountry';

export interface PlatformIndo {
  name: string;//Example: "eBay No Api"
  storeName: string;//Real name, example "eBay"
  domain: { [iso: number]: string };
  itemUrl: string | { [iso: number]: string };
  internalUrl: string | { [iso: number]: string };
  identifierName: string;
  identifierLabel: string | { [iso: number]: string };
  titleLength: number;
  usesAsin: boolean;
  canOptimizeTitle: { [site: number]: boolean };
  canWeListForYou: { [site: number]: boolean };
  isNoApi: boolean;
}

export const Platforms: {
  [id: number]: PlatformIndo
} = {
  [ePlatform.eBay]: {
    name: 'eBay',
    storeName: 'eBay',
    domain: {
      [eCountry.UK]: 'co.uk',
      [eCountry.US]: 'com',
      [eCountry.ES]: 'es',
      [eCountry.DE]: 'de',
      [eCountry.FR]: 'fr',
      [eCountry.AU]: 'com.au',
      [eCountry.IT]: 'it'
    },
    itemUrl: {
      [eCountry.UK]: 'https://www.ebay.co.uk/itm/{id}',
      [eCountry.US]: 'https://www.ebay.com/itm/{id}',
      [eCountry.ES]: 'https://www.ebay.es/itm/{id}',
      [eCountry.DE]: 'https://www.ebay.de/itm/{id}',
      [eCountry.FR]: 'https://www.ebay.fr/itm/{id}',
      [eCountry.AU]: 'https://www.ebay.com.au/itm/{id}',
      [eCountry.IT]: 'https://www.ebay.it/itm/{id}'
    },
    identifierName: 'id',
    identifierLabel: {
      [eCountry.UK]: 'https://www.ebay.co.uk/itm/{id}',
      [eCountry.US]: 'https://www.ebay.com/itm/{id}',
      [eCountry.ES]: 'https://www.ebay.es/itm/{id}',
      [eCountry.DE]: 'https://www.ebay.de/itm/{id}',
      [eCountry.FR]: 'https://www.ebay.fr/itm/{id}',
      [eCountry.AU]: 'https://www.ebay.com.au/itm/{id}',
      [eCountry.IT]: 'https://www.ebay.it/itm/{id}'
    },
    internalUrl: {},
    titleLength: 80,
    usesAsin: false,
    canOptimizeTitle: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    },
    isNoApi: false,
    canWeListForYou: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    }
  },
  [ePlatform.Shopify]: {
    name: 'Shopify',
    storeName: 'Shopify',
    domain: {
      [eCountry.UK]: 'co.uk',
      [eCountry.US]: 'com',
      [eCountry.ES]: 'es',
      [eCountry.DE]: 'de',
      [eCountry.FR]: 'fr',
      [eCountry.AU]: 'com.au',
      [eCountry.IT]: 'it'
    },
    itemUrl: 'https://{shopName}/admin/products/{id}',
    internalUrl: {},
    identifierName: 'id',
    identifierLabel: 'https://{shopName}/admin/products/{id}',
    titleLength: 255,
    usesAsin: false,
    canOptimizeTitle: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    },
    isNoApi: false,
    canWeListForYou: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    }
  },
  [ePlatform.eBayNoApi]: {
    name: 'eBay NO API',
    storeName: 'eBay',
    identifierName: 'id',
    domain: {
      [eCountry.UK]: 'co.uk',
      [eCountry.US]: 'com',
      [eCountry.ES]: 'es',
      [eCountry.DE]: 'de',
      [eCountry.FR]: 'fr',
      [eCountry.AU]: 'com.au',
      [eCountry.IT]: 'it'
    },
    itemUrl: {
      [eCountry.UK]: 'https://www.ebay.co.uk/itm/{id}',
      [eCountry.US]: 'https://www.ebay.com/itm/{id}',
      [eCountry.ES]: 'https://www.ebay.es/itm/{id}',
      [eCountry.DE]: 'https://www.ebay.de/itm/{id}',
      [eCountry.FR]: 'https://www.ebay.fr/itm/{id}',
      [eCountry.AU]: 'https://www.ebay.com.au/itm/{id}',
      [eCountry.IT]: 'https://www.ebay.it/itm/{id}'
    },
    internalUrl: {},
    identifierLabel: {
      [eCountry.UK]: 'https://www.ebay.co.uk/itm/{id}',
      [eCountry.US]: 'https://www.ebay.com/itm/{id}',
      [eCountry.ES]: 'https://www.ebay.es/itm/{id}',
      [eCountry.DE]: 'https://www.ebay.de/itm/{id}',
      [eCountry.FR]: 'https://www.ebay.fr/itm/{id}',
      [eCountry.AU]: 'https://www.ebay.com.au/itm/{id}',
      [eCountry.IT]: 'https://www.ebay.it/itm/{id}'
    },
    titleLength: 80,
    usesAsin: false,
    canOptimizeTitle: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    },
    isNoApi: true,
    canWeListForYou: {
      [eCountry.UK]: true,
      [eCountry.US]: true,
      [eCountry.ES]: true,
      [eCountry.DE]: true,
      [eCountry.FR]: true,
      [eCountry.AU]: true,
      [eCountry.IT]: true
    }
  },
  [ePlatform.Amazon]: {
    name: 'Amazon NO API',
    storeName: 'Amazon',
    identifierName: 'sku',
    domain: {
      [eCountry.UK]: 'co.uk',
      [eCountry.US]: 'com',
      [eCountry.ES]: 'es',
      [eCountry.DE]: 'de',
      [eCountry.FR]: 'fr',
      [eCountry.AU]: 'com.au',
      [eCountry.IT]: 'it'
    },
    itemUrl: {
      [eCountry.UK]: 'https://www.amazon.co.uk/dp/{id}',
      [eCountry.US]: 'https://www.amazon.com/dp/{id}',
      [eCountry.ES]: 'https://www.amazon.es/dp/{id}',
      [eCountry.DE]: 'https://www.amazon.de/dp/{id}',
      [eCountry.FR]: 'https://www.amazon.fr/dp/{id}',
      [eCountry.AU]: 'https://www.amazon.com.au/dp/{id}',
      [eCountry.IT]: 'https://www.amazon.it/dp/{id}'
    },
    internalUrl: {
      [eCountry.UK]: 'https://sellercentral.amazon.co.uk/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.US]: 'https://sellercentral.amazon.com/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.ES]: 'https://sellercentral.amazon.es/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.DE]: 'https://sellercentral.amazon.de/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.FR]: 'https://sellercentral.amazon.fr/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.AU]: 'https://sellercentral.amazon.au/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}',
      [eCountry.IT]: 'https://sellercentral.amazon.it/inventory/ref=xx_invmgr_dnav_xx?asin={asin}&sku={sku}'
    },
    identifierLabel: {
      [eCountry.UK]: 'https://sellercentral.amazon.co.uk',
      [eCountry.US]: 'https://sellercentral.amazon.com',
      [eCountry.ES]: 'https://sellercentral.amazon.es',
      [eCountry.DE]: 'https://sellercentral.amazon.de',
      [eCountry.FR]: 'https://sellercentral.amazon.fr',
      [eCountry.AU]: 'https://sellercentral.amazon.au',
      [eCountry.IT]: 'https://sellercentral.amazon.it'
    },
    titleLength: 500,
    usesAsin: true,
    canOptimizeTitle: {
      [eCountry.UK]: false,
      [eCountry.US]: false,
      [eCountry.ES]: false,
      [eCountry.DE]: false,
      [eCountry.FR]: false,
      [eCountry.AU]: false,
      [eCountry.IT]: false
    },
    isNoApi: true,
    canWeListForYou: {
      [eCountry.UK]: false,
      [eCountry.US]: false,
      [eCountry.ES]: false,
      [eCountry.DE]: false,
      [eCountry.FR]: false,
      [eCountry.AU]: false,
      [eCountry.IT]: false
    }
  }
};