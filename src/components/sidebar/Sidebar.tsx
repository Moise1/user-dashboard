import { useContext, useState } from 'react';
import { Layout, Menu } from 'antd';
import { ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { t } from '../../utils/transShim';
import {
  DashBoardIcon,
  CatalogIcon,
  ListNowIcon,
  ListingsIcon,
  ServiceIcon,
  SettingsIcon,
  HelpIcon,
  OrdersIcon,
  LogoutIcon
} from '../common/Icons';
import { MenuListItem } from './MenuListItem';
import { actions } from '../../redux/user/userSlice';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import Logo from '../../assets/logoHGR.png';
import { Switch } from '../../small-components/Switch';
import pin from '../../assets/pin.svg';
import { AppContext } from '../../contexts/AppContext';
import { persistor } from 'src/redux/store';
import { MobileSiderDrawer } from '../../small-components/MobileSiderDrawer';
import '../../sass/side-bar.scss';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

interface Props {
  className: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggle?: () => void;
  staticValue?: boolean;
  togglestatic?: () => void;
  handleSidebarMobile?: () => void;
  mobileSiderVisible: boolean;
  closeMobileSider: () => void;
}

const mobileScreenSize = window.matchMedia('(max-width: 1030px)');

export const Sidebar = (props: Props) => {
  const {
    collapsed,
    staticValue,
    togglestatic,
    className,
    setCollapsed,
    mobileSiderVisible,
    closeMobileSider
  } = props;
  const [isDark, setIsDark] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['sub1']);

  const { setTheme } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
  const history = useHistory();

  const handleThemeChange = () => {
    setIsDark(!isDark);
    isDark === false ? setTheme('dark') : setTheme('light');
  };
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

  const onOpenChange = (openKeysValue: string[]) => {
    const latestOpenKey = openKeysValue.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys?.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(openKeysValue);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const routeChange = (route: string) => {
    history.push(route);
    if (mobileScreenSize.matches) closeMobileSider();
  };

  const handleLogout = () => {
    const keysToRemove = ['root', 'Authorization', 'globalTheme', 'isAuthenticated'];
    dispatch(actions.logout());
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    persistor.purge();
    routeChange('/login');
  };

  const settingsListArray = [
    { id: 6, listName: t('Menu.Channel'), onClick: () => routeChange('/channel') },
    { id: 7, listName: t('Menu.SourcesTable'), onClick: () => routeChange('/sources-table') },
    { id: 8, listName: t('Menu.PricingRules'), onClick: () => routeChange('/pricing-rules') },
    { id: 9, listName: t('Menu.BrowserExtensions'), onClick: () => routeChange('/browser-extensions') },
    { id: 10, listName: t('Menu.Subscriptions'), onClick: () => routeChange('/subscriptions') },
    { id: 11, listName: t('Menu.VaProfiles'), onClick: () => routeChange('/va-profiles') },
    { id: 12, listName: t('Menu.Templates'), onClick: () => routeChange('/templates') },
    {
      id: 13,
      listName: t('Menu.AutoOrderingConfiguration'),
      onClick: () => routeChange('/auto-ordering-configuration')
    },
    {
      id: 20,
      listName: t('Menu.AutoOrderingConfiguration'),
      onClick: () => routeChange('/auto-ordering-configuration-query')
    },
    {
      id: 14,
      listName: (
        <>
          <Switch
            className="toggle-mode"
            checked={isDark}
            onChange={handleThemeChange}
            checkedChildren="🔆"
            unCheckedChildren="🌙"
            aria-label="Dark mode toggle"
          />
        </>
      )
    }
  ];

  const helpListArray = [
    { id: 17, listName: t('Menu.Start'), onClick: () => routeChange('/get-started') },
    { id: 18, listName: t('Menu.FAQ') },
    { id: 19, listName: t('Menu.ListingServices') }
  ];

  const siderMenu = (
    <div className="side-menu-container">
      <Menu
        className="menu-container"
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
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
            <div className="sidebar-control-btns">
              {staticValue || mobileScreenSize.matches ? (
                <ChevronLeft
                  className="chevron-left"
                  onClick={mobileScreenSize.matches ? closeMobileSider : togglestatic}
                />
              ) : (
                !mobileScreenSize.matches && <img src={pin} className="pin-icon" onClick={togglestatic} />
              )}
            </div>
          </div>
        )}
        <Item
          className="menu-item"
          onClick={() => routeChange('/dashboard')}
          key="1"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          icon={<DashBoardIcon />}
        >
          {t('Menu.Dashboard')}
        </Item>
        <Item
          className="menu-item"
          onClick={() => routeChange('/catalog')}
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          key="2"
          icon={<CatalogIcon />}
        >
          <span className="sidebar_element">{t('Menu.Catalog')}</span>
        </Item>
        <Item
          className="menu-item"
          onClick={() => routeChange('/list-now')}
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          key="3"
          icon={<ListNowIcon />}
        >
          {t('Menu.ListNow')}
        </Item>
        <Item
          className="menu-item"
          onClick={() => routeChange('/listings')}
          key="4"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          icon={<ListingsIcon />}
        >
          {t('Menu.Listings')}
        </Item>
        <Item
          className="menu-item"
          onClick={() => routeChange('/orders')}
          key="5"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          icon={<OrdersIcon />}
        >
          {t('Menu.Orders')}
        </Item>

        <SubMenu
          className="submenu-item"
          key="sub1"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          icon={<SettingsIcon />}
          title={t('Menu.Settings')}
        >
          {settingsListArray.map((obj) => (
            <Item key={obj.id} onClick={obj.onClick}>
              <MenuListItem listName={obj.listName} />
            </Item>
          ))}

          <SubMenu
            className="secondary-submenu-item"
            key="sub2"
            style={{ fontSize: '18px', fontWeight: 'bold' }}
            title="Item's Submenu"
          >
            <Item
              className="menu-item"
              onClick={() => routeChange('/dashboard')}
              key="14"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<DashBoardIcon />}
            >
              Another Menu Item
            </Item>

            <Item
              className="menu-item"
              onClick={() => routeChange('/dashboard')}
              key="15"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<DashBoardIcon />}
            >
              Another Menu Item
            </Item>
          </SubMenu>
        </SubMenu>

        <Item
          className="menu-item"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          key="16"
          icon={<ServiceIcon />}
          onClick={() => routeChange('/services')}
        >
          <span>{t('Menu.Services')}</span>
        </Item>

        <SubMenu
          className="submenu-item"
          key="sub3"
          style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
          icon={<HelpIcon />}
          title={t('Menu.Help')}
        >
          {helpListArray.map((obj) => (
            <Item key={obj.id} onClick={obj.onClick}>
              <MenuListItem listName={obj.listName} />
            </Item>
          ))}
        </SubMenu>
        <Item
          className="menu-item logout-txt"
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          key="20"
          icon={<LogoutIcon />}
          onClick={handleLogout}
        >
          <span>Logout</span>
        </Item>
      </Menu>
    </div>
  );
  const largeScreenSider = (
    <Sider
      theme="light"
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width="293px"
      collapsedWidth="80px"
    >
      {siderMenu}
    </Sider>
  );

  const smallScreenSider = (
    <MobileSiderDrawer
      visible={mobileSiderVisible}
      placement="left"
      closable={false}
      onClose={closeMobileSider}
      key="left"
    >
      <div className="sider">{siderMenu}</div>
    </MobileSiderDrawer>
  );
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {mobileScreenSize.matches ? smallScreenSider : largeScreenSider}
    </div>
  );
};
