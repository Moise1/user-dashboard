import { createRef, useState, useMemo } from 'react';
import {ChevronLeft, ChevronRight} from 'react-feather';
import { Card, Divider, Carousel, Button, Space } from 'antd';
import '../../sass/light-theme/subscriptions.scss';
import { CarouselRef } from 'antd/lib/carousel';
import { StatusBar } from '../small-components/StatusBar';
import { Layout } from 'antd';

export const Subscriptions = () => {
  const [slides, setSlides] = useState<number>(3);
  const sliderRef = createRef<CarouselRef>();
  const handleNext = () => sliderRef?.current?.next();
  const handlePrev = () => sliderRef?.current?.prev();
  const screenWidth = window.screen.width;

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
    if (screenWidth < 750) {
      setSlides(1);
    }
    return slides;
  }, [slides]);

  return (
    <Layout className="carousel-container">
      <Space className="control-btns-container">
        <ChevronLeft onClick={handlePrev} className="chevron-left"/>
        <ChevronRight onClick={handleNext} className="chevron-right"/>
      </Space>
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
    </Layout>
  );
};
