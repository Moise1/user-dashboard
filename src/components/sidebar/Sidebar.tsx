import { CSSProperties, useContext, useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
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
import { AppContext } from '../../contexts/AppContext';
import { persistor } from 'src/redux/store';
import { MobileSiderDrawer } from '../../small-components/MobileSiderDrawer';
import { LeftOutlined, PushpinOutlined } from '@ant-design/icons';
import '../../sass/side-bar.scss';
import { Links } from '../../links';

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

type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar = (props: Props) => {
  const { collapsed, staticValue, togglestatic, className, setCollapsed, mobileSiderVisible, closeMobileSider } = props;
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
    const keysToRemove = ['root', 'Authorization', 'globalTheme', 'isAuthenticated', 'initialDate'];
    dispatch(actions.logout());
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    persistor.purge();
    routeChange(Links.Login);
  };

  const settingsListArray = [
    { id: 6, listName: t('Menu.Channel'), onClick: () => routeChange(Links.ChannelSettings) },
    { id: 7, listName: t('Menu.SourcesTable'), onClick: () => routeChange(Links.SourcesSettings) },
    { id: 8, listName: t('Menu.PricingRules'), onClick: () => routeChange(Links.PricingRules) },
    { id: 9, listName: t('Menu.BrowserExtensions'), onClick: () => routeChange(Links.BrowserExtension) },
    { id: 10, listName: t('Menu.Subscriptions'), onClick: () => routeChange(Links.Subscriptions) },
    { id: 13, listName: t('Menu.VaProfiles'), onClick: () => routeChange(Links.VaProfiles) },
    { id: 14, listName: t('Menu.Templates'), onClick: () => routeChange(Links.Templates) },
    {
      id: 15,
      listName: t('Menu.AutoOrderingConfiguration'),
      onClick: () => routeChange(Links.AutoOrderConfiguration)
    },
    // {
    //   id: 20,
    //   listName: t('Menu.AutoOrderingConfiguration'),
    //   onClick: () => routeChange(Links.AutoOrderConfiguration)
    // },
    {
      id: 16,
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
    { id: 18, listName: t('Menu.Start'), onClick: () => routeChange(Links.GetStarted) },
    { id: 19, listName: t('Menu.FAQ') },
    { id: 20, listName: t('Menu.ListingServices') }
  ];

  const getItem = (
    key: React.Key,
    className?: string,
    style?: CSSProperties,
    label?: React.ReactNode,
    icon?: React.ReactNode,
    children?: MenuItem[] | undefined,
    onClick?: (route?: string) => void,
    type?: 'group' | undefined
  ): MenuItem => {
    return {
      key,
      className,
      style,
      label,
      icon,
      children,
      onClick,
      type
    } as MenuItem;
  };

  const menuItems: MenuItem[] = [
    getItem(
      '1',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Dashboard'),
      <DashBoardIcon />,
      undefined,
      () => routeChange(Links.Dashboard)

    ),
    getItem(
      '2',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Catalog'),
      <CatalogIcon />,
      undefined,
      () => routeChange(Links.Catalog)
    ),
    getItem(
      '3',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.ListNow'),
      <ListNowIcon />,
      undefined,
      () => routeChange(Links.PublishNow)
    ),
    getItem(
      '4',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Listings'),
      <ListingsIcon />,
      undefined,
      () => routeChange(Links.Products),
    ),
    getItem(
      '5',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Orders'),
      <OrdersIcon />,
      undefined,
      () => routeChange(Links.Orders)
    ),
    getItem(
      'sub1',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Settings'),
      <SettingsIcon />,
      settingsListArray.map((item) => {
        return getItem(item.id, '', {}, <MenuListItem key={item.id} onClick={item.onClick} listName={item.listName} />);
      })
    ),
    getItem(
      '17',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Services'),
      <ServiceIcon />,
      undefined,
      () => routeChange(Links.Services),
    ),
    getItem(
      'sub2',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Help'),
      <HelpIcon />,
      helpListArray.map((item) => {
        return getItem(item.id, '', {}, <MenuListItem key={item.id} onClick={item.onClick} listName={item.listName} />);
      })
    ),
    getItem(
      '21',
      'menu-item',
      { fontSize: '18px', fontWeight: 'bold' },
      t('Menu.Logout'),
      <LogoutIcon />,
      undefined,
      handleLogout,
    )
  ];


  const siderMenu = (
    <div className="side-menu-container">
      {
        !collapsed && (
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
                <LeftOutlined
                  style={{ fontSize: '19px' }}
                  onClick={mobileScreenSize.matches ? closeMobileSider : togglestatic}
                />
              ) : (
                !mobileScreenSize.matches && <PushpinOutlined style={{ fontSize: '19px' }} onClick={togglestatic} />
              )}
            </div>
          </div>
        )
      }
      <Menu
        className="menu-container"
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
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
