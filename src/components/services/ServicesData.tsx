export interface ServiceData {
  id: number;
  title: string;
  shortDescription: string;
  paragraphs: string[];
  bulletPoints: string[];
  image: string;
  link: string;
  currency?: string;
  price?: string;
}

export const AllServicesData: ServiceData[] = [
  {
    id: 1,
    title: 'Price Warrior',
    shortDescription:
      'Thanks to Price Warrior you will ensure sales like never before, with this tool you will be able to see your competitors prices and make sure you are always offering a more competitive price.',
    paragraphs: [
      'Thanks to Price Warrior you will ensure sales like never before, with this tool you will be able to see your competitors prices and make sure you are always offering a more competitive price.'
    ],
    bulletPoints: [
      'Price Warrior monitors all your listings every day to detect thieves.',
      'It undercuts thieves by a set amount automatically.',
      'Define a minimum markup you are willing to sell at. Price Warrior will never set the price below that markup.',
      'Price Warrior will update automatically, and you will have access to a report showing the status of all the listings being managed by Price Warrior.'
    ],
    image: '/static/media/price_warrior.a2c44660.png',
    link: '/services/price-warrior',
    currency: '€',
    price: '17.99'
  },
  {
    id: 2,
    title: 'Private Supplier',
    shortDescription:
      'Take your drop shipping business to the next level and increase your sales avoiding competition from other sellers.',
    paragraphs: [
      'Take your drop shipping business to the next level and increase your sales avoiding competition from other sellers.',
      'Due to popular demand, we are now offering you the option to have exclusive drop shipping suppliers. This means that you will be the only seller allowed to use that specific supplier via Hustle Got Real.',
      'Other sellers won’t even see the name of your supplier, and you will be able to use Hustle Got Real to list their items and monitor any stock/price changes automatically.',
      'Once you have sent the first payment, the supplier will be available to you within 3 business days.If you are interested in this service, please email contact@hustlegotreal.com, indicating your supplier’s website.'
    ],
    bulletPoints: ['feature 1', 'feature 2', 'feature 3'],
    image: '/static/media/logoHGR.27d62745.png',
    link: '/services/private-supplier',
    currency: '£',
    price: '200'
  },
  {
    id: 3,
    title: 'No API Server',
    shortDescription:
      'Thanks to our non-Api servers your store will be connected 24/7 to our servers so your stock and prices will always be kept up to date.',
    paragraphs: [
      'Thanks to our non-Api servers your store will be connected 24/7 to our servers so your stock and prices will always be kept up to date.'
    ],
    bulletPoints: [
      'eBay store connected 24/7 to update your product information',
      'NO API extension connected to our remote server',
      'Avoid ebay bans'
    ],
    image: 'https://hustlegotreal.com/wp-content/uploads/2021/04/NO-API-SERVER.png',
    link: '/services/no-api-server',
    currency: '€',
    price: '15.99'
  },
  {
    id: 4,
    title: 'Auto Ordering',
    shortDescription:
      'Forget about processing your orders manually. They will now be processed automatically and you will be able to configure and manage your auto ordering settings directly from your HGR account.',
    paragraphs: ['After purchasing the order, it will be marked as dispatched on your store.'],
    bulletPoints: ['feature 1', 'feature 2', 'feature 3'],
    image: 'https://hustlegotreal.com/wp-content/uploads/2021/04/NO-API-SERVER.png',
    link: '/services/auto-ordering',
    currency: '',
    price: ''
  },
  {
    id: 5,
    title: 'VeRo Checker',
    shortDescription:
      'We help Ebay sellers to identify brands participating in the VeRo Program, based on reports from the community.',
    paragraphs: [
      'We help Ebay sellers to identify brands participating in the VeRo Program, based on reports from the community.',
      'Is checking your own VeRo list time consuming every time you list an item? Are you still using excel files to keep track of new brands added to the VeRo list?',
      'Check for brands participating in the Ebay VeRo Program and help the community reporting any new addition from your own experience.'
    ],
    bulletPoints: ['feature 1', 'feature 2', 'feature 3'],
    image:
      'https://lh3.googleusercontent.com/Zgk-AtBUU6Oh-UDi4up49vsdfCN87NdAMOdWBi0jmB6E6DWnm6P0aaabmekWGSv_YskB2UxbiLCbEqiRnd5_MG2rMQ=w128-h128-e365-rj-sc0x00ffffff',
    link: '/services/vero-checker'
  },
  {
    id: 6,
    title: 'Listing Service',
    shortDescription:
      'If you don’t know what products to list, we will choose the best winning products for your store.',
    paragraphs: [
      'If you don’t know what products to list, we will choose the best winning products for your store. We will list them optimising the titles with the best performing keywords so you don’t have to worry about listing at all.'
    ],
    bulletPoints: [
      'Purchase the listing package that you want us to list',
      'You will receive a confirmation email telling you to set up your preferences',
      'Choose your preferences.',
      'Click on Start Listing',
      'The team will process your order and email you as soon as your listings are published.'
    ],
    image: 'https://hustlegotreal.com/wp-content/uploads/2021/04/NO-API-SERVER.png',
    link: '/services/listing-service'
  },
  {
    id: 7,
    title: 'Title Optimization',
    shortDescription:
      'With each token we can optimise one title. We use our algorith to choose the best keyword for your product.',
    paragraphs: [
      'With each token we can optimise one title. We use our algorith to choose the best keyword for your product.'
    ],
    bulletPoints: [
      'Rank higher on eBays search results.',
      'We analyse sold items by category.',
      'Boost your sales.',
      'Get your listings in front of more potential buyers.',
      'Save time, we do the hard work for you.'
    ],
    image: '/static/media/token.3697bb2f.svg',
    link: '/services/title-optimization'
  }
];
