import { t } from '../../utils/transShim';
import { Input, Form } from 'antd';
import { eShop } from '../../utils/eShop';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { createNewChannel } from 'src/redux/new-channel/newChannelThunk';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import { toastAlert } from 'src/utils/toastAlert';
// import { toastAlert } from 'src/utils/toastAlert';

interface props {
  step: number;
  platform: number;
  storeLocation: number | string | null;
  handleNext: () => void;
}

export const UserName = (props: props) => {
  const { platform, storeLocation, handleNext } = props;
  const dispatch = useAppDispatch();
  const { alreadyExists, loading } = useAppSelector((state) => state.newChannel);
  const ebayShopIdentifier = 'My_Super_Shop';
  const amazonShopIdentifier = 'MySuperShop';
  const shopifyShopUrl = 'https://myshop.myshopify.com';

  const platformValue = eShop[platform];
  const onFinish =  (values: { shopName: string }) => {
    dispatch(
      createNewChannel({
        isoCountry: storeLocation as number,
        channel: platformValue === 'eBay' ? 3 : 4,
        channelStoreIdentifier: values.shopName
      })
    );

    if (alreadyExists === false) {
      toastAlert('New Channel successfully created.', 'success');
      handleNext();
    } else {
      toastAlert('This channel name already exists.', 'error');
      return false;
    }
  };

  
  return (
    <div className="username-form-container">
      <h5 className="title">
        {' '}
        {t('username-request')} {eShop[platform]} &apos;s {t('username')}?{' '}
      </h5>
      <p className="ensure-warning">
        {t('ensure-warning')}
        {eShop[platform]}
        <span className="username">{t('username')} </span> {t('notur')}
      </p>
      <Form className="username-form" layout="vertical" name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item rules={[{ required: true, message: 'This field is required' }, { type: 'string' }]} name="shopName">
          <Input
            className="input-field"
            placeholder={platform === 1 ? ebayShopIdentifier : platform === 2 ? shopifyShopUrl : amazonShopIdentifier}
          />
        </Form.Item>
        <ConfirmBtn htmlType="submit" disabled={loading}>{loading ? 'Please wait...': 'Continue'}</ConfirmBtn>
      </Form>
    </div>
  );
};
