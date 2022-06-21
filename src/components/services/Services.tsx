import { Card } from 'antd';
import '../../sass/services/services.scss';
import { Layout } from 'antd';
import { AllServicesData } from './ServicesData';
import { Link } from 'react-router-dom';

export const Services = () => {
  return (
    <Layout className="services-container">
      <div className="services-content">
        {AllServicesData.map((s) => (
          <Card key={s.id} className="service">
            <div className="img-container">{<img src={s.image} className="service-img" />}</div>
            <div className="card-info">
              <h1 className="service-title">{s.title}</h1>
              <p>{s.shortDescription}</p>
              <Link to={{ pathname: s.link, state: s }}>Read more</Link>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};
