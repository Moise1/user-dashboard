import { useEffect, useState } from 'react';
import { Button, Col, Input, Layout, Popconfirm, Row } from 'antd';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
import { X as CloseIcon, Book } from 'react-feather';
import { Line } from '@ant-design/plots';
import { ConfirmBtn, SuccessBtn } from '../small-components/ActionBtns';
import { Channel } from '../../redux/channels/channelsSlice';
import { DataTable } from '../tables/DataTable';
import { SearchInput } from '../small-components/TableActionBtns';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import  miniAlert  from 'mini-alert';
import '../../sass/dashboard.scss';

interface GraphPadding {
  padding: graphPaddingType;
}

type graphPaddingType = number | 'auto' | number[] | undefined;

export const Dashboard = ({ padding }: GraphPadding) => {
  const { channels } = useAppSelector((state) => state.channels);
  const [dataSource, setDataSource] = useState<Channel[]>(channels);
  const [current, setCurrent] = useState<number>(1);
  const [, setIsCopied] = useState<boolean>(false);
  const [text] = useState('https://app.hustlegotreal.com/Register/Landing?src=SPjLREeM');

  const [sales, setSales] = useState([]);
  const channelId = channels[0]?.id;
  const onSearch = (value: string) => console.log('searched value', value);

  const removeRecord = (id: Channel['id']) => {
    setDataSource(dataSource.filter((item: Channel) => item.id !== id));
  };
  const fetchSales = async () => {
    try {
      const res = await fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json');
      setSales(await res.json());
    } catch (error) {
      if (error) console.log('Sales data failed to load');
    }
  };

  useEffect(() => {
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [channelId]);

  useEffect(() => {
    fetchSales();
  }, []);

  const salesGraphConfig = {
    data: sales.map(({ scales: sales, Date }) => ({ sales, Date })),
    padding,
    xField: 'Date',
    yField: 'sales',
    xAxis: {
      tickCount: 5
    },
    slider: {
      start: 0.1,
      end: 0.5
    }
  };

  const columns = [
    {
      title: 'Channel Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: '',
      render: (record: Channel) => {
        return (
          <Popconfirm title="Sure to delete this record?" onConfirm={() => removeRecord(record.id)}>
            <CloseIcon className="remove-rule" />
          </Popconfirm>
        );
      }
    }
  ];

  const onCopyText = () => {
    setIsCopied(true);
    miniAlert({
      overflow: true, 
      autoremove: true,
      time: 500, 
      size: 'small',
      cartoon: false,
      text: 'Copied!',
    });   
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <Layout className="dashboard">
      <div className="auto-ordering-section">
        <div className="right-contents">
          <h1 className="title">
            <span>Auto ordering</span> is now available
          </h1>
          <p>
            Let our system process your orders <a href="#">automatically</a>. Just sit back and relax. We&apos;ve got
            you covered.
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

      <div className="general-section">
        <h1>General</h1>
        <Row className="general-cols" gutter={[0, 15]}>
          <Col className="products" xs={24} lg={10}>
            <h6>Products</h6>
            <div className="numbers-info">
              <div className="listed-monitored">
                <p>Listed and Monitored</p>
                <h2>24</h2>
              </div>
              <div className="subscription-allowance">
                <p>Subscription allowance</p>
                <h2>300</h2>
              </div>
            </div>
            <div className="plan">
              <p>Free Plan</p>
              <SuccessBtn>Upgrade your plan</SuccessBtn>
            </div>
          </Col>

          <Col className="stores" xs={24} lg={10}>
            <h6>Your stores</h6>
            <SearchInput onSearch={onSearch} />
            <DataTable
              dataSource={dataSource}
              columns={columns}
              pageSize={2}
              current={current}
              onChange={setCurrent}
              total={dataSource.length}
            />
            <Link to="/add-channel" className="alternative-link">
              Add channel
            </Link>
          </Col>
        </Row>
      </div>

      <div className="sales">
        <h2>Your sales</h2>
        <div className="sales-graph">
          <Line {...salesGraphConfig} />
        </div>
      </div>

      <div className="other-services">
        <h1>Other Services</h1>
        <Row className="other-services-cols" gutter={[0, 15]}>
          <Col className="listing-service" xs={24} lg={10}>
            <div className="listing-service-title">
              <h6>Listing Service</h6>
              <Book />
            </div>
            <div className="list-permission">
              <p>Not sure what to list? We can help you find good selling items.</p>
              <p> We choose the best products and list them for you</p>
              <SuccessBtn>Yes! List for me</SuccessBtn>
            </div>
          </Col>

          <Col className="no-api-server" xs={24} lg={10}>
            <div className="no-api-server-title">
              <h6>No API Server</h6>
              <Book />
            </div>
            <div className="subscribe">
              <p>Do you want to keep your NO API extension running 24/7?</p>
              <p>We can do it for you for only 9GBP/month.</p>
              <SuccessBtn>Subscribe</SuccessBtn>
            </div>
          </Col>

          <Col className="tokens" xs={24} lg={10}>
            <h6 className="tokens-title">Tokens - Title Optimization</h6>
            <div className="tokens-count">
              <p>Not sure what to list? We can help you find good selling items.</p>
              <p> We choose the best products and list them for you</p>
              <SuccessBtn>Get more tokens</SuccessBtn>
              <Link to="/optimize-listings" className="alternative-link">
                Optimize your existing listings
              </Link>
            </div>
          </Col>

          <Col className="auto-ordering" xs={24} lg={10}>
            <div className="auto-ordering-title">
              <h6>Auto Ordering</h6>
              <Book />
            </div>
            <div className="use-auto-ordering">
              <p>Do you want to keep your NO API extension running 24/7?</p>
              <p>We can do it for you for only 9GBP/month.</p>
              <SuccessBtn>Use it!</SuccessBtn>
              <Link to="/configure-auto-ordering" className="alternative-link">
                Configure now our auto ordering systems
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className="affiliates-main-container">
        <h3>Affiliates</h3>
        <div className="affiliates-contents">
          <div className="affiliates-title">
            <h2>Your affiliate link</h2>
            <Book />
          </div>
          <div className="affiliates-benefits">
            <p>Get money each time your referrals purchase any service from us</p>
            <div className="copy-actions">
              <Input type="text" value={text} className="text-input" />
              <CopyToClipboard text={text} onCopy={onCopyText}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </div>
            <h4>
              <strong>Affiliate percentage: 10%</strong>
            </h4>
            <ConfirmBtn>Affiliate dashboard</ConfirmBtn>
          </div>

          <div className="sales-graph">
            <Line {...salesGraphConfig} />
          </div>
        </div>
      </div>
      <div className="social-media">
        <SocialIcon network="facebook" style={{ height: 30, width: 30 }} />
        <SocialIcon network="instagram" style={{ height: 30, width: 30 }} />
        <SocialIcon network="youtube" style={{ height: 30, width: 30 }} />
      </div>
    </Layout>
  );
};
