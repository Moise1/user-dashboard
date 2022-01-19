import { Card } from 'antd';
import '../../sass/light-theme/services.scss';
import serviceImg from '../../assets/services/listing-service.png';
import { Layout } from 'antd';

export const Services = () => {
  const data = [
    {
      id: 1,
      title: 'Auto Ordering',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 2,
      title: 'VeRo Checker',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 3,
      title: 'Price Warrior',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 4,
      title: 'No Api Server',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 5,
      title: 'Private Supplier',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 6,
      title: 'Listing Service',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    },
    {
      id: 7,
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet.',
      readMore: 'Read More'
    }
  ];

  return (
    <Layout className="services-container">
      {data.map((s) => (
        <Card key={s.id} className="service" cover={<img src={serviceImg} className="service-img" />}>
          <div className="card-info">
            <h1 className="service-title">{s.title}</h1>
            <p>{s.description}</p>
            <a href="#">{s.readMore}</a>
          </div>
        </Card>
      ))}
    </Layout>
  );
};
