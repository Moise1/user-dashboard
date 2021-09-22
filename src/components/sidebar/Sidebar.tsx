import React from "react";
import logo from "../../assets/logo.svg";
import dashboard from "../../assets/dashboard.svg";
import catalog from "../../assets/catalog.svg";
import listnow from "../../assets/plus.svg";
import settings from "../../assets/settings.svg";
import services from "../../assets/services.svg";
import help from "../../assets/help.svg";
import { Layout, Menu } from "antd";
import pin_icon from "../../assets/pin.svg";
import { useHistory } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
import {
  DashBoardIcon,
  LeftArrowIcon,
  CatalogIcon,
  ListNowIcon,
  ListingsIcon,
  ServiceIcon,
  SettingsIcon,
  CircleDotIcon,
  HelpIcon,
  LogOutIcon,
} from "../common/Icons";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import MenuListItem from "./MenuListItem";
const { SubMenu } = Menu;

setTranslations({ en });
setDefaultLanguage("en");
const { Sider } = Layout;
interface Props {
  collapsed: boolean;
  toggle: () => void;
  staticvalue: boolean;
  togglestatic: () => void;
}

export default function Sidebar(props: Props) {
  const history = useHistory();

  const routeChange = () => {
    history.push("/home");
  };
  const { collapsed, toggle, staticvalue, togglestatic } = props;
  const t = useTranslation();

  const listArray = [
    { key: 9, listName: "Channel" },
    { key: 10, listName: "Sources" },
    { key: 11, listName: "Pricing Rules" },
    { key: 12, listName: "Browser Extensions" },
    { key: 13, listName: "VA Profile" },
    { key: 14, listName: "Templates" },
  ];

  return (
    <>
      <Sider
        theme="light"
        className="h-100 border-right border z-10"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <div className="d-flex flex-column justify-content-between h-100">
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item
              key="0"
              icon={<img src={logo} className="d-none" height={30} alt="" />}
            >
              {/* <span className="font-weight-bold  d-blue">{t("HGR")}</span> */}
            </Menu.Item>
            <div
              className="text-white position-absolute"
              style={{
                top: "0%",
                right: "3%",
                zIndex: 999999,
              }}
            >
              {collapsed ? (
                ""
              ) : (
                <>
                  <div className="ml-auto float-right m-2">
                    {staticvalue ? (
                      <i
                        onClick={togglestatic}
                        className="fas fa-chevron-left text-dark bg-light rounded p-1 mt-1 active-left-icon"
                      ></i>
                    ) : (
                      <button className="btn border-0 btn-light p-1">
                        <img
                          onClick={togglestatic}
                          className=""
                          src={pin_icon}
                          height={20}
                          width={20}
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>{" "}
            <div className="pt-3"></div>
            <Menu.Item
              key="1"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={<DashBoardIcon />}
            >
              {t("ds")}
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              key="2"
              icon={<CatalogIcon />}
            >
              <span className="sidebar_element">{t("cat")}</span>
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              key="3"
              icon={<ListNowIcon />}
            >
              {t("ln")}
            </Menu.Item>
            <Menu.Item
              key="4"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <span onClick={routeChange}>
                  <ListingsIcon />
                </span>
              }
            >
              <button
                className="bg-trans fw-700 p-0  border-0"
                onClick={() => history.push("/home")}
              >
                {t("ls")}
              </button>
            </Menu.Item>
            {/* SETTINGS LIST ITEMS .  */}
            <SubMenu
              key="sub3"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={<SettingsIcon />}
              title="Settings"
            >
              <Menu.Item key="9">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Channel
                </li>
              </Menu.Item>
              <Menu.Item key="10">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Sources
                </li>
              </Menu.Item>
              <Menu.Item key="11">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Pricing Rules
                </li>
              </Menu.Item>
              <Menu.Item key="13">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Browser Extensions
                </li>
              </Menu.Item>
              <Menu.Item key="14">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="15">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Templates
                </li>
              </Menu.Item>
            </SubMenu>
            {/* SERVICES  */}
            <SubMenu
              key="sub4"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={<ServiceIcon />}
              title="Services"
            >
              <Menu.Item key="13">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="14">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="15">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  VA Profiles
                </li>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={<HelpIcon />}
              title="Help"
            >
              <Menu.Item key="9">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  Templates
                </li>
              </Menu.Item>
              <Menu.Item key="10">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>
                  VA Profiles
                </li>
              </Menu.Item>
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
