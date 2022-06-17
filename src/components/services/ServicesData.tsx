export interface ServiceData {
  id: number;
  title: string;
  paragraphs: string[];
  image: string;
}

export const AllServicesData: ServiceData[] = [
  {
    id: 1,
    title: 'Price Warrior',
    paragraphs: [
      'Price Warrior monitors all your listings every day to detect thieves. It undercuts thieves by a set amount automatically.',
      'Define a minimum markup you are willing to sell at. Price Warrior will never set the price below that markup.',
      'Price Warrior will update automatically, and you will have access to a report showing the status of all the listings being managed by Price Warrior.'
    ],
    image: '/static/media/price_warrior.a2c44660.png'
  },
  {
    id: 2,
    title: 'Private Supplier',
    paragraphs: [
      'Take your drop shipping business to the next level and increase your sales avoiding competition from other sellers.',
      'Due to popular demand, we are now offering you the option to have exclusive drop shipping suppliers. This means that you will be the only seller allowed to use that specific supplier via Hustle Got Real.',
      'Other sellers won’t even see the name of your supplier, and you will be able to use Hustle Got Real to list their items and monitor any stock/price changes automatically.',
      'Once you have sent the first payment, the supplier will be available to you within 3 business days.If you are interested in this service, please email contact@hustlegotreal.com, indicating your supplier’s website.'
    ],
    image: '/static/media/logoHGR.27d62745.png'
  },
  {
    id: 3,
    title: 'No API Server',
    paragraphs: [
      'eBay store connected 24/7 to update your product information',
      'NO API extension connected to our remote server',
      'Avoid ebay bans'
    ],
    image: 'https://hustlegotreal.com/wp-content/uploads/2021/04/NO-API-SERVER.png'
  }
];
