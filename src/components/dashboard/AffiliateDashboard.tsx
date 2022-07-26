import { Link } from 'react-router-dom';
import { CalendarOutlined, LeftOutlined, RiseOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Links } from '../../links';
import { useEffect } from 'react';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getAffiliateDashboard } from '../../redux/dashboard/affiliatesStatsThunk';
import '../../sass/affiliate-dashboard.scss';

import { SimpleTable } from 'src/small-components/tables/simple-table';

export const AffiliateDashboard = () => {
  //const { affiliateDashboard } = useAppSelector((state) => state.affiliateDashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAffiliateDashboard({ month: 11, year: 2021 }));
  }, [getAffiliateDashboard]);

  const affColumns = [
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Registred on',
      dataIndex: 'registredOn'
    },
    {
      title: 'Total revenue',
      dataIndex: 'totalRevenue',
      rowClassName: 'totalRevenue'
    },
    {
      title: 'Subscription',
      dataIndex: 'subscriptionRevenue'
    },
    {
      title: 'We list for you',
      dataIndex: 'wlfRevenue'
    },
    {
      title: 'Tokens',
      dataIndex: 'tokensRevenue'
    },
    {
      title: 'No api server',
      dataIndex: 'noapiRevenue'
    }
  ];

  const affData = [
    {
      email: 'testing@hustlegotreal.com',
      registredOn: '22/07/2022',
      totalRevenue: '+$443',
      subscriptionRevenue: '+$210',
      wlfRevenue: '+$0',
      tokensRevenue: '+$44',
      noapiRevenue: '+$4'
    },
    {
      email: 'example@hustlegotreal.com',
      registredOn: '12/07/2022',
      totalRevenue: '+$222',
      subscriptionRevenue: '+$11',
      wlfRevenue: '+$22',
      tokensRevenue: '+$0',
      noapiRevenue: '+$0'
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
            <SimpleTable columns={affColumns} dataSource={affData} />
          </div>
        </div>
      </div>
    </div>
  );
};
