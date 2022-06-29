import { Col, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import catalog_icon from '../../assets/channel/list/Group 2.png';
import manual_icon from '../../assets/channel/list/Group 147.png';
import bulk_icon from '../../assets/channel/list/Group 4.png';
import we_icon from '../../assets/channel/list/Group 148.png';
import { t } from '../../utils/transShim';
import { SuccessBtn } from 'src/small-components/ActionBtns';
import { Link } from 'react-router-dom';
import { Links } from 'src/links';

interface props {
  handleChangeList?: (key: string) => void;
  step: number;
  platform: number;
  list: string;
}

export const ChooseList = (props: props) => {
  const { list } = props;

  return (
    <div className="list-cards-container">
      <h2  className='title'>{t('step5h')}</h2>
      <Row gutter={[5, 16]}>
        <Col className="list-card" xs={10} lg={20}>
          <img src={catalog_icon} alt="icon" className={`${list == 'catalog' ? 'filter-white' : ''}`} />
          <div className="card-info">
            <h5>{t('cata')}</h5>
            <p>
              {t('catapara')}{' '}
              <span className="arrow-container">
                <Link to="/catalog">
                  <ArrowRightOutlined style={{ fontSize: '19px' }} />
                </Link>
              </span>
            </p>
          </div>
        </Col>

        <Col className="list-card" xs={10} lg={20}>
          <img src={manual_icon} alt="icon" />

          <div className="card-info">
            <h5>{t('manual')}</h5>
            <p>
              {t('manualpara')}{' '}
              <span className="arrow-container">
                <Link to="/manual-publish">
                  <ArrowRightOutlined style={{ fontSize: '19px' }} />
                </Link>
              </span>
            </p>
          </div>
        </Col>

        <Col className="list-card" xs={10} lg={20}>
          <img src={bulk_icon} alt="icon" className={`${list == 'bulk' ? 'filter-white' : ''}`} />

          <div className="card-info">
            <h5>{t('bulk')}</h5>
            <p>
              {t('bulkpara')}{' '}
              <span className="arrow-container">
                <Link to="/bulk-publish">
                  <ArrowRightOutlined style={{ fontSize: '19px' }} />
                </Link>
              </span>
            </p>
          </div>
        </Col>

        <Col className="list-card" xs={10} lg={20}>
          <img src={we_icon} alt="icon" />
          <div className="card-info we-list">
            <h5>{t('welist')}</h5>
            <p>
              {t('welistpara')}
              <span className="arrow-container">
                <a href={`${Links.ListingService}`}>
                  <ArrowRightOutlined style={{ fontSize: '19px' }} />
                </a>
              </span>
            </p>
            <SuccessBtn>{t('btnlist')}</SuccessBtn>
          </div>
        </Col>
      </Row>
      <p className="danger-txt">{t('listcheck')}</p>
    </div>
  );
};
