/*import { useState } from 'react';*/
import catalog_icon from '../../assets/channel/list/Group 2.png';
import manual_icon from '../../assets/channel/list/Group 147.png';
import bulk_icon from '../../assets/channel/list/Group 4.png';
import we_icon from '../../assets/channel/list/Group 148.png';
import { t } from '../../utils/transShim';
import { Button, Row, Col } from 'antd';
import { ArrowRight } from 'react-feather';
import '../../sass/list-now/list-now.scss';
import { useHistory } from 'react-router-dom';

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
  const weList4u = channel.channelId != 4;

  const routeChange = (route: string) => {
    history.push(route);
  };

  return (
    <div className="container">
      <h2 className="title">{t('listnowhead')}</h2>
      <div className="choose-list">
        <Row>
          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange('/catalog')}>
              <img src={catalog_icon} alt="icon" className={'w-md-100 filter-white'} />
              <div className="card-info">
                <h5>{t('cata')}</h5>
                <p>
                  {t('catapara')}{' '}
                  <span>
                    <a>
                      <ArrowRight />
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange('/manual-listing')}>
              <img src={manual_icon} alt="icon" />

              <div className="card-info">
                <h5>{t('manual')}</h5>
                <p>
                  {t('manualpara')}{' '}
                  <span>
                    <a href="#">
                      <ArrowRight />
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col md={8} xs={24}>
            <div className="list-card" onClick={() => routeChange('/bulk-listing')}>
              <img src={bulk_icon} alt="icon" className={'w-md-100 filter-white'} />

              <div className="card-info">
                <h5>{t('bulk')}</h5>
                <p>
                  {t('bulkpara')}{' '}
                  <span>
                    <a href="#">
                      <ArrowRight />
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
              <div className="list-card" onClick={() => window.open('https://hustlegotreal.com/en/listing-service/')}>
                <h3 className="title">{t('list4u')}</h3>
                <img src={we_icon} alt="icon" />

                <div className="card-info">
                  <h5>{t('welist')}</h5>
                  <p>
                    {t('welistpara')}
                    <span>
                      <a href="#">
                        <ArrowRight />
                      </a>
                    </span>
                  </p>
                  <Button className="success-btn">{t('btnlist')} </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
