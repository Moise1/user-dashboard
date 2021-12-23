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

export const dummyPricingRules = [
  { value: 'Rule 1', id: 1 },
  { value: 'Rule 2', id: 2 },
  { value: 'Rule 3', id: 3 }
];

export interface Users {
  id: number | null;
  value: string | JSX.Element | null;
}
[];

export const dummyUsers: Users[] = [
  { id: 1, value: 'user-one@gmail.com' },
  { id: 2, value: 'user-twoe@gmail.com' },
  { id: 3, value: 'user-three@gmail.com' }
];
