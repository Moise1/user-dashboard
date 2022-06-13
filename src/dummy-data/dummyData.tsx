import light_bulb_one from '../assets/catalog-imgs/light-bulb-1.jpg';
import light_bulb_two from '../assets/catalog-imgs/light-bulb-2.jpg';
import light_bulb_three from '../assets/catalog-imgs/light-bulb-3.jpg';
import light_bulb_four from '../assets/catalog-imgs/light-bulb-4.jpg';

export interface DummyData {
  [key: string]: string | number;
  value: string;
  id: number;
}
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

// type DumyUserPreview = ;

export const dummyUsers: DummyData[] = [
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

export const dummyDuration: DummyData[] = [
  { value: '30 days', id: 1 },
  { value: 'Test policy', id: 2 },
  { value: 'Other test policy', id: 3 }
];

export const dummyDeliver = [
  { label: '30 days', value: 1 },
  { label: 'Test return', value: 2 }
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

export interface ICatalogData {
  id: number;
  img: string;
  title: string;
  sell: number;
  cost: number;
  profit: number;
  source: string;
  details: JSX.Element;
}
export const catalogData: ICatalogData[] = [
  {
    id: 1,
    img: light_bulb_one,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 2,
    img: light_bulb_two,
    title: 'Lamp 1',
    sell: 49.61,
    // cost: 38.16,
    cost: 40.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 3,
    img: light_bulb_three,
    title: 'Lamp 2',
    sell: 49.61,
    cost: 30.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 4,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 5,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 6,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 7,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 8,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 9,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 10,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 11,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  },
  {
    id: 12,
    img: light_bulb_four,
    title: 'Lamp 1',
    sell: 49.61,
    cost: 38.16,
    profit: 5.45,
    source: 'Lights4Living',
    details: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta reiciendis dolor iure! Quos officiis minus quas
        et cupiditate ipsa, sit laudantium. Dolore autem aperiam inventore laboriosam similique natus corporis provident
        accusantium fuga amet illum, eveniet repellat eius vel explicabo, vero iusto quam mollitia praesentium? Eius,
        numquam excepturi! Facilis dolorum accusantium adipisci deleniti aspernatur repudiandae amet minima natus a
        consequuntur animi, reprehenderit tempora repellat et, exercitationem perferendis ab earum, obcaecati
        voluptates? Repudiandae, iusto! Recusandae ea aut at corporis animi deserunt numquam et labore, impedit nesciunt
        temporibus assumenda dicta, veritatis facilis quas harum, minus expedita aliquam ipsa reprehenderit. A ratione
        vitae eaque!
      </p>
    )
  }
];
