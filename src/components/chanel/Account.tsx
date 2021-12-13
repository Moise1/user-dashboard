import { Layout } from 'antd';
import ProgressBar from './ProgressBar';
import MbProgressBar from './MbProgressBar';
import { t } from '../../global/transShim';
import Previousstep from '../SmallComponents/Previousstep';

interface props {
  nextStep: () => void;
  step: number;
  prevStep: () => void;
  platform: platformType;

  handleChangeApi: (newApi: string) => void;
}
export const  Account = (props: props) => {
  const { nextStep, step, prevStep, platform } = props;
  //_handleChangeApi = handleChangeApi
  const Continue = (e: React.MouseEvent) => {
    e.preventDefault();
    nextStep();
  };
  const Previous = (e: React.MouseEvent) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Layout>
      <form>
        <div className="row mx-auto">
          <div className="col-12 my-2 d-block d-xl-none px-0">
            <MbProgressBar platform={platform} step={step} />
          </div>
          <div className="col-xl-8 shade-Channel mb-no-shade bg-white br-8 mt-2">
            <Previousstep Previous={Previous} />
            <div className="row mx-auto px-lg-5 px-md-3">
              <div className="text-center mx-auto col-10 mt-2">
                <h5 className="font-weight-bold">
                  {platform == 'ebay'
                    ? t('doyou') + ' eBay ' + t('acnt') + '?'
                    : platform == 'amazon'
                      ? t('amzseller')
                      : t('shpstor')}
                </h5>
                {platform == 'amazon' ? <i>{t('acntchk')}</i> : ''}
              </div>
              <div className="text-left col-12 col-md-10 mx-auto">
                <h6 className="font-weight-bold w-100">
                  {platform == 'ebay' ? t('noebay') : platform == 'amazon' ? t('noamz') : t('noshop')}
                </h6>
              </div>
              <div className="text-left col-12 col-md-10 mx-auto">
                <div className="">
                  {platform == 'ebay' ? (
                    t('ebayacntslct')
                  ) : platform == 'amazon' ? (
                    t('amznacntslct')
                  ) : (
                    <>
                      {t('nvgt')}
                      <span className="sky">{t('shpweb')}</span> {t('shppara1')}
                      <span className="mt-3"></span>
                      {t('shppara2')}
                    </>
                  )}
                </div>
              </div>
              <div className="text-left col-12 col-md-10 mx-auto my-2">
                <div className="">
                  {platform == 'ebay' ? <>{t('ebay1')}</> : platform == 'shopify' ? t('shppara3') : t('amznpara1')}
                </div>
              </div>
              <div className="text-left col-12 col-md-10 mx-auto">
                <div className="">{platform == 'amazon' ? <>{t('amznpara2')}</> : ''}</div>
              </div>
              <div className="text-left col-12 col-md-10 mx-auto">
                <a>
                  <div className="d-flex align-items-center d-blue">
                    <span className="font-weight-bold">
                      {t('howtobcm')}
                      {platform == 'ebay' ? ' eBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}
                      {t('seller')}
                    </span>
                  </div>
                </a>
              </div>
              <div className="border-bottom mt-2 mb-lg-5  col-11 col-md-9 mx-auto"></div>
              <div className="mx-md-auto ml-auto mt-5 pt-lg-5 mb-2 text-right text-md-center w-100 next-fix">
                <button onClick={Continue} type="submit" className="border-0 d-blue bg-trans mx-auto">
                  <div className="d-flex align-items-center">
                    <span className="font-weight-bold">
                      {platform == 'ebay'
                        ? t('haveebayacnt')
                        : platform == 'amazon'
                          ? t('haveamznacnt')
                          : t('haveshopacnt')}
                    </span>
                    <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 d-xl-block d-none m-auto">
            <ProgressBar platform={platform} step={step} />
          </div>
        </div>
      </form>
    </Layout>
  );
};
