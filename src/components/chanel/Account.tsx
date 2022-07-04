import { t } from '../../utils/transShim';
import { Link } from 'react-router-dom';
import { eShop } from 'src/utils/eShop';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import { Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

interface props {
  step: number;
  platform: number;
  handleChangeApi: (newApi: string) => void;
  handleNext: () => void;
}
export const Account = (props: props) => {
  const { platform, handleNext } = props;

  return (
    <div className="have-account">
      <h2 className="title"> {`Do you have a ${eShop[platform]} account?`}</h2>
      <ConfirmBtn handleConfirm={handleNext}>Yes I am a seller on {eShop[platform]}</ConfirmBtn>
      <p className="sub-title">{`No ${eShop[platform]}'s store yet? We will happily show you how to get started!`}</p>
      <div className="">
        {platform == 1 ? (
          <p className="sub-title">{t('ebayacntslct')}</p>
        ) : platform == 3 ? (
          <p className="sub-title">{t('amznacntslct')}</p>
        ) : (
          <>
            {t('nvgt')}
            <span className="sky">{t('shpweb')}</span> {t('shppara1')}
            <span className="mt-3"></span>
            {t('shppara2')}
          </>
        )}
      </div>
      <p className="">{platform == 1 ? <>{t('ebay1')}</> : platform == 2 ? t('shppara3') : t('amznpara1')}</p>
      <p className="">{platform == 3 ? <>{t('amznpara2')}</> : ''}</p>
      <Link to="/become-a-seller" className="alternative-link become-seller">
        How to be come a {eShop[platform]} seller
        <ArrowRightOutlined />
      </Link>
      <Divider />
    </div>
  );
};
