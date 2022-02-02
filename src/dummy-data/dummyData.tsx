import light_bulb_one from '../assets/catalog-imgs/light-bulb-1.jpg';
import light_bulb_two from '../assets/catalog-imgs/light-bulb-2.jpg';
import light_bulb_three from '../assets/catalog-imgs/light-bulb-3.jpg';
import light_bulb_four from '../assets/catalog-imgs/light-bulb-4.jpg';


export const dummyData = [
  { value: 'Amazon', id: 101 },
  { value: 'Others', id: 102 },
  { value: 'Ali Express', id: 103 },
  { value: 'First', id: 104 },
  { value: 'Second', id: 105 },
  { value: 'Costo', id: 106 },
  { value: 'Nikola', id: 107 },
  { value: 'Tesla', id: 108 },
  { value: 'Amaozoamsd', id: 109 },
  { value: 'Third', id: 110 }
];


export const dummyUsers = [
  {
    value: 'dad@gmail.com',
    id: 1,
    alias: 'Dad account',
    phone: '(555) 555-5555',
    otp: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
    password: '12345'
  },
  {
    value: 'son@gmail.com',
    id: 2,
    alias: 'Son account',
    phone: '(555) 555-5555',
    otp: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
    password: '12345'
  },
  {
    value: 'uncle@gmail.com',
    id: 3,
    alias: 'Uncle account',
    phone: '(555) 555-5555',
    otp: 'JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG',
    password: '12345'
  }
];

export const dummyDuration = [
  { value: '30 days', id: 1 },
  { value: 'Test policy', id: 2 },
  { value: 'Other test policy', id: 3 }
];

export const dummyDeliver = [
  { value: '30 days', id: 1 },
  { value: 'Test return', id: 2 }
];

export const dummyPricingRulesOptions = [
  { value: 'Rule 1', id: 1 },
  { value: 'Rule 2', id: 2 },
  { value: 'Rule 3', id: 3 }
];

export const dummyPricingRulesData = [
  {
    key: '1',
    source: 'Ali Express',
    priceFrom: 32,
    priceTo: 30,
    markup: 0,
    status: <button className="status-btn">Disabled</button>,
    options: (
      <div className="options">
        <span role="button" onClick={() => alert('Clicked')}>
          <i className="fa fa-trash" aria-hidden="true" />
        </span>
        <span role="button" onClick={() => alert('Clicked')}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </span>
      </div>
    )
  },
  {
    key: '2',
    source: 'Amazon',
    priceFrom: 32,
    priceTo: 30,
    markup: 0,
    status: <button className="status-btn enabled">Enabled</button>,
    options: (
      <div className="options">
        <span role="button" onClick={() => alert('Clicked')}>
          <i className="fa fa-trash" aria-hidden="true" />
        </span>
        <span role="button" onClick={() => alert('Clicked')}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </span>
      </div>
    )
  }
];


export const catalogData = [

  {
    id: 1,
    img: light_bulb_one,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living'
  },
  {
    id: 2,
    img: light_bulb_two,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living'

  },
  {
    id: 3,
    img: light_bulb_three,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living'

  },
  {
    id: 4,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living'

  }

];
