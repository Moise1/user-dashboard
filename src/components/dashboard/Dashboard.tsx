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
  LineElement,
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
import { Moment } from 'moment';
import { Sale, ePeriod } from 'src/redux/sales/salesSlice';
import { getNoApiServers } from 'src/redux/dashboard/noApiServersThunk';
import { getListingServices } from 'src/redux/dashboard/listingServicesThunk';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { NoApiServer } from 'src/redux/dashboard/noApiServersSlice';
import { BookOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Selector, SelectorValue } from '../../small-components/form/selector';
import { affiliatesGraphConfig, /*salesGraphConfig*/ } from 'src/utils/graphConfig';
import { getAffiliatesStats } from 'src/redux/dashboard/affiliatesStatsThunk';
import '../../sass/dashboard.scss';
import '../../sass/action-btns.scss';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from '../topbar/BuyTokens';
import { ProductQuota } from 'src/redux/user/userSlice';
import { DateRangePicker, Range } from 'react-date-range';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { addDays } from 'date-fns';
import Modal from 'antd/lib/modal/Modal';

const { RangePicker } = DatePicker;
export const Dashboard = () => {
  //For pagination add by suleman ahmad
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
  const [current, setCurrent] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => setOpen(!open);

  const monthsLabels = [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('MMM-YY')))];

  //const { salesOptions, salesData } = salesGraphConfig(selectedPeriod, sales, monthsLabels);
  const { affiliatesOptions, affiliatesData } = affiliatesGraphConfig(selectedPeriod, affiliatesStats, monthsLabels);
  const onSearch = (value: string) => {
    setSearchedChannels(channels.filter((c: Channel) => {
      if (c.name.toLowerCase().includes(value.toLowerCase())) {
        return c;
      }
    }));
  };

  const removeRecord = async (id: Channel['id']) => {
    await dispatch(deleteChannel(id));
    dispatch(getChannels());
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
        from: moment(Date.now.toString()).year(-1).toJSON()
      }));
  }, [getSales]);

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

  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, LineElement);

  const periodOptions = [
    { value: 3, label: 'Daily basis' },
    { value: 4, label: 'Monthly basis' }
  ];

  const onSelectOption = (value: SelectorValue) => {
    setSelectedPeriod(value as number);
  };

  const salesDateChange = async (value: Moment | null | RangeValue<Moment> | number, dateString: string | [string, string]) => {
    if (Array.isArray(dateString)) {
      await dispatch(
        getSales({
          period: value as unknown as number,
          from: dateString[0],
          to: dateString[1]
        })
      );
    } else {
      await dispatch(
        getSales({
          period: value as unknown as number,
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

  const totalOrders = sales?.reduce((total: number, sale: { quantitySold: number; }) => total = total + sale.quantitySold, 0);

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
          return [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD hh:mm A').utc().format('hhA DD')))];
        case ePeriod.Days: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('DD-MMM')))];
        }
        case ePeriod.Weeks: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('DD-MMM')))];
        }
        case ePeriod.Months: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('MMM-YY')))];
        }
        case ePeriod.Year: {
          return [...new Set(sales?.map((d: Sale) => moment(d.date, 'YYYY-MM-DD').utc().format('YYYY')))];
        }
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

  const orderChartData: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
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
        name: 'Sale Orders: ',
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
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
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
      },
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
        name: 'Profit: ',
        data: profitData
      }
    ]
  };

  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const handleOk = () => {
    setIsModalVisible(false);
    if (state[0]) {
      const startDate: Date = state[0].startDate ? moment(state[0].startDate).add(1, 'days').toDate() : moment(Date.now.toString()).year(-1).toDate();
      const endDate: Date = state[0].endDate ? moment(state[0].endDate).add(1, 'days').toDate() : moment(Date.now.toString()).toDate();
      const diff = Math.abs(startDate.getTime() - endDate.getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      console.log('days: ' + diffDays);
      if (diffDays < 3) {
        setSelectedPeriod(6);
        salesDateChange(6, [startDate.toJSON(), endDate.toJSON()]);
      }
      else if (diffDays > 2 && diffDays < 31) {
        setSelectedPeriod(3);
        salesDateChange(3, [startDate.toJSON(), endDate.toJSON()]);
      }
      else if (diffDays > 30 && diffDays < 181) {
        setSelectedPeriod(7);
        salesDateChange(7, [startDate.toJSON(), endDate.toJSON()]);
      }
      else if (diffDays > 180 && diffDays < 400) {
        setSelectedPeriod(4);
        salesDateChange(4, [startDate.toJSON(), endDate.toJSON()]);
      }
      else {
        setSelectedPeriod(5);
        salesDateChange(5, [startDate.toJSON(), endDate.toJSON()]);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
              current={current}
              onChange={setCurrent}
            />

            <Link to="/new-channel" className="alternative-link">
              Add new channel
            </Link>
          </Col>
        </Row>
      </div>

      <div className='charts-header-section'>
        <Row className="general-cols" gutter={[0, 15]}>
          <Col className="products" xs={24} lg={10}>
            <h1>Orders & Profit Chart</h1>
          </Col>
          <Col className="products" xs={24} lg={10}>
            <div className="graph-date-picker" onClick={() => setIsModalVisible(true)}>
              <ConfirmBtn>Select date for the Charts</ConfirmBtn>
            </div>
          </Col>
        </Row>
      </div>

      <div className="general-section-chart">
        <Row className="general-cols" gutter={[0, 15]}>
          <Col className="products" xs={24} lg={10}>
            <h1>Orders</h1>
            {totalOrders ? <h4>TOTAL ORDERS: {totalOrders}</h4> : ''}
            <Chart options={orderChartData} series={orderChartData.series} type="line" width='100%' height={400} />
          </Col>

          <Col className="products" xs={24} lg={10}>
            <h1>Profit</h1>
            {totalProfit ? <h4>TOTAL PROFIT: {totalProfit.toFixed(0)}</h4> : ''}
            <Chart options={profitChartData} series={profitChartData.series} type="line" width='100%' height={400} />
          </Col>
        </Row>
      </div>

      <div className="other-services">
        <h1>Other Services</h1>
        <Row className="other-services-cols" gutter={[0, 15]}>
          <Col className="listing-service" xs={24} lg={10}>
            <div className="listing-service-title">
              <h3>Listing Service</h3>
              <BookOutlined style={{ fontSize: '19px' }} />
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
              <BookOutlined style={{ fontSize: '19px' }} />
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
              <p>Not sure what to list? We can help you find good selling items.</p>
              <p> We choose the best products and list them for you</p>
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
              <BookOutlined style={{ fontSize: '19px' }} />
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
              <div>
                <Selector placeHolder="Select a period" onChange={onSelectOption}>
                  {periodOptions}
                </Selector>
              </div>
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
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={925}
      >
        <DateRangePicker
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
      </Modal>
    </Layout >
  );
};
