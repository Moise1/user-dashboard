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
import '../../sass/light-theme/side-bar.scss';
import Logo from '../../assets/logoHGR.png';

const { SubMenu } = Menu;

const { Sider } = Layout;

interface Props {
  className: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggle: () => void;
  staticValue: boolean;
  togglestatic: () => void;
  handleSidebarMobile: () => void;
  collapseSideBar: () => void;
}

let darkApplied = false;
const toggleDarkTheme = async () => {
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
};

const Sidebar = (props: Props) => {
  const { collapsed, staticValue, togglestatic, className, setCollapsed, collapseSideBar } = props;
  const history = useHistory();

  const handleMouseEnter = () => {
    if (!staticValue) {
      setCollapsed(false);
      return;
    }
  };

  const handleMouseLeave = () => {
    if (!staticValue) {
      setCollapsed(true);
      return;
    }
  };

  const routeChange = (route: string) => {
    history.push(route);
    handleMouseLeave();
  };

  const listArray = [
    {
      key: 9,
      listName: t('Menu.Channel'),
      onClick: () => {
        history.push('/new-channel'), location.reload();
      }
    },
    { key: 10, listName: t('Menu.Sources'), onClick: () => routeChange('/sources') },
    { key: 11, listName: t('Menu.PricingRules'), onClick: () => routeChange('/pricing-rules') },
    { key: 12, listName: t('Menu.BrowserExtensions'), onClick: () => routeChange('/browser-extensions') },
    { key: 13, listName: t('Menu.Subscriptions'), onClick: () => routeChange('/subscriptions') },
    { key: 14, listName: t('Menu.VaProfiles'), onClick: () => routeChange('/va-profiles') },
    { key: 15, listName: t('Menu.Templates') },
    { key: 16, listName: '+/- Dark', onClick: () => toggleDarkTheme() }
  ];

  const helplistArray = [
    { key: 511, listName: t('Menu.Channel') },
    { key: 512, listName: t('Menu.Sources') },
    { key: 513, listName: t('Menu.PricingRules') }
  ];

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Sider
        theme="light"
        className={className}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="var(--expandedSiderWidth)"
        collapsedWidth="var(--siderWidth)"
      >
        <div className="side-menu-container">
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} className="menu-container">
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
                  {staticValue ? (
                    <i
                      onClick={window.screen.width <= 1030 ? collapseSideBar : togglestatic}
                      className="fas fa-chevron-left"
                    ></i>
                  ) : (
                    <button className="sidebar-pin">
                      <img onClick={togglestatic} className="" src={pin_icon} height={20} width={20} alt="" />
                    </button>
                  )}
                </div>
              </div>
            )}
            <Menu.Item
              className="menu-item"
              onClick={() => routeChange('/dashboard')}
              key="1"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<DashBoardIcon />}
            >
              {t('Menu.Dashboard')}
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => routeChange('/catalog')}
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              key="2"
              icon={<CatalogIcon />}
            >
              <span className="sidebar_element">{t('Menu.Catalog')}</span>
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => routeChange('/sources')}
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              key="3"
              icon={<ListNowIcon />}
            >
              {t('Menu.ListNow')}
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => routeChange('/listings')}
              key="4"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<ListingsIcon />}
            >
              {t('Menu.Listings')}
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => routeChange('/orders')}
              key="5"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<OrdersIcon />}
            >
              {t('Menu.Orders')}
            </Menu.Item>

            {/* SETTINGS LIST ITEMS .  */}
            <SubMenu
              className="submenu-item"
              key="sub3"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
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
              className="menu-item"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              key="2"
              icon={<ServiceIcon />}
              onClick={() => history.push('/services')}
            >
              <span>{t('Menu.Services')}</span>
            </Menu.Item>

            <SubMenu
              className="submenu-item"
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
    </div>
  );
};

export default Sidebar;
