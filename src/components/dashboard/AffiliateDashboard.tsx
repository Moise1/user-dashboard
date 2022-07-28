import { Link } from 'react-router-dom';
import { CalendarOutlined, LeftOutlined, RiseOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import '../../sass/affiliate-dashboard.scss';

import { DataTable } from 'src/small-components/tables/data-table';
import { getAffiliateDashboard } from 'src/redux/dashboard/affiliatesStatsThunk';
import { useEffect } from 'react';
import { Spin } from 'antd';

export const AffiliateDashboard = () => {
  const dispatch = useAppDispatch();
  const { affiliatesDashboard, loading } = useAppSelector((state) => state.affiliatesDashboard);

  useEffect(() => {
    dispatch(getAffiliateDashboard({ month: 7, year: 2021 }));
  }, [getAffiliateDashboard]);

  const affColumns = [
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Registred on',
      dataIndex: 'createdOn'
    },
    {
      title: 'Total revenue',
      dataIndex: 'totalRevenue',
      rowClassName: 'totalRevenue',
      render: (totalRevenue: string) => <>&#163;{totalRevenue} </>
    },
    //{
    //  title: 'Subscription',
    //  dataIndex: 'subscriptionRevenue'
    //},
    {
      title: 'We list for you',
      dataIndex: 'weListForYouRevenue',
      render: (weListForYouRevenue: string) => <>&#163;{weListForYouRevenue} </>
    },
    {
      title: 'Tokens',
      dataIndex: 'tokensRevenue',
      render: (tokensRevenue: string) => <>&#163;{tokensRevenue} </>
    },
    {
      title: 'No api server',
      dataIndex: 'noApiRevenue',
      render: (noApiRevenue: string) => <>&#163;{noApiRevenue} </>
    }
  ];

  //const affDummyData = [
  //  {
  //    email: 'test@gmail.com',
  //    registredOn: '22/07/2022',
  //    totalRevenue: '+$225',
  //    subscriptionRevenue: '+$21',
  //    wlfRevenue: '+$55',
  //    tokensRevenue: '+$20',
  //    noapiRevenue: '+$0'
  //  }
  //];

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
              <DataTable dataSource={affiliatesDashboard.userWiseHistory} columns={affColumns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
