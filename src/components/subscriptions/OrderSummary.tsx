/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Divider, Spin } from 'antd';
import '../../sass/subscriptions/order-summary.scss';
import { ArrowRight } from 'react-feather';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Product } from '../../redux/subscriptions/subsSlice';

interface props {
  productId: string | null;
  billingId: string | null;
  currencyId: string | null;
}

export const OrderSummary = (props: props) => {
  const history = useHistory();

  const routeChange = (route: string) => {
    history.push(route);
  };

  const { products, loading } = useAppSelector((state) => state.subscriptions);
  const [currency, setCurrency] = useState('\u20AC');

  const [productId, setProductId] = useState(props.productId);
  const [currencyId, setCurrencyId] = useState(props.currencyId);
  const [billingId, setBillingId] = useState(props.billingId);

  const loadOrder = () => {
    if (currencyId?.toString() === '1') {
      setCurrency('\u20AC');
    } else if (currencyId?.toString() === '2') {
      setCurrency('\u0024');
    } else if (currencyId?.toString() === '3') {
      setCurrency('\u00A3');
    }
  };

  console.log(products);

  useEffect(() => {
    setCurrencyId(props.currencyId);
    setBillingId(props.billingId);
    setProductId(props.productId);
    loadOrder();
  }, [props.productId, props.billingId, props.currencyId, loadOrder]);

  return (
    <div className="second-section-container">
      <h3 className="title-ordersum">Your order:</h3>
      {loading ? (
        <Spin />
      ) : (
        products?.map((p: Product) => {
          if (p.id.toString() === productId?.toString()) {
            return (
              <div>
                <div className="order-products">
                  <div className="order-products-lines">
                    <div className="product-order-line">
                      <h4 className="title-orderdetails">{p.name}</h4>
                    </div>
                    {/* NEW FUNCTIONALITY */}
                    {/*           <div className="product-order-line">
            <h5 className="title-orderdetails">No api server</h5>
          </div>
          <div className="product-order-line">
            <h5 className="title-orderdetails">10 Listings service</h5>
          </div> */}
                  </div>
                  <div className="order-products-price">
                    <div className="price-extra">
                      {billingId?.toString() === '1' ? (
                        <div className="discounts">
                          <h4 className="old-price">€24/month</h4>
                          <p className="twenty-off">20% off</p>
                        </div>
                      ) : (
                        ''
                      )}
                      {billingId?.toString() === '2' ? (
                        <div className="discounts">
                          <h4 className="old-price">€24/month</h4>
                          <p className="forty-off">40% off</p>
                        </div>
                      ) : (
                        ''
                      )}
                      <h4>
                        {currency?.toString()}
                        {p.prices.map((prc) => {
                          if (
                            prc.currencyId.toString() === currencyId?.toString() &&
                            prc.platformId === 1 &&
                            prc.billingPeriodId.toString() === billingId?.toString()
                          ) {
                            if (prc.billingPeriodId === 0) return prc.price;
                            else if (prc.billingPeriodId === 1) return (prc.price / 6).toFixed(1);
                            else if (prc.billingPeriodId === 2) return (prc.price / 12).toFixed(1);
                          }
                        })}
                        /month
                      </h4>
                    </div>
                    {/* NEW FUNCTIONALITY */}
                    {/*           <div className="price-extra">
            <h5>£12.99/month</h5>
          </div>
          <div className="price-extra">
            <h5>£9.99</h5>
          </div> */}
                  </div>
                </div>
                <Divider />
                <div className="order-sum" onClick={() => routeChange('/payment-method')}>
                  <h2>Total to pay:</h2>
                  <h1>
                    {currency?.toString()}
                    {p.prices.map((prc) => {
                      if (
                        prc.currencyId.toString() === currencyId?.toString() &&
                        prc.platformId === 1 &&
                        prc.billingPeriodId.toString() === billingId?.toString()
                      ) {
                        return prc.price;
                      }
                    })}
                  </h1>
                  <ConfirmBtn htmlType="submit">
                    Payment method <ArrowRight />
                  </ConfirmBtn>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
};
