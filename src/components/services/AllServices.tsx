import { Link } from 'react-router-dom';
import { Row, Col, Divider, Spin } from 'antd';
import '../../sass/services/service.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { AllServicesData, ServiceData } from './ServicesData';

type LocationProps = {
  location: {
    state: {
      id: number;
      title: string;
      shortDescription: string;
      paragraphs: string[];
      bulletPoints: string[];
      image: string;
      link: string;
    };
    pathname: string;
  };
};

export const AllServices = ({ location }: LocationProps) => {

  const [data, setData] = useState<ServiceData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state == undefined) {
      const newState = AllServicesData.filter((s: ServiceData) => s.link == location.pathname);
      setData(newState[0]);
      setLoading(false);
    }
    else {
      setData(location.state);
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div className="main-container">
      <Link to={Links.Services} className="back-to-services">
        <a>
          <LeftOutlined style={{ fontSize: '19px' }} />
          Back to services
        </a>
      </Link>
      <div className="service-main-container">
        <Row className="service-area">
          <Col className="col-services" xs={24} md={24} lg={8}>
            <div className="service-container">
              <div className="image-container">
                <img src={data?.image} />
              </div>
            </div>
          </Col>

          <Col className="col-services" xs={24} lg={12}>
            <div className="description-area">
              <h2 className="service-title">{data?.title}</h2>
              <div className="service-advantages">
                <div>
                  {data?.paragraphs.map(
                    (
                      x: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
                      index: Key | null | undefined
                    ) => (
                      <p key={index}> {x} </p>
                    )
                  )}

                  <ul>
                    {data?.bulletPoints.map(
                      (
                        x: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
                        index: Key | null | undefined
                      ) => (
                        <li key={index}> {x} </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="service-pricing-container">
                <div className="service-pricing-table">
                  <div className="service-cost">
                    <h4 className="cost-title">Cost of this service</h4>
                  </div>
                  <div className="service-cost-details">
                    <div className="service-rate-container">
                      <div className="rate-details">
                        <span className="euro">€</span>
                        <h1 className="monthly-rate">200</h1>
                      </div>
                      <div className="type-payment">
                        <h4>One off payment</h4>
                      </div>
                      <div className="what-includes">
                        <p>Includes development of the integration with your desired supplier</p>
                      </div>
                    </div>
                    <Divider className="divider" type="vertical" />
                    <div className="service-rate-container">
                      <div className="rate-details">
                        <span className="euro">€</span>
                        <h1 className="monthly-rate">50</h1>
                        <h4 className="frequency">/mo</h4>
                      </div>
                      <div className="type-payment">
                        <h4>Manteinance fee</h4>
                      </div>
                      <div className="what-includes">
                        <p>To ensure that the integration keeps working even if your supplier changes the website.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
