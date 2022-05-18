import { useEffect, useState } from 'react';
import { Button, Col, Input, Popconfirm, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Link } from 'react-router-dom';
import { Book } from 'react-feather';
import miniAlert from 'mini-alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TooltipItem,
  ChartType
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
// import { faker } from '@faker-js/faker';
// import months from 'months';
import moment from 'moment';
// import 'chartjs-adapter-date-fns';
// import { enGB } from 'date-fns/locale';
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
import '../../sass/dashboard.scss';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// import { Key } from 'antd/lib/table/interface';

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
  const { sales } = useAppSelector((state) => state.sales);
  const [, setIsCopied] = useState<boolean>(false);
  const [affiliate, setAffiliate] = useState<string>('');
  const [productQuota, setProductQuota] = useState<ProductQuota>();
  const [daysPeriod, setDaysPeriod] = useState<boolean>(false);
  const [showSales, setShowSales] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [current] = useState<number>(1);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSearch = (value: string) => console.log('searched value', value);

  const removeRecord = async (id: Channel['id']) => {
    await dispatch(deleteChannel(id));
    dispatch(getChannels());
  };
  const handlePeriodChange = () => setDaysPeriod(!daysPeriod);
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

  // const onSelectChange = (selectedRowKeys: Key[]) => {
  //   setSelectedRowKeys(selectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange
  // };

  // const [columns, setColumns] = useState(tableColumns);

  // const handleCheckBox = (e: CheckboxChangeEvent): void => {
  //   const cloneColumns = columns.map((col) => {
  //     if (col.key === e.target.value) {
  //       return { ...col, visible: e.target.checked };
  //     } else {
  //       return col;
  //     }
  //   });
  //   setColumns(cloneColumns);
  // };

  // console.log(handleCheckBox);

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

  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Sales Chart'
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<ChartType>[]) => {
            const contextObj: { label?: string } = { ...context[0] };
            if(!daysPeriod) delete contextObj['label'];
            const date = sales.filter((s: Sale) => s.revenue === context[0]!.raw)[0].date;
            return moment(date).utc().format('YYYY-MM-DD | hh:mm A');
          }
        }
      }
    }
  };

  const daysLabel: string[] = [];
  for (let i = 1; i < 32; i++) {
    daysLabel.push(String(i));
  }
  const monthsLabel = sales?.map((d: Sale) => moment(d.date).utc().format('MMMM'));
  const data = {
    labels: daysPeriod ? daysLabel : monthsLabel,
    datasets: [
      {
        data: sales?.map((d: Sale) => d.revenue),
        backgroundColor: '#5e84db',
        borderColor: '#5e84db',
        borderWidth: 1
      }
    ]
  };

  // const initialRangePickerValue = localStorage.getItem('initialRangerPickerValue');
  // const initialDatePickerValue = localStorage.getItem('initialDatePickerValue');

  // console.log('DATE 1', initialDatePickerValue);
  // console.log('DATE 2', initialRangePickerValue);

  const submit = async () => {
    if (toDate === '') {
      await dispatch(
        getSales({
          period: daysPeriod ? 3 : 4,
          from: fromDate
        })
      );
      localStorage.setItem('initialDatePickerValue', fromDate);
    } else {
      await dispatch(
        getSales({
          period: daysPeriod ? 3 : 4,
          from: fromDate,
          to: toDate
        })
      );
      localStorage.setItem('initialRangerPickerValue', JSON.stringify([fromDate, toDate]));
    }
  };
  const onChange = (value: Moment | null | RangeValue<Moment>, dateString: string | [string, string]) => {
    if (Array.isArray(dateString)) {
      setFromDate(dateString[0]);
      setToDate(dateString[1]);
    } else {
      setFromDate(dateString);
    }
    submit();
  };

  const totalProfit = sales?.reduce((total: number, sale: Sale) => {
    return (total += sale.revenue! - (sale.sourcePrice! + sale.totalTax!));
  }, 0);

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
            <DataTable
              current={current}
              dataSource={channels}
              columns={columns}
              pageSize={2}
              total={channels.length}
              // rowSelection={rowSelection}
              // selectedRows={selectedRowKeys.length}
            />
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
            <Switch
              className="toggle-period"
              checked={daysPeriod}
              onChange={handlePeriodChange}
              checkedChildren="By day"
              unCheckedChildren="By month"
              aria-label="Dark mode toggle"
            />

            {daysPeriod ? <DatePicker onChange={onChange} /> : <RangePicker onChange={onChange} />}
            <Switch
              className="toggle-sales"
              checked={showSales}
              onChange={handleSalesChange}
              checkedChildren="Sales"
              unCheckedChildren="Profit"
              aria-label="Profit and sales toggle"
            />
          </div>
          <Row className="graph-progress-container">
            <Col span={18}>
              <Line options={options} data={data} className="sales-graph" style={{ maxHeight: 450 }} />
            </Col>
            <Col span={4} className='sales-profit-container'>
              <h4>Total {showSales ? 'sales' : 'profit'} {daysPeriod ? 'today': 'this month'}</h4>
              <div className="profit-circle">
                {showSales? sales.length : <>&euro; {totalProfit.toFixed(2)} </>}
              </div>
            </Col>
          </Row>
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
