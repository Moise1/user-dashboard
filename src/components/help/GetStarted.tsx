import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { RedLogo, GreenLogo } from '../common/Icons';
import '../../sass/get-started.scss';
import youtube from '../../assets/social-media/youtube.png';
import instagram from '../../assets/social-media/instagram.png';
import facebook from '../../assets/social-media/facebook.png';
import { LeftOutlined } from '@ant-design/icons';

export const GetStarted = () => {
  return (
    <div className="main-container">
      <Link to="/dashboard" className="back-to-dashboard">
        <span>
          <LeftOutlined style={{fontSize: '19px'}} />
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

        <Row className="updates-area">
          <Col xs={24} className="up-to-date" lg={8}>
            <h5 className="up-to-date-title">
              <strong>Staying-up-to-date</strong>
            </h5>
            <p>
              Join our{' '}
              <span>
                <a className="ebay-location" href="#">
                  eBay UK
                </a>
              </span>{' '}
              or{' '}
              <span>
                <a className="ebay-location" href="#">
                  eBay US{' '}
                </a>
              </span>
              Drop shipping Facebook groups. Subscribe to our YouTube channel to access the latest strategies and
              tutorials and like our Facebook and Instagram accounts.
            </p>
          </Col>

          <Col className="social-media" xs={24} lg={13}>
            <ul className="social-media-list">
              <li className="list-item">
                <img src={facebook} alt="Facebook" className="social-media-icon" />
                <a href="#" className="social-media-link">
                  Like our Facebook pages
                </a>
              </li>
              <li className="list-item">
                <img src={instagram} alt="Instagram" className="social-media-icon" />
                <a href="#" className="social-media-link">
                  Follow us
                </a>
              </li>
              <li className="list-item">
                <img src={youtube} alt="Youtube" className="social-media-icon" />
                <a href="#" className="social-media-link">
                  Subscribe
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="resources">
          <h5 className="resources-title">
            <strong>Resources</strong>
          </h5>
          <ul className="resources-list">
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  UK PostBox
                </a>
              </h6>
              <p>
                Fantastic solution if you don&apos;t to use your home address for your eBay store. They offer email
                scanning, virtual mail forwarding and parcel forwarding services in the UK. Includes UK mailing address
                for personal or business use.
              </p>
            </li>
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  Subivi
                </a>
              </h6>
              <p>
                eBay Customer Support-Made Easy. Increase sales by making sure your customers are always happy. Manage
                your entire customer support cycle in an easy and intuitive way.
              </p>
            </li>
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  OnlineJobs.ph
                </a>
              </h6>
              <p>Scaling up? This is the most popular jobs portal for virtual assistants in Philippines.</p>
            </li>
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  VeRo Checker
                </a>
              </h6>
              <p>
                This extension helps eBay sellers to identify those brands participating in VeRo program, based on
                reports from the community. Our lister extension is integrated with this extension.
              </p>
            </li>
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  Mighty Text
                </a>
              </h6>
              <p>
                It lets you send and receive texts, see incoming calls directly on my computer. You don&apos;t need to
                have mobile phone with you. It is very useful if you want you virtual assistant to have access to
                certain SMS messages.
              </p>
            </li>
            <li className="list-item">
              <h6>
                <a href="#" className="list-item-title">
                  HubStaff
                </a>
              </h6>
              <p>
                Know when and what your employees are working on with this time tracker &amper; employee monitoring.
                Includes screenshots and activity levels.
              </p>
            </li>
          </ul>
        </div>

        <div className="more-help">
          <h4 className="more-help-title">Need more help?</h4>
          <p>
            Email us as{' '}
            <a className="contact-mail" href="mailto:contact@hustlegotreal.com">
              contact@hustlegotreal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
