import { Card, Row, Col, Divider, Button } from 'antd';
import '../../sass/light-theme/browser-extensions.scss';
import chrome from '../../assets/browser-extensions/chrome-logo.png';
import opera from '../../assets/browser-extensions/opera-logo.png';
import safari from '../../assets/browser-extensions/safari-logo.png';
import noapiext from '../../assets/browser-extensions/noapi-extension.png';
import listingext from '../../assets/browser-extensions/listing-extension.png';
import { Layout } from 'antd';

export const BrowserExtensions = () => {
  const data = [
    {
      id: 1,
      title: 'Listing Extension',
      description: <p className="description">Avaialble for the following browsers</p>,
      img: <img src={listingext} alt="" className="cover-img" />,
      browsers: (
        <div className="browsers">
          <img src={chrome} alt="" />
          <img src={safari} alt="" />
          <img src={opera} alt="" />
        </div>
      ),
      divider: <Divider />,
      installText: <p className="install-text">Install and start selling!</p>,
      installBtn: (
        <Button
          target={'_blank'}
          className="install-btn"
          href="https://chrome.google.com/webstore/detail/lister-by-hustle-got-real/fakikmhjpdbdilplbjipceklhdglocmk?hl=en"
        >
          Install
        </Button>
      ),
      tutorial: (
        <a rel="noreferrer" target={'_blank'} href="https://www.youtube.com/watch?v=P-CjSHtd4mQ" className="tutorial">
          <span>
            Manual Lister tutorial
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </span>
        </a>
      )
    },
    {
      id: 2,
      title: 'Non API Extension',
      img: <img src={noapiext} alt="" className="cover-img" />,
      description: <p className="description">Avaialble for the following browsers</p>,
      browsers: (
        <div className="browsers">
          <img src={chrome} alt="chrome" />
          <img src={safari} alt="safari" />
          <img src={opera} alt="opera" />
        </div>
      ),
      divider: <Divider />,
      installText: <p className="install-text">Install and start monitoring!</p>,
      installBtn: (
        <Button
          target={'_blank'}
          className="install-btn"
          href="https://chrome.google.com/webstore/detail/hgr-non-api/gmdcbkoddgblpnemlconaekpmhgapbcb?hl=en"
        >
          Install
        </Button>
      ),
      tutorial: (
        <a rel="noreferrer" target={'_blank'} href="https://www.youtube.com/watch?v=nAwL1tbiZn0" className="tutorial">
          <span>
            No API tutorial
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </span>
        </a>
      )
    }
  ];
  return (
    <Layout className="browser-extensions-container">
      <div className="browser-extensions">
        <Row className="card-container" gutter={[0, { xs: 16, lg: 0 }]}>
          {data.map((d) => (
            <Col xs={24} sm={12} xl={8} key={d.id}>
              <Card className="card">
                <div className="upper-section">
                  <h6 className="title">{d.title}</h6>
                  {d.img}
                  {d.description}
                  {d.browsers}
                </div>
                <div className="lower-section">
                  {d.divider}
                  {d.installText}
                  {d.installBtn}
                </div>
                <div className="tutorial-section">{d.tutorial}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};
