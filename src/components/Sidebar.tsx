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
    <Sider
      theme="light"
      className="h-100 border-right border"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="logo" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="0" icon={<img src={logo} height={30} alt="" />}>
          <span className="font-weight-bold d-blue">{t("HGR")}</span>
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
                    className="fas fa-chevron-left text-dark bg-light rounded p-1 mt-1"
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
        </div>
        <Menu.Item key="1" icon={<img src={dashboard} height={20} alt="" />}>
          {t("ds")}
        </Menu.Item>
        <Menu.Item key="2" icon={<img src={catalog} height={20} alt="" />}>
          {t("cat")}
        </Menu.Item>
        <Menu.Item key="3" icon={<img src={listnow} height={20} alt="" />}>
          {t("ln")}
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<i onClick={routeChange} className="fas fa-list d-blue"></i>}
        >
          <button
            className="bg-trans p-0 border-0"
            onClick={() => history.push("/home")}
          >
            {t("ls")}
          </button>
        </Menu.Item>
        <Menu.Item key="5" icon={<img src={settings} height={20} alt="" />}>
          {t("set")} <i className="fas fa-sort-down text-dark ml-2"></i>
        </Menu.Item>
        <Menu.Item key="6" icon={<img src={services} height={20} alt="" />}>
          {t("srvc")} <i className="fas fa-sort-down text-dark ml-2"></i>
        </Menu.Item>
        <Menu.Item key="7" icon={<img src={help} height={20} alt="" />}>
          {t("hlp")} <i className="fas fa-sort-down text-dark ml-4 pl-1"></i>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
