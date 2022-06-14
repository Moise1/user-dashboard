import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import '../../sass/services/service.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import Logo from '../../assets/logoHGR.png';

export const PrivateSupplier = () => {
  return (
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
                <img src={Logo}></img>
              </div>
            </div>
          </Col>

          <Col className="col-services" xs={24} lg={12}>
            <div className="description-area">
              <h2 className="service-title">Private Supplier</h2>
              <div className="service-advantages">
                <p>
                  Take your drop shipping business to the next level and increase your sales avoiding competition from
                  other sellers.
                </p>
                <p>
                  Due to popular demand, we are now offering you the option to have exclusive drop shipping suppliers.
                  This means that you will be the only seller allowed to use that specific supplier via Hustle Got Real.
                </p>
                <p>
                  Other sellers won’t even see the name of your supplier, and you will be able to use Hustle Got Real to
                  list their items and monitor any stock/price changes automatically.
                </p>
                <p>
                  Once you have sent the first payment, the supplier will be available to you within 3 business days.If
                  you are interested in this service, please email contact@hustlegotreal.com, indicating your supplier’s
                  website.
                </p>
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
