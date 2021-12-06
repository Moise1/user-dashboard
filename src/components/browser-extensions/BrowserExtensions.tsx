import { Card, Row, Col, Divider, Button } from 'antd';
import '../../sass/light-theme/browser-extensions.scss';
import chrome from '../../assets/browser-extensions/chrome-logo.png';
import opera from '../../assets/browser-extensions/opera-logo.png';
import safari from '../../assets/browser-extensions/safari-logo.png';
import service from '../../assets/services/listing-service.png';

export const BrowserExtensions = () => {
  const data = [
    {
      id: 1,
      title: 'Listing Extension',
      description: <p className="description">Avaialble for the following browsers</p>,
      img: <img src={service} alt="" className="cover-img" />,
      browsers: (
        <div className="browsers">
          <img src={chrome} alt="" />
          <img src={safari} alt="" />
          <img src={opera} alt="" />
        </div>
      ),
      divider: <Divider />,
      installText: <p className="install-text">Install and start selling!</p>,
      installBtn: <Button className="install-btn">Install</Button>,
      tutorial: <p className="tutorial">Manual Lister tutorial</p>

    },
    {
      id: 2,
      title: 'Non API Extension',
      img: <img src={service} alt="" className="cover-img" />,
      description: <p className="description">Avaialble for the following browsers</p>,
      browsers: (
        <div className="browsers">
          <img src={chrome} alt="" />
          <img src={safari} alt="" />
          <img src={opera} alt="" />
        </div>
      ),
      divider: <Divider />,
      installText: 'Install and start monitoring!',
      installBtn: <Button className="install-btn">Install</Button>,
      tutorial: <p className="tutorial">Manual Lister tutorial</p>
    }
  ];
  return (
    <div className="browser-extensions">
      <Row className="card-container" gutter={[32, {xs: 16, lg: 0}]}>
        {data.map((d) => (
          <Col xs={24} sm={8} xl={8} key={d.id}>
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
                {d.tutorial}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
