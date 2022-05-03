import { useEffect, useState } from 'react';
import { Button, Col, Input, Popconfirm, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
import { Book } from 'react-feather';
import miniAlert from 'mini-alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import { CloseIcon } from '../../small-components/CloseIcon';
import { ConfirmBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { Channel } from '../../redux/channels/channelsSlice';
import { DataTable } from '../tables/DataTable';
import { SearchInput } from '../../small-components/TableActionBtns';
import { client } from '../../redux/client';
import { deleteChannel, getChannels } from '../../redux/channels/channelsThunk';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import '../../sass/dashboard.scss';

interface ProductQuota {
  quota: number;
  used: number;
  price: number;
  endsOn: Date;
  currency: string;
  pending: number;
  cancelled: boolean;
}

export const Dashboard = () => {
  const { channels } = useAppSelector((state) => state.channels);
  const dispatch = useAppDispatch();
  const [, setIsCopied] = useState<boolean>(false);
  const [affiliate, setAffiliate] = useState<string>('');
  const [productQuota, setProductQuota] = useState<ProductQuota>();
  const channelId = channels[0]?.id;
  const onSearch = (value: string) => console.log('searched value', value);

  const removeRecord = async (id: Channel['id']) => {
    await dispatch(deleteChannel(id));
    dispatch(getChannels());
  };

  useEffect(() => {
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [channelId]);

  useEffect(() => {
    (async () => {
      try {
        const quotaRes = await client.get('/Dashboard/GetProductQuotaSummary');
        const affiliateRes = await client.get('/Dashboard/Affiliate');
        setProductQuota(quotaRes.data.response_data);
        setAffiliate(affiliateRes.data.response_data.affiliate);
      } catch (error) {
        if (error) console.log('Product quota data failed to load');
      }
    })();
  }, []);

  const columns = [
    {
      title: 'Channel Name',
      dataIndex: '',
      key: '',
      render: (record: Channel) => (
        <>
          {shopLogo(record.channelId)}
          {countryFlag(record.isoCountry)}
          {record.name}
        </>
      )
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
      text: 'Copied!'
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Sales Chart'
      }
    }
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="general-section">
        <h1>General</h1>
        <Row className="general-cols" gutter={[0, 15]}>
          <Col className="products" xs={24} lg={10}>
            <h6>Products</h6>
            <div className="container-numbers">
              <div className="numbers-info">
                <div className="listed-monitored">
                  <p>Listed and Monitored</p>
                  <h2>{productQuota?.used}</h2>
                </div>
                <div className="subscription-allowance">
                  <p>Subscription allowance</p>
                  <h2>{productQuota?.quota}</h2>
                </div>
              </div>

              <div className="plan">
                <p>Free Plan</p>
                <SuccessBtn>Upgrade your plan</SuccessBtn>
              </div>
            </div>
          </Col>

          <Col className="stores" xs={24} lg={10}>
            <h6>Your stores</h6>
            <SearchInput onSearch={onSearch} />
            <DataTable dataSource={channels} columns={columns} pageSize={2} total={channels.length} />
            <Link to="/add-channel" className="alternative-link">
              Add new channel
            </Link>
          </Col>
        </Row>
      </div>

      <div className="sales-container">
        <h1>Your sales</h1>
        <div className="sales">
          <div className="sales-graph">
            <Bar options={options} data={data} />
          </div>
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
        <h1>Affiliates</h1>
        <div className="affiliates-contents">
          <div className="affiliates-title">
            <h2>Your affiliate link</h2>
            <Book />
          </div>
          <div className="affiliates-benefits">
            <p>Get money each time your referrals purchase any service from us</p>
            <div className="copy-actions">
              <Input type="text" value={affiliate} className="text-input" />
              <CopyToClipboard text={affiliate} onCopy={onCopyText}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </div>
            <h4>
              <strong>Affiliate percentage: 10%</strong>
            </h4>
            <ConfirmBtn>Affiliate dashboard</ConfirmBtn>
          </div>

          <div className="affiliates-graph">{/* affiliates graph /> */}</div>
        </div>
      </div>
      <div className="social-media">
        <SocialIcon network="facebook" style={{ height: 30, width: 30 }} />
        <SocialIcon network="instagram" style={{ height: 30, width: 30 }} />
        <SocialIcon network="youtube" style={{ height: 30, width: 30 }} />
      </div>
    </div>
  );
};

// Merge into  master