import { t } from '../../utils/transShim';
import { Link } from 'react-router-dom';
import { eShop } from 'src/utils/eShop';

interface props {
  step: number;
  platform: number;
  handleChangeApi: (newApi: string) => void;
}
export const Account = (props: props) => {
  const { platform } = props;

  return (
    <form className="account">
      <h5 className="title"> {`Do you have a ${eShop[platform]} account?`}</h5>
      <h6 className="sub-title">{`No ${eShop[platform]}'s store yet? We will happily show you how to get started!`}</h6>
      <div className="">
        {platform == 1 ? (
          t('ebayacntslct')
        ) : platform == 3 ? (
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
        {platform == 1 ? <>{t('ebay1')}</> : platform == 2 ? t('shppara3') : t('amznpara1')}
      </p>
      <p className="">{platform == 3 ? <>{t('amznpara2')}</> : ''}</p>
      <Link to="/become-a-seller" className="become-seller">
        How to be come a {eShop[platform]} seller
      </Link>
    </form>
  );
};
