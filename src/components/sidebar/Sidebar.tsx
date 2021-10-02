import React from 'react';
import { Layout, Menu } from 'antd';
import pin_icon from '../../assets/pin.svg';
import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';

import {
  DashBoardIcon,
  CatalogIcon,
  ListNowIcon,
  ListingsIcon,
  ServiceIcon,
  SettingsIcon,
  HelpIcon,
  LogOutIcon
} from '../common/Icons';
import MenuListItem from './MenuListItem';
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

export default function Sidebar(props: Props) {
  const history = useHistory();

  const routeChange = () => {
    history.push('/home');
  };
  const { collapsed, staticvalue, togglestatic } = props;

  const listArray = [
    { key: 9, listName: 'Channel' },
    { key: 10, listName: 'Sources' },
    { key: 11, listName: 'Pricing Rules' },
    { key: 12, listName: 'Browser Extensions' },
    { key: 13, listName: 'VA Profile' },
    { key: 14, listName: 'Templates' },
    { key: 15, listName: 'Toggle Dark Theme', onClick: () => toggleDarkTheme() }
  ];

  const servicelistArray = [
    { key: 111, listName: 'Channel' },
    { key: 112, listName: 'Sources' },
    { key: 113, listName: 'Pricing Rules' }
  ];

  const helplistArray = [
    { key: 511, listName: 'Channel' },
    { key: 512, listName: 'Sources' },
    { key: 513, listName: 'Pricing Rules' }
  ];

  return (
    <>
      <Sider
        theme="light"
        className="h-100 border-right border z-10 sidebarInitial"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <div className="d-flex flex-column justify-content-between h-100">
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            {/* <Menu.Item
              key="0"
              icon={<img src={logo} className="d-none" height={30} alt="" />}
            >
              <span className="font-weight-bold  d-blue">{t("HGR")}</span>
            </Menu.Item> */}
            <div
              className="text-white position-absolute"
              style={{
                top: '0%',
                right: '3%',
                zIndex: 999999
              }}
            >
              {collapsed ? (
                ''
              ) : (
                <>
                  <div className="ml-auto float-right m-2">
                    {staticvalue ? (
                      <i
                        onClick={togglestatic}
                        className="fas fa-chevron-left text-dark bg-light  p-1 mt-1 active-left-icon arrow-icon-sidebar cursor-pointer"
                      ></i>
                    ) : (
                      <button className="mt-1 btn border-0 btn-light br-8 p-1 h-30_02 w-30_02 d-flex justify-content-center align-items-center">
                        <img onClick={togglestatic} className="" src={pin_icon} height={20} width={20} alt="" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>{' '}
            <div className="pt-5"></div>
            <Menu.Item key="1" style={{ fontSize: '18px', fontWeight: 'bold' }} icon={<DashBoardIcon />}>
              {t('ds')}
            </Menu.Item>
            <Menu.Item style={{ fontSize: '18px', fontWeight: 'bold' }} key="2" icon={<CatalogIcon />}>
              <span className="sidebar_element">{t('cat')}</span>
            </Menu.Item>
            <Menu.Item style={{ fontSize: '18px', fontWeight: 'bold' }} key="3" icon={<ListNowIcon />}>
              {t('ln')}
            </Menu.Item>
            <Menu.Item
              key="4"
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              icon={
                <span onClick={routeChange}>
                  <ListingsIcon />
                </span>
              }
            >
              <button className="bg-trans fw-400 p-0  border-0 listing-btn" onClick={() => history.push('/home')}>
                {t('ls')}
              </button>
            </Menu.Item>
            {/* SETTINGS LIST ITEMS .  */}
            <SubMenu
              key="sub3"
              style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
              icon={<SettingsIcon />}
              title="Settings"
            >
              {listArray.map((obj) => (
                <Menu.Item key={obj.key}>
                  <MenuListItem listName={obj.listName} onClick={obj.onClick} />
                </Menu.Item>
              ))}
            </SubMenu>
            {/* SERVICES  */}
            <SubMenu
              key="sub4"
              style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
              icon={<ServiceIcon />}
              title="Services"
            >
              {servicelistArray.map((obj) => (
                <Menu.Item key={obj.key}>
                  <MenuListItem listName={obj.listName} />
                </Menu.Item>
              ))}
            </SubMenu>
            <SubMenu
              key="sub5"
              style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}
              icon={<HelpIcon />}
              title="Help"
            >
              {helplistArray.map((obj) => (
                <Menu.Item key={obj.key}>
                  <MenuListItem listName={obj.listName} />
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
          <div className="logout-icon d-flex justify-content-end align-items-center z-10">
            <span className="mx-2 ">
              <LogOutIcon />
            </span>

            <span className="d-none-icon">Logout</span>
          </div>
        </div>
      </Sider>
    </>
  );
}
