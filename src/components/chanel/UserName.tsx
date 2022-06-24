import { t } from '../../utils/transShim';
import { Input, Form } from 'antd';
import { eShop } from '../../utils/eShop';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { createNewChannel, getShopifyLinkAccount } from 'src/redux/new-channel/newChannelThunk';
import { ConfirmBtn, SuccessBtn } from 'src/small-components/ActionBtns';
import { popupWindow } from './NewChannel';

interface props {
  step: number;
  platform: number;
  storeLocation: number | string | null;
}

export const UserName = (props: props) => {
  const { platform, storeLocation } = props;

  const dispatch = useAppDispatch();
  const {getLinkLoading, newChannelLoading, url} = useAppSelector((state) => state.newChannel);
  const ebayShopIdentifier = 'My_Super_Shop';
  const amazonShopIdentifier = 'MySuperShop';
  const shopifyShopUrl = 'https://myshop.myshopify.com';

  const platformValue = eShop[platform];
  const onFinish = (values: { shopName: string }) => {
    if(platform === 2){
      dispatch(
        getShopifyLinkAccount({data: {
          shop: platform,
          site: storeLocation as number,
          shopName: values.shopName
        }
        })
      );
      return false;
    }

    dispatch(
      createNewChannel({
        isoCountry: storeLocation as number,
        channel: platformValue === 'eBay' ? 3 : 4,
        channelStoreIdentifier: values.shopName
      })
    );
  
  };

  const shopifyLogin = () => {
    if(url) {
      popupWindow(
        url, 
        window, 
        800, 
        600
      );
    }
  };

  return (
    <div className="username-form-container">
      <h5 className="title">
        {' '}
        {t('username-request')} {eShop[platform]} store &apos;s {platform === 2 ? t('shop_url'): t('username')}?
      </h5>
      <p className="ensure-warning">
        {t('ensure-warning')}
        {eShop[platform]}
        <span className="username">{t('username')} </span> {t('notur')}
      </p>
      <Form className="username-form" layout="horizontal" name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item 
          rules={[{ required: true, message: `Please fill in your ${eShop[platform]}'s username` }, { type: 'string' }]} 
          name="shopName"
        >
          <Input
            className="input-field"
            placeholder={platform === 1 ? ebayShopIdentifier : platform === 2 ? shopifyShopUrl : amazonShopIdentifier}
          />
        </Form.Item>
        <ConfirmBtn htmlType="submit" 
          disabled={getLinkLoading || newChannelLoading}>
          {getLinkLoading || newChannelLoading ? 'Please wait...': 'Submit'}
        </ConfirmBtn>
        {platform === 2 && url && <SuccessBtn handleConfirm={shopifyLogin}>Login with Shopify</SuccessBtn>}
      </Form>
    </div>
  );
};
