import progress_done from '../../assets/channel/progress.png';
import progress_remain from '../../assets/channel/progress_remain.png';
import progress_remain_dots from '../../assets/channel/progress_remain_dots.png';
import progress_done_dots from '../../assets/channel/progress_done_dots.png';
import { t } from '../../utils/transShim';
import '../../sass/progress-bar.scss';

interface props {
  step: number;
  platform: number;
}

export const ProgressBar = (props: props) => {
  return (
    <div className="channel-progress-bar">
      <div className="col-10 mx-auto">
        <div className="d-flex align-items-center">
          <img height="30" src={progress_done} alt="progress" />{' '}
          <div className={` ${props.step > 1 ? 'text-success' : ''} font-weight-bold m-auto`}>{t('bar1')}</div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img src={` ${props.step > 1 ? progress_done_dots : progress_remain_dots} `} alt="" />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img height="30" src={` ${props.step > 1 ? progress_done : progress_remain} `} alt="progress" />{' '}
          <div className={` ${props.step > 2 ? 'text-success' : ''} font-weight-bold m-auto`}>{t('bar2')}</div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img src={` ${props.step > 2 ? progress_done_dots : progress_remain_dots} `} alt="" />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img height="30" src={` ${props.step > 2 ? progress_done : progress_remain} `} alt="progress" />{' '}
          <div className={` ${props.step > 3 ? 'text-success' : ''} font-weight-bold m-auto`}>
            {props.platform === 1
              ? ' Ebay '
              : props.platform === 3
                ? ' Amazon '
                : props.platform === 2
                  ? ' Shopify '
                  : 'Ebay '}
            {t('acnt')}
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img src={` ${props.step > 3 ? progress_done_dots : progress_remain_dots} `} alt="" />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img height="30" src={` ${props.step > 3 ? progress_done : progress_remain} `} alt="progress" />
          <div className={` ${props.step > 4 ? 'text-success' : ''} font-weight-bold m-auto`}>{t('bar3')}</div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img src={` ${props.step > 4 ? progress_done_dots : progress_remain_dots} `} alt="" />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img height="30" src={` ${props.step > 4 ? progress_done : progress_remain} `} alt="progress" />

          <div className={` ${props.step > 5 ? 'text-success' : ''} font-weight-bold m-auto`}>
            {t('lnk')}
            {props.platform === 1 ? ' Ebay ' : props.platform === 3 ? ' Amazon ' : ' Shopify '} {t('acnt')}
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img src={` ${props.step > 5 ? progress_done_dots : progress_remain_dots} `} alt="" />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img height="30" src={` ${props.step > 5 ? progress_done : progress_remain} `} alt="progress" />{' '}
          <div className={` ${props.step > 6 ? 'text-success' : ''} font-weight-bold m-auto`}>{t('lstopt')}</div>
        </div>
      </div>
    </div>
  );
};
