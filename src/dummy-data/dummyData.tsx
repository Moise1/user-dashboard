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