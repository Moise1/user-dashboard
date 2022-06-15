import { createRef, useState, useEffect, useMemo } from 'react';
import { Card, Carousel, Space, Layout, Spin } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { TransparentBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getServices } from 'src/redux/subscriptions/subsThunk';
import { Product } from '../../redux/subscriptions/subsSlice';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../sass/subscriptions/subscriptions.scss';
//import { Checkout } from './Checkout';
import { Link } from 'react-router-dom';
import { BillingPeriod } from './models/types';

export const OurServices = () => {
  const [slides, setSlides] = useState<number>(3);
  const [activeCurrency, setActiveCurrency] = useState<number>(1);
  const [currency, setCurrency] = useState('\u20AC');
  const sliderRef = createRef<CarouselRef>();
  const dispatch = useAppDispatch();
  const { services, loading } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, [getServices]);
  const handleNext = () => sliderRef?.current?.next();
  const handlePrev = () => sliderRef?.current?.prev();
  const tabletScreen = window.matchMedia('(max-width: 1030px)');
  const mobileScreen = window.matchMedia('(max-width: 750px)');

  const getBillingPeriodDiscount = (billingPeriodId: number) => {
    switch (billingPeriodId) {
    case BillingPeriod.Monthly:
      return '';
    case BillingPeriod.Biannually:
      return '20% off';
    case BillingPeriod.Yearly:
      return '40% off';
    }
  };

  const getBillingPeriodText = (billingPeriodId: number) => {
    switch (billingPeriodId) {
    case BillingPeriod.Monthly:
      return '';
    case BillingPeriod.Biannually:
      return '(6 months)';
    case BillingPeriod.Yearly:
      return '(1 year)';
    }
  };

  const getBillingPeriodMonths = (billingPeriodId: number) => {
    switch (billingPeriodId) {
    case BillingPeriod.Monthly:
      return 1;
    case BillingPeriod.Biannually:
      return 6;
    case BillingPeriod.Yearly:
      return 12;
    default:
      return 1;
    }
  };

  const handleChangeCurrency = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementId = e.currentTarget.id;
    setActiveCurrency(JSON.parse(elementId));
    if (elementId === '1') {
      setCurrency('\u20AC');
    } else if (elementId === '2') {
      setCurrency('\u0024');
    } else if (elementId === '3') {
      setCurrency('\u00A3');
    }
  };

  const parentToChild = (value: number, billing: number, type: number): void => {
    localStorage.setItem('productId', value.toString());
    localStorage.setItem('billing', billing.toString());
    localStorage.setItem('currencyId', activeCurrency.toString());
    localStorage.setItem('upgradingSubscription', 'false');
    localStorage.setItem('type', type.toString());
  };

  const renderSlides = useMemo(() => {
    if (tabletScreen.matches) {
      setSlides(2);
      slides;
    }
    if (mobileScreen.matches) {
      setSlides(1);
      slides;
    }
    return slides;
  }, [slides]);

  return (
    <Layout className="subscriptions-container">
      {loading ? (
        <Spin />
      ) : (
        <div className="carousel-container">
          <div className="currencies-container">
            <TransparentBtn
              id="1"
              handleClick={handleChangeCurrency}
              className={activeCurrency === 1 ? 'active-currency' : ''}
            >
              EUR
            </TransparentBtn>
            <TransparentBtn
              id="2"
              handleClick={handleChangeCurrency}
              className={activeCurrency === 2 ? 'active-currency' : ''}
            >
              USD
            </TransparentBtn>
            <TransparentBtn
              id="3"
              handleClick={handleChangeCurrency}
              className={activeCurrency === 3 ? 'active-currency' : ''}
            >
              GBP
            </TransparentBtn>
          </div>
          <Carousel slidesToShow={renderSlides} className="carousel" dots={false} ref={sliderRef}>
            {services?.map((p: Product) => (
              <Card key={p.id} className="subscription">
                <p className="listings-count">
                  <strong>{p.name}</strong>
                </p>

                {p.prices.map((prc) => {
                  if (prc.currencyId === activeCurrency && prc.platformId === 2 && prc.billingPeriodId <= 2) {
                    const months = getBillingPeriodMonths(prc.billingPeriodId);
                    return <div className="container-sub">
                      <Link to="/checkout" onClick={() => parentToChild(p.id, 0, p.type)} key={p.id}>
                        <div className="rate-details top-most">
                          <span className="euro">{currency}</span>
                          <h1 className="monthly-rate">
                            {(prc.price / months).toFixed(2) }
                          </h1>
                          <h3 className="frequency">/mo</h3>
                        </div>
                        <p className="forty-off">
                          {getBillingPeriodDiscount(prc.billingPeriodId)}
                        </p>
                        <h4 className="duration-services">{getBillingPeriodText(prc.billingPeriodId)}</h4>
                      </Link>
                    </div>;
                  }
                  else if (prc.currencyId === activeCurrency && prc.platformId === 2 && prc.billingPeriodId > 2) {
                    return <div className="container-sub">
                      <Link to="/checkout" onClick={() => parentToChild(p.id, 0, p.type)} key={p.id}>
                        <div className="rate-details top-most">
                          <span className="euro">{currency}</span>
                          <h1 className="monthly-rate">
                            {prc.price}
                          </h1>
                        </div>
                      </Link>
                    </div>;
                  }
                })}
              </Card>
            ))}
          </Carousel>
          <Space className="control-btns-container">
            <LeftOutlined onClick={handlePrev} style={{ fontSize: '19px' }} />
            <RightOutlined onClick={handleNext} style={{ fontSize: '19px' }} />
          </Space>
        </div>
      )}
    </Layout>
  );
};