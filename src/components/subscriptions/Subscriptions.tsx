import { Card, Divider } from 'antd';
import '../../sass/light-theme/subscriptions.scss';

export const Subscriptions = () => {
  const data = [
    {
      id: 1,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    },
    {
      id: 2,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    },
    {
      id: 3,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    }
  ];
  return (
    <div className="subscriptions-slider">
      {data.map((d) => (
        <Card key={d.id} className="subscription">
          <p className="listings-count">
            Up to <strong>{d.listingsCount}</strong> listings
          </p>
          <h1 className="monthly-rate">{d.monthlyRate}</h1>
          <Divider />
          <h1 className="monthly-rate">{d.firstDiscount}</h1>
          <Divider />
          <h1 className="monthly-rate">{d.secondDiscount}</h1>
        </Card>
      ))}
    </div>
  );
};
