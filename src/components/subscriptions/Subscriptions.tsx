import { createRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Card, Divider, Carousel, Button, Space } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { StatusBar } from '../small-components/StatusBar';
import { Layout } from 'antd';
import '../../sass/light-theme/subscriptions.scss';
import { TransparentBtn } from '../small-components/ActionBtns';

export const Subscriptions = () => {
  const [slides, setSlides] = useState<number>(3);
  const [activeCurrency, setActiveCurrency] = useState<number>(0);
  const sliderRef = createRef<CarouselRef>();
  const handleNext = () => sliderRef?.current?.next();
  const handlePrev = () => sliderRef?.current?.prev();
  const tabletScreen = window.matchMedia('(max-width: 1030px)');
  const mobileScreen = window.matchMedia('(max-width: 750px)');

  const handleChangeCurrency = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    const elementId = e.currentTarget.id;
    setActiveCurrency(JSON.parse(elementId));
  };
  const data = [
    {
      id: 1,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    },
    {
      id: 2,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    },
    {
      id: 3,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    },
    {
      id: 4,
      listingsCount: 300,
      monthlyRate: 24.0,
      firstDiscount: 19.2,
      secondDiscount: 14.4
    }
  ];

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
      <div className="carousel-container">
        <StatusBar>
          <h6 className="subscriptions-detail">Your subscription offers the following: </h6>
          <p className="subscriptions-limit">
            Subscription limit <span>110</span>
          </p>
          <p className="subscriptions-items">
            Items<span>110</span>
          </p>
          <Button className="subscription-cancel">Request cancellation</Button>
        </StatusBar>
        <div className="currencies-container">
          <TransparentBtn id="0" handleClick={handleChangeCurrency} className={activeCurrency === 0 ? 'active-currency':'' }>EUR</TransparentBtn>
          <TransparentBtn id="1" handleClick={handleChangeCurrency} className={activeCurrency === 1 ? 'active-currency':'' }>USD</TransparentBtn>
          <TransparentBtn id="2" handleClick={handleChangeCurrency} className={activeCurrency === 2 ? 'active-currency':'' }>GBP</TransparentBtn>
        </div>
        <Carousel arrows slidesToShow={renderSlides} className="carousel" dots={false} ref={sliderRef}>
          {data.map((d) => (
            <Card key={d.id} className="subscription">
              <p className="listings-count">
                Up to <strong>{d.listingsCount}</strong> listings
              </p>
              <h1 className="monthly-rate">{d.monthlyRate}</h1>

              <Divider className="divider" />
              <div className="discount">
                <p className="twenty-off">20% off</p>
                <div className="rate-details">
                  <span className="euro">&euro;</span>
                  <h1 className="monthly-rate">{d.firstDiscount}</h1>
                  <span className="frequency">/mo</span>
                </div>
                <span className="duration">(6 months)</span>
              </div>
              <Divider className="divider" />
              <div className="discount">
                <p className="forty-off">40% off</p>
                <div className="rate-details">
                  <span className="euro">&euro;</span>
                  <h1 className="monthly-rate">{d.secondDiscount}</h1>
                  <span className="frequency">/mo</span>
                </div>
                <span className="duration">(1 year)</span>
              </div>
            </Card>
          ))}
        </Carousel>
        <Space className="control-btns-container">
          <ChevronLeft onClick={handlePrev} className="chevron-left" />
          <ChevronRight onClick={handleNext} className="chevron-right" />
        </Space>
      </div>
    </Layout>
  );
};
