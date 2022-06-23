import { t } from '../../utils/transShim';
import { Input, Form } from 'antd';
import { eShop } from '../../utils/eShop';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { createNewChannel } from 'src/redux/new-channel/newChannelThunk';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import { popupWindow } from './NewChannel';
// import { useState } from 'react';

interface props {
  step: number;
  platform: number;
  storeLocation: number | string | null;
}

export const UserName = (props: props) => {
  const { platform, storeLocation } = props;
  // const [shopName, setShopName] = useState<string>('');

  const dispatch = useAppDispatch();
  const {getLinkLoading, newChannelLoading} = useAppSelector((state) => state.newChannel);
  const ebayShopIdentifier = 'My_Super_Shop';
  const amazonShopIdentifier = 'MySuperShop';
  const shopifyShopUrl = 'https://myshop.myshopify.com';

  const platformValue = eShop[platform];
  const onFinish =  (values: { shopName: string }) => {
    if(platform === 2){
      popupWindow(
        `${values.shopName}/admin/auth/login`, 
        window, 
        800, 
        600
      );
      return;
    }
    dispatch(
      createNewChannel({
        isoCountry: storeLocation as number,
        channel: platformValue === 'eBay' ? 3 : 4,
        channelStoreIdentifier: values.shopName
      })
    );
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
  //   setShopName(e.target.value);
  //   dispatch(getShopifyLinkAccount({
  //     data: {
  //       shop: platform,
  //       site: storeLocation as number,
  //       shopName
  //     }
  //   }));
  // };
  
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
            // onChange={handleChange}
          />
        </Form.Item>
        <ConfirmBtn htmlType="submit" 
          disabled={getLinkLoading || newChannelLoading}>
          {getLinkLoading || newChannelLoading ? 'Please wait...': 'Submit'}
        </ConfirmBtn>
      </Form>
    </div>
  );
};
