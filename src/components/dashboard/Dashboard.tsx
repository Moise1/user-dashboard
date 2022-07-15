import { useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Row, List, Layout } from 'antd';
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
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import moment from 'moment';
import { CloseIcon } from '../../small-components/CloseIcon';
import { ConfirmBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { Channel } from '../../redux/channels/channelsSlice';
import { DataTable } from '../../small-components/tables/data-table';
import { SearchInput } from '../../small-components/TableActionBtns';
import { client } from '../../redux/client';
import { deleteChannel, getChannels } from '../../redux/channels/channelsThunk';
import { getSales } from '../../redux/sales/salesThunk';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { Sale, ePeriod } from 'src/redux/sales/salesSlice';
import { getNoApiServers } from 'src/redux/dashboard/noApiServersThunk';
import { getListingServices } from 'src/redux/dashboard/listingServicesThunk';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { NoApiServer } from 'src/redux/dashboard/noApiServersSlice';
import { CalendarOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { getAffiliatesStats } from 'src/redux/dashboard/affiliatesStatsThunk';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from '../topbar/BuyTokens';
import { ProductQuota } from 'src/redux/user/userSlice';
import { DateRangePicker, Range } from 'react-date-range';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { addDays } from 'date-fns';
import Modal from 'antd/lib/modal/Modal';
import { getCurrency } from '../../utils/getCurrency';
import { Links } from '../../links';
import { DeleteAccount } from '../user/DeleteAccount';
import '../../sass/dashboard.scss';
import '../../sass/modal-datepicker.scss';
import '../../sass/action-btns.scss';

export const Dashboard = () => {

  const [postPerPage, setPostPerPage] = useState<number>(2);
  const [searchedChannels, setSearchedChannels] = useState<Channel[]>([]);
  const dispatch = useAppDispatch();
  const { channels } = useAppSelector((state) => state.channels);
  const { affiliatesStats } = useAppSelector((state) => state.affiliatesStats);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  const { listingServicesResult } = useAppSelector((state) => state.listingServices);
  const { sales } = useAppSelector((state) => state.sales);
  const [, setIsCopied] = useState<boolean>(false);
  const [affiliate, setAffiliate] = useState<string>('');
  const [productQuota, setProductQuota] = useState<ProductQuota>();
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4);
  const [affiliatePeriod, setAffiliatePeriod] = useState<number>(4);
  const [startFrom, setStartFrom] = useState<string>(moment.utc().add(-7, 'months').format('DD MMM YYYY'));
  const [endTo, setEndTo] = useState<string>(moment.utc().format('DD MMM YYYY'));
  const [affiliateStartFrom, setAffiliateStartFrom] = useState<string>(
    moment.utc().add(-7, 'months').format('DD MMM YYYY')
  );
  const [affiliateEndTo, setAffiliateEndTo] = useState<string>(moment.utc().format('DD MMM YYYY'));
  const [isSalesModalVisible, setIsSalesModalVisible] = useState(false);
  const [isAffiliateModalVisible, setIsAffiliateModalVisible] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleCancel = () => setOpenDeleteModal(!openDeleteModal);
  const handleDeleteModelOpen = () => setOpenDeleteModal(!openDeleteModal);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(!open);
  const handleCheck = () => setChecked(!checked);

  const handleDelete = async (id: Channel['id']) => {
    await dispatch(deleteChannel(id));
    setOpenDeleteModal(!openDeleteModal);
    dispatch(getChannels());
    console.log('Delete Shop Action....');
  };
  const onSearch = (value: string) => {
    setSearchedChannels(
      channels.filter((c: Channel) => {
        if (c.name.toLowerCase().includes(value.toLowerCase())) {
          return c;
        }
      })
    );
  };

 

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

  useEffect(() => {
    dispatch(
      getSales({
        period: selectedPeriod,
        from: moment.utc().add(-7, 'months').format('YYYY-MM-DD') + 'T00:00:00.000Z',
        to: moment.utc().local().format('YYYY-MM-DD') + 'T00:00:00.000Z',
        timeDiff: new Date().getTimezoneOffset()
      })
    );
    dispatch(
      getAffiliatesStats({
        period: affiliatePeriod,
        from: moment.utc().add(-7, 'months').format('YYYY-MM-DD') + 'T00:00:00.000Z',
        to: moment.utc().local().format('YYYY-MM-DD') + 'T00:00:00.000Z',
        timeDiff: new Date().getTimezoneOffset()
      })
    );
  }, [getSales, getAffiliatesStats]);

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
          <>
            <PopupModal open={openDeleteModal} width={600}>
              <DeleteAccount
                selectedChannelId={record.id}
                checked={checked}
                handleCheck={handleCheck}
                handleCancel={handleCancel}
                handleDelete={() =>handleDelete(record.id)}
              />
            </PopupModal>
            <CloseIcon className="remove-rule" onClick={handleDeleteModelOpen} />
          </>
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

  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, LineElement);

  const salesDateChange = async (value: number, dateString: [string, string]) => {
    if (Array.isArray(dateString)) {
      await dispatch(
        getSales({
          period: value,
          from: dateString[0],
          to: dateString[1],
          timeDiff: new Date().getTimezoneOffset()
        })
      );
    }
  };

  const affiliatesDateChange = async (value: number, dateString: [string, string]) => {
    if (Array.isArray(dateString)) {
      await dispatch(
        getAffiliatesStats({
          period: value,
          from: dateString[0],
          to: dateString[1],
          timeDiff: new Date().getTimezoneOffset()
        })
      );
    }
  };

  const totalProfit = sales?.reduce((total: number, sale: Sale) => {
    return (total += sale.revenue! - (sale.sourcePrice! + sale.totalTax!));
  }, 0);

  const totalOrders = sales?.reduce(
    (total: number, sale: { quantitySold: number }) => (total = total + sale.quantitySold),
    0
  );

  const totalAffiliates = affiliatesStats?.reduce(
    (total: number, sale: { quantity: number }) => (total = total + sale.quantity),
    0
  );

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

  const getLabels = () => {
    if (selectedPeriod) {
      switch (selectedPeriod) {
        case ePeriod.Hours:
          return [
            ...new Set(
              sales?.map((d: Sale) => {
                const date = new Date(d.date ? d.date : new Date());
                const hours = (date.getUTCHours() % 12 || 12) + (date.getUTCHours() < 12 ? 'AM' : 'PM');
                return hours + '-' + date.getUTCDate();
              })
            )
          ];
        case ePeriod.Days: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date).format('DD-MMM')))];
        }
        case ePeriod.Weeks: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date).format('DD-MMM')))];
        }
        case ePeriod.Months: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date).format('MMM-YY')))];
        }
        case ePeriod.Year: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date).format('YYYY')))];
        }
        default:
          break;
      }
    }
  };

  const getaffiliateChartLabels = () => {
    if (affiliatePeriod) {
      switch (affiliatePeriod) {
        case ePeriod.Days:
          return [...new Set(affiliatesStats?.map((d: { date: Date }) => moment(d.date).format('DD-MMM')))];
        case ePeriod.Months:
          return [...new Set(affiliatesStats?.map((d: { date: Date }) => moment(d.date).format('MMM-YY')))];
        default:
          break;
      }
    }
  };

  const saleData: number[] = sales?.map((s: Sale) => s.quantitySold);

  const profitData: number[] = sales?.map((s: Sale) => {
    const profit = s.revenue! - (s.sourcePrice! + s.totalTax!);
    return profit.toFixed(0);
  });

  const affiliateData: number[] = affiliatesStats?.map((s: { quantity: number }) => s.quantity);

  const orderChartData: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 0,
        left: 0,
        blur: 5,
        opacity: 0.1
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#5e84db'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '',
      align: 'right'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: getLabels(),
      title: {
        text: ''
      }
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    series: [
      {
        name: 'Orders',
        data: saleData
      }
    ]
  };

  const profitChartData: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 0,
        left: 0,
        blur: 5,
        opacity: 0.1
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#228b22'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    //title: {
    //  text: 'Profit',
    //  align: 'left'
    //},
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: getLabels(),
      title: {
        text: ''
      }
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    series: [
      {
        name: 'Profit',
        data: profitData
      }
    ]
  };

  const affiliateChartData: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 0,
        left: 0,
        blur: 5,
        opacity: 0.1
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#9694ff'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    //title: {
    //  text: 'Profit',
    //  align: 'left'
    //},
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: getaffiliateChartLabels(),
      title: {
        text: ''
      }
    },
    yaxis: {
      title: {
        text: ''
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    series: [
      {
        name: 'Affiliates',
        data: affiliateData
      }
    ]
  };

  const [affiliateState, setAffiliateState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const salesModalOk = () => {
    setIsSalesModalVisible(false);
    if (state[0]) {
      const startDate: Date = state[0].startDate ? state[0].startDate : moment.utc().month(-12).toDate();
      const endDate: Date = state[0].endDate ? state[0].endDate : moment.utc().toDate();
      const diff = Math.abs(startDate.getTime() - endDate.getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      const from = moment.utc(startDate).local().format('YYYY-MM-DD') + 'T00:00:00.000Z';
      const to = moment.utc(endDate).local().format('YYYY-MM-DD') + 'T00:00:00.000Z';

      setStartFrom(moment.utc(startDate).local().format('DD MMM YYYY'));
      setEndTo(moment.utc(endDate).local().format('DD MMM YYYY'));

      if (diffDays < 3) {
        setSelectedPeriod(6);
        salesDateChange(6, [from, to]);
      } else if (diffDays > 2 && diffDays < 31) {
        setSelectedPeriod(3);
        salesDateChange(3, [from, to]);
      } else if (diffDays > 30 && diffDays < 400) {
        setSelectedPeriod(4);
        salesDateChange(4, [from, to]);
      } else {
        setSelectedPeriod(5);
        salesDateChange(5, [from, to]);
      }
    }
  };

  const affiliateModalOk = () => {
    setIsAffiliateModalVisible(false);
    if (affiliateState[0]) {
      const startDate: Date = affiliateState[0].startDate
        ? affiliateState[0].startDate
        : moment.utc().month(-12).toDate();
      const endDate: Date = affiliateState[0].endDate ? affiliateState[0].endDate : moment.utc().toDate();
      const diff = Math.abs(startDate.getTime() - endDate.getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      const from = moment.utc(startDate).local().format('YYYY-MM-DD') + 'T00:00:00.000Z';
      const to = moment.utc(endDate).local().format('YYYY-MM-DD') + 'T00:00:00.000Z';

      setAffiliateStartFrom(moment.utc(startDate).local().format('DD MMM YYYY'));
      setAffiliateEndTo(moment.utc(endDate).local().format('DD MMM YYYY'));

      if (diffDays < 31) {
        setAffiliatePeriod(3);
        affiliatesDateChange(3, [from, to]);
      } else if (diffDays > 30 && diffDays < 400) {
        setAffiliatePeriod(4);
        affiliatesDateChange(4, [from, to]);
      } else {
        setAffiliatePeriod(5);
        affiliatesDateChange(5, [from, to]);
      }
    }
  };

  const handleSalesCancel = () => {
    setIsSalesModalVisible(false);
  };

  const handleAffiliateCancel = () => {
    setIsAffiliateModalVisible(false);
  };

  const [popUpMobile, setPopUpMobile] = useState<'horizontal' | 'vertical' | undefined>('horizontal');

  const mobileScreen = window.matchMedia('(max-width: 1000px)');

  const setLayout = useMemo(() => {
    if (mobileScreen.matches) {
      setPopUpMobile('vertical');
      popUpMobile;
    }
    return popUpMobile;
  }, [popUpMobile!]);

  return (
    <Layout className="dashboard-container">
      <div className="general-section">
        <h1>General</h1>
        <Row className="general-cols" gutter={[0, 15]}>
          <Col className="products" xs={24} lg={10}>
            <h3>Products</h3>
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
                <h4>Free Plan</h4>
                <Link className="redirection-link upgrade" to="/subscriptions">
                  <h4 className="upgrade-txt">Upgrade your plan</h4>
                </Link>
              </div>
            </div>
          </Col>
          <Col className="stores" xs={24} lg={10}>
            <h3>Your stores</h3>
            <SearchInput onSearch={onSearch} />
            <DataTable
              dataSource={searchedChannels.length ? searchedChannels : channels}
              columns={columns}
              totalItems={searchedChannels.length ? searchedChannels.length : channels.length}
              pageSize={postPerPage}
              setPostPerPage={setPostPerPage}
            />
            <Link to="/new-channel" className="alternative-link">
              Add new channel
            </Link>
          </Col>
        </Row>
      </div>
      <div className="general-section">
        <div className="charts-sales">
          <h1>Sales</h1>
          <div className="date-picker" onClick={() => setIsSalesModalVisible(true)}>
            <h4>
              <strong>From </strong>
              {startFrom} <strong> To </strong> {endTo}
            </h4>{' '}
            <CalendarOutlined />
          </div>
          <Row className="general-cols" gutter={[0, 15]}>
            <Col className="products" xs={24} lg={10}>
              <h3>Total orders</h3>
              <h2>{totalOrders ? totalOrders.toLocaleString('en') : '0'}</h2>
              <Chart options={orderChartData} series={orderChartData.series} type="line" width="100%" />
            </Col>
            <Col className="products" xs={24} lg={10}>
              <h3>Total profit</h3>
              <h2>
                {getCurrency()}
                {totalProfit ? totalProfit.toLocaleString('en', { maximumFractionDigits: 0 }) : '0'}
              </h2>
              <Chart options={profitChartData} series={profitChartData.series} type="line" width="100%" />
            </Col>
          </Row>
        </div>
      </div>

      <div className="other-services">
        <h1>Other Services</h1>
        <Row className="other-services-cols" gutter={[0, 15]}>
          <Col className="listing-service" xs={24} lg={10}>
            <div className="listing-service-title">
              <h3>Listing Service</h3>
              <Link to={Links.Services}>Go to services</Link>
            </div>
            {listingServicesResult?.length ? (
              <List
                itemLayout="horizontal"
                dataSource={listingServicesResult}
                header={<h4>Active services</h4>}
                renderItem={() =>
                  listingServicesResult.map((l: ListingService) => (
                    <div key={l.id}>
                      <div className="item-description">
                        <div className="service-quantity">
                          <h5>{l.listings} listing service</h5>
                        </div>
                        <Link to={'/setup-preferences'} className="setup-link">
                          <h5>Set up your preferences</h5>
                        </Link>
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
              <h3>No API Server</h3>
              <QuestionCircleOutlined style={{ fontSize: '19px' }} />
            </div>
            {noApiServersResult?.length ? (
              <List
                itemLayout="horizontal"
                header={
                  <div className="no-api-title">
                    <div>
                      <h4>Connected channels</h4>
                    </div>
                    <div>
                      <h4>Next Payment</h4>
                    </div>
                  </div>
                }
                footer={
                  <div className="add-servers">
                    <a
                      href="https://hustlegotreal.com/en/no-api-server/"
                      rel="noreferrer"
                      target="_blank"
                      className="footer-link"
                    >
                      <PlusCircleOutlined style={{ fontSize: '16px' }} />
                      <h4>Add more servers</h4>
                    </a>
                  </div>
                }
                dataSource={listingServicesResult}
                renderItem={() =>
                  noApiServersResult.map((s: NoApiServer) => (
                    <div key={s.id}>
                      <div className="item-description">
                        <Link to={'/configure-no-api-server'} className="setup-link">
                          <h5>Choose your channel</h5>
                        </Link>
                        <div className="next-payment">
                          <h5>
                            {s.cancelled && 'Canceled'}. Ends on {moment(s.nextPayment).format('DD/MM/YYYY')}
                          </h5>
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
            <PopupModal
              open={open}
              width={800}
              style={{ top: 20 }}
              bodyStyle={{ height: 600 }}
              handleClose={handleOpenModal}
            >
              <BuyTokens />
            </PopupModal>
            <h3 className="tokens-title">Tokens - Title Optimization</h3>
            <div className="tokens-count">
              <p>
                With each token we can optimize on title. We use our algorithm to choose the title the best keyword for
                your product. As you know, optimizing your titles offers different benefits: Ranking higher on eBays
                search results, we analyse sold items by category, boost your sales, save time, etc.
              </p>

              <SuccessBtn handleConfirm={handleOpenModal}>
                <strong>Get more tokens</strong>
              </SuccessBtn>
              <Link to="/products" className="alternative-link">
                <p>Optimize your existing products</p>
              </Link>
            </div>
          </Col>

          <Col className="auto-ordering" xs={24} lg={10}>
            <div className="auto-ordering-title">
              <h3>Auto Ordering</h3>
              <QuestionCircleOutlined style={{ fontSize: '19px' }} />
            </div>
            <div className="use-auto-ordering">
              <p>
                Forget about processing your orders manually. They will now be processed automatically and you will be
                able to configure and manage your auto ordering settings directly from your HGR account.
              </p>

              <SuccessBtn>
                <Link to="/auto-ordering-configuration" className="alternative-link">
                  Configure Auto Ordering
                </Link>
              </SuccessBtn>
            </div>
          </Col>
        </Row>
      </div>
      <div className="affiliates-main-container">
        <h1>Affiliates</h1>
        <div className="affiliates-contents">
          <div className="affiliates-title">
            <h3>Your affiliate link</h3>
            <QuestionCircleOutlined style={{ fontSize: '19px' }} />
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
            <Link to={Links.AffiliateDashboard}>
              <ConfirmBtn>Affiliate dashboard</ConfirmBtn>
            </Link>
          </div>

          <div className="general-section">
            <div className="charts-sales">
              <div className="date-picker" onClick={() => setIsSalesModalVisible(true)}>
                <h4>
                  <strong>From </strong>
                  {affiliateStartFrom} <strong> To </strong> {affiliateEndTo}
                </h4>{' '}
                <CalendarOutlined />
              </div>

              <h3>Total affiliates</h3>
              <h2>{totalAffiliates ? totalAffiliates.toLocaleString('en') : '0'}</h2>
              <Chart
                options={affiliateChartData}
                series={affiliateChartData.series}
                type="line"
                width="100%"
                height={400}
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
      <Modal
        className="modal-datepicker"
        title=""
        key="salespickerModel"
        visible={isSalesModalVisible}
        onOk={salesModalOk}
        onCancel={handleSalesCancel}
        okText="Apply"
      >
        <DateRangePicker
          className="range-datepicker"
          key="dpSales"
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction={setLayout}
        />
      </Modal>
      <Modal
        className="modal-datepicker"
        title=""
        key="affiliatePickerModal"
        visible={isAffiliateModalVisible}
        onOk={affiliateModalOk}
        onCancel={handleAffiliateCancel}
        okText="Apply"
      >
        <DateRangePicker
          className="range-datepicker"
          key="dpAffiliate"
          onChange={(item) => setAffiliateState([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={affiliateState}
          direction={setLayout}
        />
      </Modal>
    </Layout>
  );
};
