import { useEffect, useState } from 'react';
import { Button, Col, Input, Popconfirm, Row, List, Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
import { Book } from 'react-feather';
import miniAlert from 'mini-alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TooltipItem,
  ChartType
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import moment from 'moment';
import { CloseIcon } from '../../small-components/CloseIcon';
import { ConfirmBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { Channel } from '../../redux/channels/channelsSlice';
import { DataTable } from '../tables/DataTable';
import { SearchInput } from '../../small-components/TableActionBtns';
import { client } from '../../redux/client';
import { deleteChannel, getChannels } from '../../redux/channels/channelsThunk';
import { getSales } from '../../redux/sales/salesThunk';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { Switch } from '../../small-components/Switch';
import { Moment } from 'moment';
import { Sale } from 'src/redux/sales/salesSlice';
import { getNoApiServers } from 'src/redux/dashboard/noApiServersThunk';
import { getListingServices } from 'src/redux/dashboard/listingServicesThunk';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { NoApiServer } from 'src/redux/dashboard/noApiServersSlice';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Selector } from 'src/small-components/Selector';
import '../../sass/dashboard.scss';
import '../../sass/action-btns.scss';

interface ProductQuota {
  quota: number;
  used: number;
  price: number;
  endsOn: Date;
  currency: string;
  pending: number;
  cancelled: boolean;
}

const { RangePicker } = DatePicker;
export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { channels } = useAppSelector((state) => state.channels);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  const { listingServicesResult } = useAppSelector((state) => state.listingServices);

  const { sales } = useAppSelector((state) => state.sales);
  const [, setIsCopied] = useState<boolean>(false);
  const [affiliate, setAffiliate] = useState<string>('');
  const [productQuota, setProductQuota] = useState<ProductQuota>();
  const [showSales, setShowSales] = useState<boolean>(true);
  const [current] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<number | string>(4);

  const onSearch = (value: string) => console.log('searched value', value);

  const removeRecord = async (id: Channel['id']) => {
    await dispatch(deleteChannel(id));
    dispatch(getChannels());
  };
  const handleSalesChange = () => setShowSales(!showSales);

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

  useEffect(() => {
    dispatch(getNoApiServers());
    dispatch(getListingServices());
  },[]);

  const columns = [
    {
      title: 'Channel Name',
      dataIndex: '',
      key: 'name',
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

  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Sales and Profit Chart'
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<ChartType>[]) => {
            console.log('current context', context[0]);
            return context[0].label;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          text: selectedPeriod === 4 ? 'Period in months of a year' : 'Period in days of a month',
          display: true
        }
      },
      y: {
        min: 0,
        max: 10000
      }
    }
  };

  const daysLabel: string[] = [];
  for (let i = 1; i < 32; i++) {
    daysLabel.push(String(i));
  }
  const monthsLabel = [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('MMM-YY')))];
  const data = {
    labels: selectedPeriod === 3 ? daysLabel : monthsLabel,
    datasets: [
      {
        label: 'Sales',
        data: sales?.map((s: Sale) => s.quantitySold),
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      },
      {
        label: 'Profit',
        data: sales?.map((s: Sale) => {
          const profit = s.revenue! - s.sourcePrice! + s.totalTax!.toFixed(2);
          return parseInt(profit).toFixed(2);
        }),
        backgroundColor: '#16537e',
        borderColor: '#16537e',
        borderWidth: 1
      }
    ]
  };

  // const initialRangePickerValue = localStorage.getItem('initialRangerPickerValue');
  // const initialDatePickerValue = localStorage.getItem('initialDatePickerValue');

  // console.log('DATE 1', initialDatePickerValue);
  // console.log('DATE 2', initialRangePickerValue);

  const periodOptions = [
    { id: 0, value: 3 },
    { id: 1, value: 4 }
  ];
  const onSelectOption = (value: { value: string | number; label: React.ReactNode }) => {
    setSelectedPeriod(value['value']);
  };
  const onChange = async (value: Moment | null | RangeValue<Moment>, dateString: string | [string, string]) => {
    if (Array.isArray(dateString)) {
      await dispatch(
        getSales({
          period: selectedPeriod,
          from: dateString[0],
          to: dateString[1]
        })
      );
    } else {
      await dispatch(
        getSales({
          period: selectedPeriod,
          from: dateString
        })
      );
      
    }
  };

  const totalProfit = sales?.reduce((total: number, sale: Sale) => {
    return (total += sale.revenue! - (sale.sourcePrice! + sale.totalTax!));
  }, 0);

  const salesOrProfit = () => {
    if (showSales && sales?.length) return sales.length;
    if (!showSales && totalProfit !== 0) return <>&euro; {totalProfit?.toFixed(2)} </>;
    return 0;
  };

  const noApiServerSubscription = (
    <div className="subscribe">
      <p>Do you want to keep your NO API extension running 24/7?</p>
      <p>We can do it for you for only 9GBP/month.</p>
      <SuccessBtn>Subscribe</SuccessBtn>
    </div>
  );

  const listingServicesSubscription = (
    <div className="list-permission">
      <p>Not sure what to list? We can help you find good selling items.</p>
      <p> We choose the best products and list them for you</p>
      <SuccessBtn>Yes! List for me</SuccessBtn>
    </div>
  );
  return (
    <Layout className="dashboard-container">
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
                <Link className="redirection-link" to="/subscriptions">
                  Upgrade your plan
                </Link>
              </div>
            </div>
          </Col>
          <Col className="stores" xs={24} lg={10}>
            <h6>Your stores</h6>
            <SearchInput onSearch={onSearch} />
            <DataTable current={current} dataSource={channels} columns={columns} pageSize={2} total={channels.length} />
            <Link to="/add-channel" className="alternative-link">
              Add new channel
            </Link>
          </Col>
        </Row>
      </div>

      <div className="sales-container">
        <h1>Your sales</h1>
        <div className="sales">
          <div className="graph-cntrlers">
            <Selector
              labelInValue
              defaultValue='Select a period'
              onChange={onSelectOption}>
              {periodOptions}
            </Selector>
            {selectedPeriod === 3 ? <DatePicker onChange={onChange} /> : <RangePicker onChange={onChange} />}
            <div className="sales-profit-area">
              <div className="digits">{salesOrProfit()}</div>
              <h4 className="sales-profit-numbers">
                total {showSales ? 'sales' : 'profit'} {selectedPeriod === 3 ? 'today' : 'this month'}
              </h4>
              <Switch
                className="toggle-sales"
                checked={showSales}
                onChange={handleSalesChange}
                checkedChildren="Sales"
                unCheckedChildren="Profit"
                aria-label="Profit and sales toggle"
              />
            </div>
          </div>

          <div className="graph-container">
            <Bar options={options} data={data} className="sales-graph" style={{ maxHeight: 470 }} />
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
            {listingServicesResult?.length ? (
              <List
                itemLayout="horizontal"
                dataSource={listingServicesResult}
                header="Active Services"
                footer={
                  <a href="#" className="footer-link">
                    Manage listing services
                  </a>
                }
                renderItem={() =>
                  listingServicesResult.map((l: ListingService) => (
                    <div key={l.id}>
                      <div className="item-description">
                        <div className="service-quantity">{l.quantity} listing services</div>
                        <a href="/setup-preferences" className="setup-link">
                          Set up your preferences
                        </a>
                      </div>
                    </div>
                  ))
                }
              />
            ) : (
              listingServicesSubscription
            )}
          </Col>

          <Col className="no-api-server" xs={24} lg={10}>
            <div className="no-api-server-title">
              <h6>No API Server</h6>
              <Book />
            </div>
            {noApiServersResult?.length ? (
              <List
                itemLayout="horizontal"
                header={
                  <div className="no-api-title">
                    <div>Connected Channels</div>
                    <div>Next Payment</div>
                  </div>
                }
                footer={
                  <div className="add-servers">
                    <PlusCircleOutlined style={{ fontSize: '19px' }} />
                    <a href="#" className="footer-link">
                      Add more servers
                    </a>
                  </div>
                }
                dataSource={listingServicesResult}
                renderItem={() =>
                  noApiServersResult.map((s: NoApiServer) => (
                    <div key={s.id}>
                      <div className="item-description">
                        <a href="/setup-preferences" className="setup-link">
                          Choose your channel
                        </a>
                        <div className="next-payment">
                          {s.cancelled && 'Canceled'}. Ends on {moment(s.nextPayment).format('DD/MM/YYYY')}
                        </div>
                      </div>
                    </div>
                  ))
                }
              />
            ) : (
              noApiServerSubscription
            )}
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
    </Layout>
  );
};
