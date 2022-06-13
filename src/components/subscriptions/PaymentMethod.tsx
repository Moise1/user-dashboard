/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Radio, Spin } from 'antd';
import '../../sass/subscriptions/payment-method.scss';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSummary } from './OrderSummary';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions, getPaymentConfig } from 'src/redux/subscriptions/subsThunk';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { ArrowRightOutlined } from '@ant-design/icons';
import { CreateCheckoutSessionRequest } from './models/types';
import { CreateCheckoutSession } from 'src/redux/payment/paymentThunk';

export const PaymentMethod = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  //const history = useHistory();

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPaymentConfig());
  }, [getSubscriptions, getPaymentConfig]);

  const [productId] = useState(localStorage.getItem('productId'));
  const [billingId] = useState(localStorage.getItem('billing'));
  const [currencyId] = useState(localStorage.getItem('currencyId'));
  const [platformProductId] = useState(localStorage.getItem('platformProductId'));
  const [stripePlatformProductId] = useState(localStorage.getItem('stripePlatformProductId'));
  /*const [upgradingSubscription] = useState(localStorage.getItem('upgradingSubscription'));*/
  //const [type] = useState(localStorage.getItem('type'));
  const { products, loading } = useAppSelector((state) => state.subscriptions);
  const [loadings, setLoadings] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<number>();
  const { subscriptionConfiguration } = useAppSelector((state) => state.subscriptionConfiguration);
  //const [stripeConfig] = useAppSelector((state) => state.paymentConfig.stripeConfig);
  console.log({ products });

  function setReturnUrl(url: string, returnUrl: string): string {
    let paramsStart = url.indexOf('?');
    let params = '';
    if (paramsStart !== -1) {
      params = url.substr(paramsStart);
    } else {
      paramsStart = url.length;
    }
    const urlParams = new URLSearchParams(params);

    if (urlParams.has('returnUrl')) {
      urlParams.set('returnUrl', returnUrl.toString());
    } else {
      urlParams.append('returnUrl', returnUrl.toString());
    }

    return url.substr(0, paramsStart) + '?' + urlParams.toString();
  }

  function GetSuccesUrl() {
    const location = window.location;
    const baseUrl = location.protocol + '//' + location.host;
    console.log(baseUrl);
    let successUrl = subscriptionConfiguration.successUrl;
    console.log('successUrl: ' + successUrl);
    successUrl = successUrl ?? 'https://app.hustlegotreal.com/Home';
    successUrl = setReturnUrl(successUrl as string, 'https://app.hustlegotreal.com/Home');

    const url = new URL(successUrl);
    url.searchParams.append('bp', billingId as string);
    url.searchParams.append('pid', productId as string);
    return url.toString();
  }

  function GetCancelUrl() {
    const url = new URL(subscriptionConfiguration.cancelUrl as unknown as string);
    url.searchParams.append('bp', billingId as string);
    url.searchParams.append('pid', productId as string);
    return url.toString();
  }


  function setValue(arg0: number) {
    setSelectedMethod(arg0);
  }

  async function handleStripe() {

    setLoadings(true);
    const request: CreateCheckoutSessionRequest = {
      lineItems: [{ platformProductId: stripePlatformProductId ?? '', quantity: 1 }],
      mode: billingId as unknown as number < 3 ? 'subscription' : 'payment',
      successUrl: GetSuccesUrl(),
      cancelUrl: GetCancelUrl(),
      upgradingSubscription: subscriptionConfiguration.upgrade as unknown as boolean
    };

    const rp = await dispatch(CreateCheckoutSession(request));
    const stripe = await loadStripe(subscriptionConfiguration.stripeConfig.publishableKey);
    await stripe?.redirectToCheckout({ sessionId: rp.payload.responseObject.checkoutSessionId });
  }

  function handlePayPal() {
    window.location.href =
      'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=' +
      platformProductId +
      '&custom=' +
      subscriptionConfiguration.payPalConfig.userId;
  }

  const routeChange = () => {
    if (selectedMethod && selectedMethod === 1) {
      handlePayPal();
    }
    else if (selectedMethod && selectedMethod === 2) {
      handleStripe();
    }
    else {
      alert('Please select a payment method');
    }
  };


  return loading || loadings ? (
    <Spin />
  ) : (
    <Layout className="paymentmethod-content">
      <div className="title-container">
        <h2>Checkout</h2>
        <h3>Payment method</h3>
      </div>

      <div className="payment-sections-container">
        <div className="payments-container">
          <Radio.Group name="paymentMethod" defaultValue="0">
            <div className="section-payment">
              <div className="section-container">
                <h3>Select your preferred payment method</h3>
                <div className="cards-payments">
                  <Radio className="card-payment-section" value="2" name="paymentMethod" onClick={() => setValue(2)}>
                    <h3>Credit card</h3>
                  </Radio>
                  <Radio className="card-payment-section" value="1" name="paymentMethod" onClick={() => setValue(1)}>
                    <h3>Paypal</h3>
                  </Radio>
                </div>
              </div>
            </div>
          </Radio.Group>
          {/*Future functionality*/}
          {/*
          <div className="section-payment">
            <h3 className="title-card">Billing details</h3>
            <div className="section-container">
              <div className="billing-details">
                <div className="address-details">
                  <h3>Address</h3>
                  <h4>John McGregor</h4>
                  <h4>7 Queensway</h4>
                  <h4>WC17 8BQ, London</h4>
                  <h4>United Kingdom</h4>
                </div>
                <div className="address-details">
                  <h3>VAT Number</h3>
                  <h4>466345544</h4>
                </div>
              </div>
            </div>
          </div>
          */}
        </div>
        <div className="order-summary">
          <div className="second-section-container">
            <OrderSummary productId={productId} billingId={billingId} currencyId={currencyId} />
            <div className="order-sum" onClick={() => routeChange()}>
              <ConfirmBtn htmlType="submit">
                Finish Payment <ArrowRightOutlined />
              </ConfirmBtn>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};
