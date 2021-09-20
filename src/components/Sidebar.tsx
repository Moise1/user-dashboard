import React from "react";
import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import catalog from "../assets/catalog.svg";
import listnow from "../assets/plus.svg";
import settings from "../assets/settings.svg";
import services from "../assets/services.svg";
import help from "../assets/help.svg";
import { Layout, Menu } from "antd";
import pin_icon from "../assets/pin.svg";
import { useHistory } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../translation.json";
import {
  DashBoardIcon,
  LeftArrowIcon,
  CatalogIcon,
  ListNowIcon,
  ListingsIcon,
  ServiceIcon,
  SettingsIcon,
  CircleDotIcon,
} from "../components/common/Icons";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
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
    let path = `newPath`;
    history.push("/home");
  };
  const { collapsed, toggle, staticvalue, togglestatic } = props;
  const t = useTranslation();

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
            <Menu.Item
              key="1"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <img
                  className="active-white-svg"
                  src={dashboard}
                  height={20}
                  alt=""
                />
              }
            >
              {t("ds")}
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              key="2"
              icon={
                <img
                  className="active-white-svg"
                  src={catalog}
                  height={20}
                  alt=""
                />
              }
            >
              <span className="sidebar_element">{t("cat")}</span>
            </Menu.Item>
            <Menu.Item
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              key="3"
              icon={
                <img
                  className="active-white-svg"
                  src={listnow}
                  height={20}
                  alt=""
                />
              }
            >
              {t("ln")}
            </Menu.Item>
            <Menu.Item
              key="4"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <i
                  onClick={routeChange}
                  className="fas active-white-svg fa-list d-blue"
                ></i>
              }
            >
              <button
                className="bg-trans fw-700  border-0"
                onClick={() => history.push("/home")}
              >
                {t("ls")}
              </button>
            </Menu.Item>
            <SubMenu
              key="sub3"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <img
                  className="active-white-svg"
                  src={settings}
                  height={20}
                  alt=""
                />
              }
              title="Settings"
            >
              {/* {t("set")} <i className="fas fa-sort-down text-dark ml-2"></i> */}
              <Menu.Item key="9">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Channel
                </li>
              </Menu.Item>
              <Menu.Item key="10">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Sources
                </li>
              </Menu.Item>
              <Menu.Item key="11">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Pricing Rules
                </li>
              </Menu.Item>
              <Menu.Item key="13">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Browser Extensions
                </li>
              </Menu.Item>
              <Menu.Item key="14">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="15">
                {" "}
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Templates
                </li>
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item key="5" icon={<img src={settings} height={20} alt="" />}>
          {t("set")} <i className="fas fa-sort-down text-dark ml-2"></i>
        </Menu.Item> */}
            {/* SERVICES  */}
            <SubMenu
              key="sub4"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <img
                  className="active-white-svg"
                  src={services}
                  height={20}
                  alt=""
                />
              }
              title="Services"
            >
              {/* {t("set")} <i className="fas fa-sort-down text-dark ml-2"></i> */}

              <Menu.Item key="13">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="14">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  VA Profiles
                </li>
              </Menu.Item>
              <Menu.Item key="15">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  VA Profiles
                </li>
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item
          style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
          key="6"
          icon={
            <img
              className="active-white-svg"
              src={services}
              height={20}
              alt=""
            />
          }
        >
          {t("srvc")} <i className="fas fa-sort-down text-dark ml-2"></i>
        </Menu.Item> */}
            <SubMenu
              key="sub5"
              style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
              icon={
                <img
                  className="active-white-svg"
                  src={help}
                  height={20}
                  alt=""
                />
              }
              title="Help"
            >
              {/* {t("set")} <i className="fas fa-sort-down text-dark ml-2"></i> */}
              <Menu.Item key="9">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  Templates
                </li>
              </Menu.Item>
              <Menu.Item key="10">
                <li className="list-unstyled list-items-hover fw-400 m-0 h-25 leading-25">
                  {" "}
                  <span className="mr-3">
                    <CircleDotIcon />
                  </span>{" "}
                  VA Profiles
                </li>
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item
          style={{ color: "#000", fontSize: "18px", fontWeight: "bold" }}
          key="7"
          icon={
            <img className="active-white-svg" src={help} height={20} alt="" />
          }
        >
          {t("hlp")} <i className="fas fa-sort-down text-dark ml-4 pl-1"></i>
        </Menu.Item> */}
          </Menu>
          <div className="logout-icon d-flex justify-content-end align-items-center z-10">
            <span className="mx-2 ">
              <svg
                id="Group_84"
                data-name="Group 84"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 31.622 31.622"
              >
                <path
                  id="Path_17"
                  data-name="Path 17"
                  d="M0,0H31.622V31.622H0Z"
                  fill="none"
                />
                <path
                  id="Path_18"
                  data-name="Path 18"
                  d="M17.494,9.27V6.635A2.635,2.635,0,0,0,14.858,4H5.635A2.635,2.635,0,0,0,3,6.635V22.446a2.635,2.635,0,0,0,2.635,2.635h9.223a2.635,2.635,0,0,0,2.635-2.635V19.811"
                  transform="translate(0.953 1.27)"
                  fill="none"
                  stroke="#ef6092"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_19"
                  data-name="Path 19"
                  d="M7,12.953H25.446L21.494,9m0,7.906,3.953-3.953"
                  transform="translate(2.223 2.858)"
                  fill="none"
                  stroke="#ef6092"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </span>

            <span className="d-none-icon">Logout</span>
          </div>
        </div>
      </Sider>
    </>
  );
}
