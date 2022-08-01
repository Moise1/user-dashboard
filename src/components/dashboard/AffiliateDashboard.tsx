import { Link } from 'react-router-dom';
import { LeftOutlined, RiseOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/affiliate-dashboard.scss';

import { DataTable } from 'src/small-components/tables/data-table';
import { getAffiliateDashboard } from 'src/redux/dashboard/affiliatesStatsThunk';
import { useEffect, useState } from 'react';
import { DatePicker, Divider, Spin } from 'antd';
import { Moment } from 'moment';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
Chart.register(ArcElement, Tooltip);

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
      title: 'Total revenue',
      dataIndex: 'totalCommission',
      rowClassName: 'totalCommission',
      render: (totalCommission: string) => <>+&#163;{totalCommission} </>
    },
    {
      title: 'Subscription Commission',
      dataIndex: 'subscriptionCommission',
      render: (subscriptionCommission: string) => <>+&#163;{subscriptionCommission} </>
    },
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

  /*   const registerColumns = [
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
  ]; */

  const data = {
    labels: ['totalSignups', 'referralsLinked', 'referralsListed'],
    datasets: [
      {
        label: 'Referrals performance',
        data: [
          affiliatesDashboard.totalSignups,
          affiliatesDashboard.referralsLinked,
          affiliatesDashboard.referralsListed
        ],
        backgroundColor: ['#262e80', '#3a66ce', '#5e84db'],
        hoverOffset: 5
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
        <h2 className="main-title">Overview</h2>
        <div className="first-section">
          <div className="pie-chart-section">
            <div className="pie-chart">
              <Doughnut data={data} />
            </div>
            <div className="stats-pie-chart">
              <div className="total-registers">
                <h5>Total registers: {affiliatesDashboard.totalSignups}</h5>
              </div>
              <div className="registers-w-store">
                <h5>
                  Registers with store: {affiliatesDashboard.referralsLinked} ({affiliatesDashboard.percentageLinked}%)
                </h5>
              </div>
              <div className="registers-w-products">
                <h5>
                  Registers with products: {affiliatesDashboard.referralsListed} ({affiliatesDashboard.percentageListed}
                  %)
                </h5>
              </div>
            </div>
          </div>
          <div className="general-stats">
            <div className="general-stat">
              <h4>% Commission:</h4>
              <h3 className="stat-content">20%</h3>
            </div>
            <div className="general-stat">
              <h4>Accumulative revenue</h4>
              <h3 className="stat-content">£{affiliatesDashboard.totalCommissionTillDate}</h3>
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
              <h3 className="stat-content">{affiliatesDashboard.totalSignupsThisMonth}</h3>
            </div>

            <div className="stat">
              <div className="stat-header">
                <h4 className="stat-title">Revenue</h4>
                <RiseOutlined />
              </div>
              <h3 className="stat-content">£{affiliatesDashboard.totalCommission}</h3>
            </div>
            <div className="stat">
              <div className="stat-header">
                <h4 className="stat-title">Revenue by register</h4>
                <UserAddOutlined />
              </div>
              <h3 className="stat-content">£{affiliatesDashboard.revenueBySignup}</h3>
            </div>
          </div>

          <div className="table-stats">
            <h2 className="main-title">Revenue of your referrals</h2>
            {loading ? <Spin /> : <DataTable dataSource={affiliatesDashboard?.affiliateHistory} columns={affColumns} />}
          </div>
          <Divider />
          {/*           <div className="table-registers">
            <h2>Your registered users</h2>
            {loading ? (
              <Spin />
            ) : (
              <DataTable dataSource={affiliatesDashboard?.userWiseHistory} columns={registerColumns} />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
