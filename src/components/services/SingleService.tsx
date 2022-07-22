import { Link } from 'react-router-dom';
import { Row, Col, Divider, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { AllServicesData, ServiceData } from './ServicesData';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { getServices } from 'src/redux/subscriptions/subsThunk';
import '../../sass/services/single-service.scss';
import { WarningBtn } from 'src/small-components/ActionBtns';

type LocationProps = {
  location: {
    state: {
      id: number;
      title: string;
      shortDescription: string;
      paragraphs: string[];
      bulletPoints: string[];
      image: string;
      slug: string;
    };
    pathname: string;
  };
};


interface ServiceObj {
  id: number;
  name: string;
  productOrder: number;
  prices: Array<{
    id: number,
    platformId: number, 
    billingPeriod: number, 
    currencyId: number, 
    price: number,
    platformProductId: string,
    productId: number
  }>
}

export const SingleService = ({ location }: LocationProps) => {
  
  const {slug}: {slug: string} = useParams();
  const [data, setData] = useState<ServiceData>();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.services);
  const [servicePrice, setServicePrice] = useState<number | null>(null);

  useEffect(() => {
    if (location.state == undefined) {
      const newState = AllServicesData.filter((s: ServiceData) => s.slug == location.pathname);
      setData(newState[0]);
      setLoading(false);
    }
    else {
      setData(location.state);
      setLoading(false);
    }
  }, []);

  useEffect(()=>{
    dispatch(getServices());
    switch (slug) {
      case 'price-warrior':
        break;
      case 'private-supplier': 
        setServicePrice(services[1].prices[0].price);
        break;
      case 'no-api-server':
        setServicePrice(services[3].prices[3].price);
        break;
      case 'auto-ordering':
        break;
      case 'vero-checker':
        break;
      case 'listing-service': 
        break;

      case 'title-optimization':
        break;

      default:
        break;
    }

  }, [slug]);

  const listingServices = services.filter((obj: ServiceObj) => obj.name.startsWith('We list'));
  const listingServiceCard = () =>{
    return listingServices.map((item: ServiceObj) => (
      <div className="single-listing-service" key={item.id}>
       
        <p className="title">{item.name}</p>
        <div className="prices">
          <WarningBtn>{`€ ${[...new Set(item.prices.map(item => item.price))][1]}`}</WarningBtn>
          <WarningBtn>{`£ ${[...new Set(item.prices.map(item => item.price))][0]}`}</WarningBtn>
        </div>
      </div>
    ));
  };
  
  return loading ? (
    <Spin />
  ) : (
    <div className="main-container">
      <Link to={Links.Services} className="back-to-services">
        <a>
          <LeftOutlined style={{ fontSize: '19px' }} />
          Back to services
        </a>
      </Link>
      <div className="service-main-container">
        <Row className="service-area">
          <Col className="col-services" xs={24} md={24} lg={8}>
            <div className="service-container">
              <div className="image-container">
                <img src={data?.image} />
              </div>
            </div>
          </Col>

          <Col className="col-services" xs={24} lg={12}>
            <div className="description-area">
              <h2 className="service-title">{data?.title}</h2>
              <div className="service-advantages">
                <div>
                  {data?.paragraphs.map(
                    (
                      x: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
                      index: Key | null | undefined
                    ) => (
                      <p key={index}> {x} </p>
                    )
                  )}

                  <ul>
                    {data?.bulletPoints.map(
                      (
                        x: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
                        index: Key | null | undefined
                      ) => (
                        <li key={index}> {x} </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="service-pricing-container">
                <div className="service-pricing-table">
                  <div className="service-cost">
                    <h4 className="cost-title">Cost of this service</h4>
                  </div>
                  {slug === 'listing-service' && listingServiceCard()}
                  <div className="service-cost-details">
                    {slug !== 'listing-service' && (<div className="service-rate-container">
                      <div className="rate-details">
                        <span className="euro">€</span>
                        <h1 className="monthly-rate">{servicePrice ?? null}</h1>
                      </div>
                      <div className="type-payment">
                        <h4>One off payment</h4>
                      </div>
                      <div className="what-includes">
                        <p>Includes development of the integration with your desired supplier</p>
                      </div>
                    </div>)}
                    {slug === 'private-supplier' && ( 
                      <>
                        <Divider className="divider" type="vertical" />
                        <div className="service-rate-container">
                          <div className="rate-details">
                            <span className="euro">€</span>
                            <h1 className="monthly-rate">50</h1>
                            <h4 className="frequency">/mo</h4>
                          </div>
                          <div className="type-payment">
                            <h4>Manteinance fee</h4>
                          </div>
                          <div className="what-includes">
                            <p>To ensure that the integration keeps working even if your supplier changes the website.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};