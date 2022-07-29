import { Link } from 'react-router-dom';
import { LeftOutlined, RiseOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/affiliate-dashboard.scss';

import { DataTable } from 'src/small-components/tables/data-table';
import { getAffiliateDashboard } from 'src/redux/dashboard/affiliatesStatsThunk';
import { useEffect, useState } from 'react';
import { DatePicker, Spin } from 'antd';
import { Moment } from 'moment';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

export const AffiliateDashboard = () => {
  const dispatch = useAppDispatch();
  const { affiliatesDashboard, loading } = useAppSelector((state) => state.affiliatesDashboard);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    dispatch(getAffiliateDashboard({ month: month, year: year }));
  }, [getAffiliateDashboard, month, year]);

  useEffect(() => {
    dispatch(getAffiliateDashboard({ month: month, year: year }));
  }, [getAffiliateDashboard]);

  const handleDatePickerChange = (date: Moment | null, dateString: string) => {
    if (dateString != '') {
      const dates = dateString.split('-');
      setMonth(dates[1] as unknown as number);
      setYear(dates[0] as unknown as number);
    }
  };

  const affColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => (
        <>
          {email.substring(0, 5)} ******{email.substring(25, 20)}
        </>
      )
    },
    {
      title: 'Registred on',
      dataIndex: 'createdOn'
    },
    {
      title: 'Total revenue',
      dataIndex: 'totalCommission',
      rowClassName: 'totalCommission',
      render: (totalCommission: string) => <>+&#163;{totalCommission} </>
    },
    //{
    //  title: 'Subscription',
    //  dataIndex: 'subscriptionRevenue'
    //},
    {
      title: 'We list for you',
      dataIndex: 'weListForYouCommission',
      render: (weListForYouCommission: string) => <>+&#163;{weListForYouCommission} </>
    },
    {
      title: 'Tokens',
      dataIndex: 'tokensCommission',
      render: (tokensCommission: string) => <>+&#163;{tokensCommission} </>
    },
    {
      title: 'No api server',
      dataIndex: 'noApiCommission',
      render: (noApiCommission: string) => <>+&#163;{noApiCommission} </>
    }
  ];

  const registerColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => (
        <>
          {email.substring(0, 5)} ******{email.substring(25, 20)}
        </>
      )
    },
    {
      title: 'Registred on',
      dataIndex: 'createdOn'
    }
  ];

  const data = {
    labels: ['dasdasdas', 'asdasdasd', 'asdas'],
    datasets: [
      {
        label: 'Referrals performance',
        data: [
          affiliatesDashboard.totalSignups,
          affiliatesDashboard.referralsLinked,
          affiliatesDashboard.referralsListed
        ],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  };

  console.log(affiliatesDashboard);

  return (
    <div className="affiliate-dashboard-container">
      <Link to={Links.Dashboard} className="back-to-dashboard">
        <span>
          <LeftOutlined style={{ fontSize: '19px' }} />
        </span>
        Back to dashboard
      </Link>
      <div className="affiliate-dashboard">
        <div className="first-section">
          <div className="pie-chart">{loading ? <Spin /> : <Doughnut data={data} />}</div>
          <div className="general-stats">
            <div className="general-stat">
              <h4>% Commission:</h4>
              <h3 className="stat-content">20%</h3>
            </div>
            <div className="general-stat">
              <h4>Accumulative revenue</h4>
              <h3 className="stat-content">£24522</h3>
            </div>
            <div className="general-stat">
              <h4>Registers performance</h4>
              <h5>Total registers: {affiliatesDashboard.totalSignups}</h5>
              <h5>Registers with store: {affiliatesDashboard.referralsLinked}</h5>
              <h5>Registers with products: {affiliatesDashboard.referralsListed}</h5>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="month-selector">
            <DatePicker onChange={handleDatePickerChange} picker="month" />
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-header">
                <h4 className="stat-title">Registers</h4>
                <UserOutlined />
              </div>
              <h3 className="stat-content">{loading ? <Spin /> : affiliatesDashboard.totalSignupsThisMonth}</h3>
            </div>

            <div className="stat">
              <div className="stat-header">
                <h4 className="stat-title">Revenue</h4>
                <RiseOutlined />
              </div>
              <h3 className="stat-content">£{loading ? <Spin /> : affiliatesDashboard.totalCommission}</h3>
            </div>
            <div className="stat">
              <div className="stat-header">
                <h4 className="stat-title">Revenue by register</h4>
                <UserAddOutlined />
              </div>
              <h3 className="stat-content">£{loading ? <Spin /> : affiliatesDashboard.revenueBySignup}</h3>
            </div>
          </div>

          <div className="table-stats">
            <h2>Revenue of your referrals</h2>
            {loading ? <Spin /> : <DataTable dataSource={affiliatesDashboard?.userWiseHistory} columns={affColumns} />}
          </div>
          <div className="table-registers">
            <h2>Your registered users</h2>
            <h2>Your registered users</h2>
            {loading ? (
              <Spin />
            ) : (
              <DataTable dataSource={affiliatesDashboard?.userWiseHistory} columns={registerColumns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
