import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import '../../sass/services/service.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import imgpricewarrior from '../../assets/services/price_warrior.png';

export const PriceWarrior = () => {
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
                <img src={imgpricewarrior}></img>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="description-area">
              <h2 className="service-title">Price Warrior</h2>
              <div className="service-advantages">
                <p>
                  Price Warrior monitors all your listings every day to detect thieves. It undercuts thieves by a set
                  amount automatically.
                </p>
                <ul>
                  <li>
                    Define a minimum markup you are willing to sell at. Price Warrior will never set the price below
                    that markup.
                  </li>
                  <li>
                    Price Warrior will update automatically, and you will have access to a report showing the status of
                    all the listings being managed by Price Warrior.{' '}
                  </li>
                </ul>
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
