import catalog_icon from '../../assets/channel/list/Group 2.png';
import manual_icon from '../../assets/channel/list/Group 147.png';
import bulk_icon from '../../assets/channel/list/Group 4.png';
import we_icon from '../../assets/channel/list/Group 148.png';
import { t } from '../../global/transShim';
import { Button } from 'antd';
import { ArrowRight } from 'react-feather';

export interface chooseListValues {
  platform: platformType;
  storeLocation: string;
  api: string;
  user: string;
  list: string;
  extension: string;
}

interface props {
  handleChangeList?: (key: string) => void;
  values: chooseListValues;
  step: number;
  platform: platformType;
  list: string;
}

export const ChooseList = (props: props) => {
  const { list } = props;

  return (
    <div className="choose-list">
      <h5 className="title">{t('step5h')}</h5>
      <div className="list-card">
        <img src={catalog_icon} alt="icon" className={`w-md-100 ${list == 'catalog' ? 'filter-white' : ''}`} />
        <div className="card-info">
          <h5>{t('cata')}</h5>
          <p>
            {t('catapara')}{' '}
            <span>
              <a href="#">
                <ArrowRight />
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="list-card">
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

      <div className="list-card">
        <img src={bulk_icon} alt="icon" className={`w-md-100 ${list == 'bulk' ? 'filter-white' : ''}`} />

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

      <div className="list-card">
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
      <p className="list-check">{t('listcheck')}</p>
    </div>
  );
};
