import catalog_icon from '../../assets/channel/list/Group 2.png';
import manual_icon from '../../assets/channel/list/Group 147.png';
import bulk_icon from '../../assets/channel/list/Group 4.png';
import we_icon from '../../assets/channel/list/Group 148.png';
import { t } from '../../utils/transShim';
import { Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../../sass/list-now/list-now.scss';
import { Links } from '../../links';

export interface state {
  platform: platformType;
}

export interface channel {
  id: number;
  channelId: number;
}

export const ListNow = (/*props: props*/) => {
  const history = useHistory();
  const allChannels = JSON.parse(JSON.parse(localStorage.getItem('persist:root') ?? '')['channels'])[
    'channels'
  ] as channel[];
  const selectedChannel = localStorage.getItem('channelId');
  const channel = allChannels.filter(function (data) {
    return data.id.toString() == selectedChannel;
  })[0];
  const weList4u = channel?.channelId != 4;

  const routeChange = (route: string) => {
    history.push(route);
  };

  return (
    <div className="listnow-container">
      <h2 className="title">{t('ListNow.Header')}</h2>
      <div className="choose-list">
        <Row>
          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange(Links.Catalog)}>
              <img src={catalog_icon} alt="icon" className={'w-md-100 filter-white'} />
              <div className="card-info">
                <h5>{t('Catalog.Name')}</h5>
                <p>
                  {t('ListNow.Catalog.Description')}{' '}
                  <span>
                    <a>
                      <ArrowRightOutlined style={{fontSize: '19px'}}/>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange(Links.ManualPublish)}>
              <img src={manual_icon} alt="icon" />

              <div className="card-info">
                <h5>{t('ListNow.ManualListing.Name')}</h5>
                <p>
                  {t('ListNow.ManualListing.Description')}{' '}
                  <span>
                    <a href="#">
                      <ArrowRightOutlined style={{fontSize: '19px'}}/>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange(Links.BulkPublish)}>
              <img src={bulk_icon} alt="icon" className={'w-md-100 filter-white'} />

              <div className="card-info">
                <h5>{t('BulkListing.Name')}</h5>
                <p>
                  {t('ListNow.BulkListing.Description')}{' '}
                  <span>
                    <a href="#">
                      <ArrowRightOutlined style={{fontSize: '19px'}}/>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {weList4u && (
          <Row>
            <Col span={24}>
              <div className="list-card" onClick={() => window.open(Links.ListingService)}>
                <h3 className="title">{t('Listnow.WeListForYou.Title')}</h3>
                <img src={we_icon} alt="icon" />

                <div className="card-info">
                  <h5>{t('WeListForYou.Name')}</h5>
                  <p>
                    {t('Listnow.WeListForYou.Description')}
                    <span>
                      <a href="#">
                        <ArrowRightOutlined style={{fontSize: '19px'}}/>
                      </a>
                    </span>
                  </p>
                  <Button className="success-btn">{t('Listnow.WeListForYou.Button')} </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
