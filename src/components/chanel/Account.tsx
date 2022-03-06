import { t } from '../../utils/transShim';
import { Link } from 'react-router-dom';

interface props {
  step: number;
  platform: platformType;

  handleChangeApi: (newApi: string) => void;
}
export const Account = (props: props) => {
  const { platform } = props;

  return (
    <form className="account">
      <h5 className="title"> {`Do you have a ${platform} account?`}</h5>
      <h6 className="sub-title">{`No ${platform} store yet? We will happily show you how to get started!`}</h6>
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
      <p className="">
        {platform == 'ebay' ? <>{t('ebay1')}</> : platform == 'shopify' ? t('shppara3') : t('amznpara1')}
      </p>
      <p className="">{platform == 'amazon' ? <>{t('amznpara2')}</> : ''}</p>
      <Link to="/become-a-seller" className="become-seller">
        How to be come a {platform} seller
      </Link>
    </form>
  );
};
