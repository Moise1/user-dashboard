import { useEffect } from 'react';
import { Col, Layout, Row } from 'antd';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
import { ConfirmBtn } from '../small-components/ActionBtns';
import '../../sass/dashboard.scss';

export const Dashboard = () => {
  const { channels } = useAppSelector((state) => state.channels);
  const channelId = channels[0]?.id;
  useEffect(() => {
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [channelId]);
  return (
    <Layout className="dashboard">
      <div className="auto-ordering-section">
        <div className="right-contents">
          <h1 className="title">
            <span>Auto ordering</span> is now available
          </h1>
          <p>
            Let our system process your orders <a href="#">automatically</a>. Just sit back and relax. We&apos;ve got you
            covered.
          </p>
        </div>

        <div className="middle-contents">
          <h6>
            Click here to get <Link to="/get-started">to get started</Link>
          </h6>
          <ConfirmBtn>Configure Auto Ordering</ConfirmBtn>
        </div>

        <div className="left-contents">
          <p>You have sold a product for &pound;57 !</p>
          <p>
            Profit: <span>&pound;14</span>
          </p>
        </div>
      </div>

      <Row>
        <h1>General</h1>
        <Col>
          <h6>Products</h6>
        </Col>
        <Col></Col>
      </Row>
    </Layout>
  );
};
