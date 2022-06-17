import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import '../../sass/services/service.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { AllServicesData } from './ServicesData';
import { useState } from 'react';
import { TransparentBtn } from 'src/small-components/ActionBtns';

export const AllServices = () => {
  console.log(AllServicesData);

  const [activeService, setActiveService] = useState(1);

  const [service, setService] = useState(AllServicesData);

  console.log(service);

  const handleChangeService = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementId = e.currentTarget.id;
    setActiveService(JSON.parse(elementId));
    setService([]);
  };

  return (
    <div className="main-container">
      <div className="currencies-container">
        <TransparentBtn id="1" handleClick={handleChangeService}>
          PRICE WARRIOR
        </TransparentBtn>
        <TransparentBtn id="2" handleClick={handleChangeService}>
          PRIVATE SUPPLIER
        </TransparentBtn>
        <TransparentBtn id="3" handleClick={handleChangeService}>
          NO API
        </TransparentBtn>
      </div>
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
                {AllServicesData.map((s) => {
                  if (activeService === 1 && s.id === 1) {
                    return <img src={s.image} />;
                  } else if (activeService === 2 && s.id === 2) return <img src={s.image} />;
                  else if (activeService === 3 && s.id === 3) return <img src={s.image} />;
                })}
              </div>
            </div>
          </Col>

          <Col className="col-services" xs={24} lg={12}>
            <div className="description-area">
              {AllServicesData.map((s) => {
                if (activeService === 1 && s.id === 1) {
                  return <h2 className="service-title">{s.title}</h2>;
                } else if (activeService === 2 && s.id === 2) return <h2 className="service-title">{s.title}</h2>;
                else if (activeService === 3 && s.id === 3) return <h2 className="service-title">{s.title}</h2>;
              })}
              <div className="service-advantages">
                {AllServicesData.map((s) => {
                  if (activeService === 1 && s.id === 1) {
                    return (
                      <>
                        {s.paragraphs.map((x, index) => (
                          <p key={index}> {x} </p>
                        ))}
                      </>
                    );
                  } else if (activeService === 2 && s.id === 2)
                    return (
                      <>
                        {s.paragraphs.map((x, index) => (
                          <p key={index}> {x} </p>
                        ))}
                      </>
                    );
                  else if (activeService === 3 && s.id === 3)
                    return (
                      <ul>
                        {s.paragraphs.map((x, index) => (
                          <li key={index}> {x} </li>
                        ))}
                      </ul>
                    );
                })}
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
