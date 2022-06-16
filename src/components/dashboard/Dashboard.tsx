import { useEffect, useState } from 'react';
import { Button, Col, Input, Popconfirm, Row, List, Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
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
  PointElement
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
import { BookOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Selector, SelectorValue } from '../../small-components/form/selector';
import { affiliatesGraphConfig, salesGraphConfig } from 'src/utils/graphConfig';
import { getAffiliatesStats } from 'src/redux/dashboard/affiliatesStatsThunk';
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
  //For pagination add by suleman ahmad
  const [postPerPage, setPostPerPage] = useState<number>(2);
  const [searchedChannels, setSearchedChannels] = useState<Channel[]>([]);
  //
  console.log('The setSearchedChannels', setSearchedChannels);
  const dispatch = useAppDispatch();
  const { channels } = useAppSelector((state) => state.channels);
  const { affiliatesStats } = useAppSelector((state) => state.affiliatesStats);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  const { listingServicesResult } = useAppSelector((state) => state.listingServices);

  const { sales } = useAppSelector((state) => state.sales);
  const [, setIsCopied] = useState<boolean>(false);
  const [affiliate, setAffiliate] = useState<string>('');
  const [productQuota, setProductQuota] = useState<ProductQuota>();
  const [showSales, setShowSales] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4);

  const monthsLabels = [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('MMM-YY')))];

  const { salesOptions, salesData } = salesGraphConfig(selectedPeriod, sales, monthsLabels);
  const { affiliatesOptions, affiliatesData } = affiliatesGraphConfig(selectedPeriod, affiliatesStats, monthsLabels);
  const onSearch = (value: string) => {
    setSearchedChannels(
      channels?.filter((channel: Channel) => {
        if (channel.name === value) {
          return channel.name === value;
        }
      })
    );
  };

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
  }, []);

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

  const periodOptions = [
    { value: 0, label: '3' },
    { value: 1, label: '4' }
  ];
  const onSelectOption = (value: SelectorValue) => {
    value = value === 0 ? 3 : 4;
    setSelectedPeriod(value as number);
  };
  const salesDateChange = async (value: Moment | null | RangeValue<Moment>, dateString: string | [string, string]) => {
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

  const affiliatesDateChange = async (
    value: Moment | null | RangeValue<Moment>,
    dateString: string | [string, string]
  ) => {
    if (Array.isArray(dateString)) {
      await dispatch(
        getAffiliatesStats({
          period: selectedPeriod,
          from: dateString[0],
          to: dateString[1]
        })
      );
    } else {
      await dispatch(
        getAffiliatesStats({
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
            <DataTable
              dataSource={searchedChannels.length ? searchedChannels : channels}
              columns={columns}
              totalItems={channels.length}
              pageSize={postPerPage}
              setPostPerPage={setPostPerPage}
              current={current}
              onChange={setCurrent}
            />

            <Link to="/new-channel" className="alternative-link">
              Add new channel
            </Link>
          </Col>
        </Row>
      </div>

      <div className="sales-container">
        <h1>Your sales</h1>
        <div className="sales">
          <div className="graph-cntrlers">
            <Selector placeHolder="Select a period" onChange={onSelectOption}>
              {periodOptions}
            </Selector>
            {selectedPeriod === 3 ? (
              <DatePicker onChange={salesDateChange} />
            ) : (
              <RangePicker onChange={salesDateChange} />
            )}
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
            <Bar options={salesOptions} data={salesData} className="sales-graph" style={{ maxHeight: 470 }} />
          </div>
        </div>
      </div>

      <div className="other-services">
        <h1>Other Services</h1>
        <Row className="other-services-cols" gutter={[0, 15]}>
          <Col className="listing-service" xs={24} lg={10}>
            <div className="listing-service-title">
              <h6>Listing Service</h6>
              <BookOutlined style={{ fontSize: '19px' }} />
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
              <BookOutlined style={{ fontSize: '19px' }} />
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
                    <a
                      href="https://hustlegotreal.com/en/no-api-server/"
                      rel="noreferrer"
                      target="_blank"
                      className="footer-link"
                    >
                      Add more servers
                    </a>
                  </div>
                }
                dataSource={listingServicesResult}
                renderItem={() =>
                  noApiServersResult.map((s: NoApiServer) => (
                    <div key={s.id}>
                      <div className="item-description">
                        <a href="/configure-no-api-server" className="setup-link">
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
              <BookOutlined style={{ fontSize: '19px' }} />
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
            <BookOutlined style={{ fontSize: '19px' }} />
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

          <div className="affiliates-graph">
            <div className="graph-cntrlers">
              <Selector placeHolder="Select a period" onChange={onSelectOption}>
                {periodOptions}
              </Selector>
              {selectedPeriod === 3 ? (
                <DatePicker onChange={affiliatesDateChange} />
              ) : (
                <RangePicker onChange={affiliatesDateChange} />
              )}
              {/* <div className="sales-profit-area">
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
              </div> */}
            </div>
            <div className="graph-container">
              <Bar
                options={affiliatesOptions}
                data={affiliatesData}
                className="sales-graph"
                style={{ maxHeight: 470 }}
              />
            </div>
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
