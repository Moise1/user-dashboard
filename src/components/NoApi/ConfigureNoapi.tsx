import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { RedLogo, GreenLogo } from '../common/Icons';
import '../../sass/no-api/configure-noapi.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';

export const ConfigureNoapi = () => {
  return (
    <div className="main-container">
      <Link to={Links.Dashboard} className="back-to-dashboard">
        <span>
          <LeftOutlined style={{ fontSize: '19px' }} />
        </span>
        Back to dashboard
      </Link>
      <div className="get-started-container">
        <Row className="intro-area">
          <Col className="intro-vid-container" xs={24} md={24} lg={8}>
            <h5 className="how-to-list">
              <strong>How to list your item?</strong>
            </h5>
            <div className="get-started-vid">
              <iframe
                className="intro-vid"
                src={'https://www.youtube.com/embed/P-CjSHtd4mQ'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Col>

          <Col className="description-area" xs={24} lg={12}>
            <p>
              The extension will automatically change its color depending on whether the item has already been listed or
              not.
            </p>
            <ul className="description-list">
              <li className="list-item">
                <GreenLogo />
                <div className="description">
                  <p>
                    <strong>Green</strong>
                  </p>
                  <p>You have not listed this item</p>
                </div>
              </li>
              <li className="list-item">
                <RedLogo />
                <div className="description">
                  <p>
                    <strong>Red</strong>
                  </p>
                  <p>You have already listed this item</p>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
