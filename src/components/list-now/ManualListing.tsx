/*import { useState } from 'react';*/
import { t } from '../../utils/transShim';
import { Row, Col } from 'antd';
import { ArrowRight } from 'react-feather';
import '../../sass/list-now.scss';

export const ManualListing = (/*props: props*/) => {
  return (
    <div className="container">
      <h2 className="title">ManualList</h2>
      <div className="choose-list">
        <Row>
          <Col md={8} xs={24}>
            <div className="list-card">
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
        </Row>
      </div>
    </div>
  );
};
