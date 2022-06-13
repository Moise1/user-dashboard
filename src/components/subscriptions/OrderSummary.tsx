import { Divider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Product } from '../../redux/subscriptions/subsSlice';
import '../../sass/subscriptions/order-summary.scss';

interface props {
  productId: string | null;
  billingId: string | null;
  currencyId: string | null;
}

export const OrderSummary = (props: props) => {


  const { products, loading } = useAppSelector((state) => state.subscriptions);
  const [currency, setCurrency] = useState('\u20AC');

  const [productId, setProductId] = useState(props.productId);
  const [currencyId, setCurrencyId] = useState(props.currencyId);
  const [billingId, setBillingId] = useState(props.billingId);

  function setPlatformProductId(value: string) {
    console.log('setPlatformProductId: ' + value);
    localStorage.setItem('platformProductId', value);
  }

  function setStripeProductId(value: string) {
    localStorage.setItem('stripePlatformProductId', value);
  }

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
    <div>
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

                      {p.prices.map((prc) => {

                        if (billingId?.toString() === '1' && prc.billingPeriodId.toString() === '0' && prc.currencyId.toString() === currencyId?.toString() && prc.platformId === 1) {
                          return <div className="discounts">
                            <h4 className="old-price">{currency?.toString() + prc.price} /month</h4> &nbsp;
                            <p className="twenty-off"> 20% off</p>
                          </div>;
                        }
                        else if (billingId?.toString() === '2' && prc.billingPeriodId.toString() === '0' && prc.currencyId.toString() === currencyId?.toString() && prc.platformId === 1) {
                          return <div className="discounts">
                            <h4 className="old-price">{currency?.toString() + prc.price} /month </h4> &nbsp;
                            <p className="forty-off"> 40% off</p>
                          </div>;
                        }

                        if (
                          prc.currencyId.toString() === currencyId?.toString() &&
                          prc.platformId === 1 &&
                          prc.billingPeriodId.toString() === billingId?.toString()
                        ) {
                          setPlatformProductId(prc.platformProductId);
                          if (prc.billingPeriodId === 0) return <h4>{currency?.toString() + prc.price} /month</h4>;
                          else if (prc.billingPeriodId === 1) return <h4>{currency?.toString() + (prc.price / 6).toFixed(1)} /month</h4>;
                          else if (prc.billingPeriodId === 2) return <h4>{currency?.toString() + (prc.price / 12).toFixed(1)} /month</h4>;
                        }
                        else if (
                          prc.currencyId.toString() === currencyId?.toString() &&
                          prc.platformId === 2 &&
                          prc.billingPeriodId.toString() === billingId?.toString()
                        ) {
                          setStripeProductId(prc.platformProductId);
                        }
                      })}
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
                <div className="order-sum">
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
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
};
