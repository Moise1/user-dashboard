import { Layout, Menu } from 'antd';
import pin_icon from '../../assets/pin.svg';
import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';
import logout from '../../assets/logout.svg';
import {
  DashBoardIcon,
  CatalogIcon,
  ListNowIcon,
  ListingsIcon,
  ServiceIcon,
  SettingsIcon,
  HelpIcon,
  OrdersIcon
} from '../common/Icons';
import MenuListItem from './MenuListItem';
import './Sidebar.css';
import '../../sass/light-theme/side-bar.scss';
import Logo from '../../assets//logoHGR.png';

const { SubMenu } = Menu;

const { Sider } = Layout;
interface Props {
  collapsed: boolean;
  toggle: () => void;
  staticvalue: boolean;
  togglestatic: () => void;
}

let darkApplied = false;
async function toggleDarkTheme() {
  if (darkApplied) {
    const element = document.getElementById('darkThemeLink');
    element?.parentElement?.removeChild(element);
  } else {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.id = 'darkThemeLink';
    link.rel = 'stylesheet';
    link.href = './_variables.dark.css';
    document.head.appendChild(link);
  }
  darkApplied = !darkApplied;
}

const Sidebar = (props: Props) => {
  const history = useHistory();

  const routeChange = () => {
    history.push('/home');
  };
  const { collapsed, staticvalue, togglestatic } = props;

  const windowwidth = window.innerWidth;
  // FOR CLOSE SIDEBAR AND CHANGE ROUTE
  const handleSourcesSidebarClose = () => {
    history.push('/sources');

    // IF TOGGLE BUTTON SHOW ON TOP BAR, ONLY THEN CLOSE SIDEBAR OR IN MOBILE
    if (windowwidth < 992) {
      togglestatic();
    }
  };

  // FOR CLOSE SIDEBAR AND CHANGE ROUTE
  const handleOrdersSidebar = () => {
    history.push('/orders');
    if (windowwidth < 992) {
      togglestatic();
    }
  };
  // FOR CLOSE SIDEBAR AND CHANGE ROUTE
  const handleCloseLlistingSidebar = () => {
    history.push('/listings');
    if (windowwidth < 992) {
      togglestatic();
    }
  };

  const listArray = [
    { key: 9, listName: t('Menu.Channel') },
    { key: 10, listName: t('Menu.Sources'), onClick: () => handleSourcesSidebarClose() },
    { key: 11, listName: t('Menu.PricingRules'), onClick: () => history.push('/pricing-rules') },
    { key: 12, listName: t('Menu.BrowserExtensions') },
    { key: 13, listName: t('Menu.Subscriptions'), onClick: () => history.push('/subscriptions') },
    { key: 14, listName: t('Menu.VAProfile') },
    { key: 15, listName: t('Menu.Templates') },
    { key: 16, listName: '+/- Dark', onClick: () => toggleDarkTheme() }
  ];

  const helplistArray = [
    { key: 511, listName: t('Menu.Channel') },
    { key: 512, listName: t('Menu.Sources') },
    { key: 513, listName: t('Menu.PricingRules') }
  ];

  return (
    <Sider
      theme="light"
      className="sidebar-container"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width="var(--expandedSiderWidth)"
      collapsedWidth="var(--siderWidth)"
    >
      <div className="side-menu-container">
        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
          {!collapsed && (
            <div className="sidebar-overhead">
              <div className="logo-container">
                <img className="logo" src={Logo} alt="logo" />
                <h1 className="logo-text">HGR</h1>
              </div>

              <div className="quota-container">
                <div className="quota">
                  <strong className="quota-text">
                    <p>{t('Topbar.Quota')}: &nbsp;</p>
                  </strong>
                  <span className="quota-progress">45% (12/13)</span>
                </div>

                <button type="button" className="update-btn">
                  {t('Topbar.Update')}
                </button>
              </div>
              <div className="sidebar-btns">
                {staticvalue ? (
                  <i onClick={togglestatic} className="fas fa-chevron-left"></i>
                ) : (
                  <button className="sidebar-pin">
                    <img onClick={togglestatic} className="" src={pin_icon} height={20} width={20} alt="" />
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="pt-5"></div>
          <Menu.Item key="1" style={{ fontSize: '18px', fontWeight: 'bold' }} icon={<DashBoardIcon />}>
            {t('Menu.Dashboard')}
          </Menu.Item>
          <Menu.Item style={{ fontSize: '18px', fontWeight: 'bold' }} key="2" icon={<CatalogIcon />}>
            <span className="sidebar_element">{t('Menu.Catalog')}</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push('/sources')}
            style={{ fontSize: '18px', fontWeight: 'bold' }}
            key="3"
            icon={<ListNowIcon />}
          >
            {t('Menu.ListNow')}
          </Menu.Item>
          <Menu.Item
            onClick={() => handleCloseLlistingSidebar()}
            key="4"
            style={{ fontSize: '18px', fontWeight: 'bold' }}
            icon={
              <span onClick={routeChange}>
                <ListingsIcon />
              </span>
            }
          >
            {t('Menu.Listings')}
          </Menu.Item>
          <Menu.Item
            onClick={() => handleOrdersSidebar()}
            key="5"
            style={{ fontSize: '18px', fontWeight: 'bold' }}
            icon={
              <span>
                <OrdersIcon />
              </span>
            }
            title={t('Menu.Orders')}
          >
            Orders
          </Menu.Item>

          {/* SETTINGS LIST ITEMS .  */}
          <SubMenu
            key="sub3"
            style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
            icon={<SettingsIcon />}
            title={t('Menu.Settings')}
          >
            {listArray.map((obj) => (
              <Menu.Item key={obj.key} onClick={obj.onClick}>
                <MenuListItem listName={obj.listName} />
              </Menu.Item>
            ))}
          </SubMenu>

          {/* SERVICES  */}
          <Menu.Item
            style={{ fontSize: '18px', fontWeight: 'bold' }}
            key="2"
            icon={<ServiceIcon />}
            onClick={() => history.push('/services')}
          >
            <span>{t('Menu.Services')}</span>
          </Menu.Item>

          <SubMenu
            key="sub5"
            style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
            icon={<HelpIcon />}
            title={t('Menu.Help')}
          >
            {helplistArray.map((obj) => (
              <Menu.Item key={obj.key}>
                <MenuListItem listName={obj.listName} />
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
        <button className="logout">
          <img src={logout} />
          <span className={collapsed ? 'hide-logout-text' : 'logout-text'}> {t('Menu.Logout')}</span>
        </button>
      </div>
    </Sider>
  );
};

export default Sidebar;
