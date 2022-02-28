import {useContext, useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { ChevronLeft } from 'react-feather';
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
import { actions } from '../../redux/user-auth/userAuthSlice';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import Logo from '../../assets/logoHGR.png';
// import { Switch } from '../small-components/Switch';
import {Selector} from '../small-components/Selector';
import pin from '../../assets/pin.svg';
import { TransparentBtn } from '../small-components/ActionBtns';
import {ThemeContext} from '../../contexts/ThemeContext';

// import '../../sass/light-theme/side-bar.scss';

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

export const Sidebar = (props: Props) => {
  const { collapsed, staticValue, togglestatic, className, setCollapsed, collapseSideBar } = props;
  // const [isDark] = useState(false);
  const history = useHistory();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {setTheme} = useContext(ThemeContext);
  const themeOptions = [{ value: 'light' }, { value: 'dark' }];

  const theme = localStorage.getItem('globalTheme');
  useEffect(()=>{
    if(theme === 'light'){
      require('../../sass/light-theme/side-bar.scss');
    }else{
      require('../../sass/dark-theme/side-bar.scss');
    }
  },[theme]);

  // const handleToggle = () => {
  //   if (isDark) {
  //     const element = document.getElementById('darkThemeLink');
  //     element?.parentElement?.removeChild(element);
  //   } else {
  //     const link = document.createElement('link');
  //     link.type = 'text/css';
  //     link.id = 'darkThemeLink';
  //     link.rel = 'stylesheet';
  //     link.href = './_variables.dark.css';
  //     document.head.appendChild(link);
  //   }
  //   setIsDark(!isDark);
  // };

  const handleThemeChange = (value: string) =>{
    setTheme(value);
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

  const routeChange = (route: string) => {
    history.push(route);
    const tabletScreen = window.matchMedia('(max-width: 1030px)');
    if (tabletScreen.matches) {
      collapseSideBar();
    }
  };

  const handleLogout = () => {
    dispatch(actions.logout(user));
    localStorage.removeItem('isAuthenticated');
    routeChange('/login');
  };

  const settingsListArray = [
    { id: 6, listName: t('Menu.Channel'), onClick: () => routeChange('/channel') },
    { id: 7, listName: t('Menu.SourcesTable'), onClick: () => routeChange('/sources-table') },
    { id: 8, listName: t('Menu.PricingRules'), onClick: () => routeChange('/pricing-rules') },
    { id: 9, listName: t('Menu.BrowserExtensions'), onClick: () => routeChange('/browser-extensions') },
    { id: 10, listName: t('Menu.Subscriptions'), onClick: () => routeChange('/subscriptions') },
    { id: 11, listName: t('Menu.VaProfiles'), onClick: () => routeChange('/va-profiles') },
    { id: 12, listName: t('Menu.Templates') },
    {
      id: 13,
      listName: (
        <>
          {/* <span>{theme === 'light' ? 'Dark Mode?' : 'Light Mode?'}</span> */}
          {/* <Switch
            className="toggle-mode"
            // checked={isDark}
            onChange={setTheme} 
            checkedChildren="🔆"
            unCheckedChildren="🌙"
            aria-label="Dark mode toggle"
          /> */}
          <Selector defaultValue="Select Mode" onChange={handleThemeChange}>
            {themeOptions}
          </Selector>
        </>
      )
    }
  ];

  const helpListArray = [
    { id: 15, listName: t('Menu.Start'), onClick: () => routeChange('/get-started') },
    { id: 16, listName: t('Menu.FAQ') },
    { id: 17, listName: t('Menu.ListingServices') }
  ];

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Sider
        theme="light"
        className={className}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="293px"
        collapsedWidth="80px"
      >
        <div className="side-menu-container">
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="menu-container">
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
                  {staticValue ? (
                    <ChevronLeft
                      className="chevron-left"
                      onClick={window.screen.width <= 1030 ? collapseSideBar : togglestatic}
                    />
                  ) : (
                    <img src={pin} className="pin-icon" onClick={togglestatic} />
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
              key="sub1"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={<SettingsIcon />}
              title={t('Menu.Settings')}
            >
              {settingsListArray.map((obj) => (
                <Menu.Item key={obj.id} onClick={obj.onClick}>
                  <MenuListItem listName={obj.listName} />
                </Menu.Item>
              ))}
            </SubMenu>

            {/* SERVICES  */}
            <Menu.Item
              className="menu-item"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              key="14"
              icon={<ServiceIcon />}
              onClick={() => routeChange('/services')}
            >
              <span>{t('Menu.Services')}</span>
            </Menu.Item>

            <SubMenu
              className="submenu-item"
              key="sub2"
              style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
              icon={<HelpIcon />}
              title={t('Menu.Help')}
            >
              {helpListArray.map((obj) => (
                <Menu.Item key={obj.id} onClick={obj.onClick}>
                  <MenuListItem listName={obj.listName} />
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
          <TransparentBtn className={!collapsed ? 'collapsed-logout-btn' : 'logout-btn'} handleClick={handleLogout}>
            <img src={logout} />
            <span className={collapsed ? 'hide-logout-text' : 'logout-text'}> {t('Menu.Logout')}</span>
          </TransparentBtn>
        </div>
      </Sider>
    </div>
  );
};
