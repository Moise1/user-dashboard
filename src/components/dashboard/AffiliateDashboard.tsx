import { Link } from 'react-router-dom';
import { CalendarOutlined, LeftOutlined, RiseOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/affiliate-dashboard.scss';
import { AffiliatesDashboardStats } from 'src/redux/dashboard/affiliatesStatsSlice';

import { Spin } from 'antd';
import { DataTable } from 'src/small-components/tables/data-table';

export const AffiliateDashboard = () => {
  const { affiliatesDashboard, loading } = useAppSelector(
    (state) => state.affiliatesDashboard as AffiliatesDashboardStats
  );

  console.log(affiliatesDashboard);

  const affColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'Registred on',
      dataIndex: 'registredOn',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'Total revenue',
      dataIndex: 'totalRevenue',
      rowClassName: 'totalRevenue',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'Subscription',
      dataIndex: 'subscriptionRevenue',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'We list for you',
      dataIndex: 'wlfRevenue',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'Tokens',
      dataIndex: 'tokensRevenue',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'No api server',
      dataIndex: 'noapiRevenue',
      render: (value: string, record: AffiliatesDashboardStats) =>
        value ? (
          <div className="template-name">
            <h4>{record.noApiServerCommission}</h4>
          </div>
        ) : (
          ''
        )
    }
  ];

  return (
    <div className="affiliate-dashboard-container">
      <Link to={Links.Dashboard} className="back-to-dashboard">
        <span>
          <LeftOutlined style={{ fontSize: '19px' }} />
        </span>
        Back to dashboard
      </Link>
      <div className="affiliate-dashboard">
        <div className="commission-perc-container">
          <h2 className="com-title">Your commission:</h2>
          <h2 className="commission">20%</h2>
        </div>

        <div className="info-section">
          <div className="date-picker">
            <h4>
              <strong>From </strong>
              11-01-02 <strong> To </strong> 11-01-02
            </h4>
            <CalendarOutlined />
          </div>
          <div className="general-stats">
            <div className="general-stat">
              <div className="general-stat-header">
                <h4 className="general-stat-title">Total registers</h4>
                <UserOutlined />
              </div>
              <h3 className="general-stat-content">42</h3>
            </div>
            <div className="general-stat">
              <div className="general-stat-header">
                <h4 className="general-stat-title">% of listed registers</h4>
              </div>
              <h3 className="general-stat-content">16%</h3>
            </div>
            <div className="general-stat">
              <div className="general-stat-header">
                <h4 className="general-stat-title">Total Revenue</h4>
                <RiseOutlined />
              </div>
              <h3 className="general-stat-content">$41200</h3>
            </div>
            <div className="general-stat">
              <div className="general-stat-header">
                <h4 className="general-stat-title">Revenue by register</h4>
                <UserAddOutlined />
              </div>
              <h3 className="general-stat-content">$34</h3>
            </div>
          </div>

          <div className="table-stats">
            <h2>Revenue of your referrals</h2>
            {loading ? (
              <Spin />
            ) : (
              <DataTable
                dataSource={affiliatesDashboard}
                columns={affColumns}
                totalItems={affiliatesDashboard.length}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
