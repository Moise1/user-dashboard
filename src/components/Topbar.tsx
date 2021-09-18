import { Progress } from "antd";
import React from "react";
import ring_icon from "../assets/notification.svg";
import bellIcon from "../assets/bellIcon.svg";
import flag from "../assets/flag-round-500.svg";
import amazon from "../assets/amazon-icon-1.svg";
import { Dropdown, Button, Space } from "antd";
import DropDownMenu from "./SmallComponents/DropDownMenu";
import styles from "./Topbar.module.css";
import "../Common.css";
import Logo from "../assets/channel/list/logo.png";
import dropicon from "../assets/dropicon.svg";

export default function Tobbar(props: any) {
  return (
    <div
      className={`d-flex mx-auto justify-content-between ff-used align-items-center ${styles.Topbar_height}`}
    >
      <div className="mx-3">
        <img src={Logo} alt="logo" />
      </div>
      <div className="  px-0 bg-white rounded mt-2 mt-lg-0">
        <div className="d-flex w-100 hgr-progress align-items-center p-lg-2 p-1 w-100">
          <div className="d-flex align-items-center">
            <h4 className="mb-0 quota-head ff-used ">Quota:</h4>{" "}
            <p className=" ml-2 quota-price ff-used mb-0">45% (12/13)</p>{" "}
            <div>
              <Progress
                percent={50}
                showInfo={false}
                strokeWidth={12}
                strokeColor={{
                  "0%": "#262E80",
                  "100%": "#262E80",
                }}
              />
            </div>
            <button
              type="button"
              className="btn ff-used py-1px Update-btn rounded-pill "
            >
              Update
            </button>
          </div>
          <img src={bellIcon} height="28" className="ml-5 mr-2" alt="" />
          <div className="mx-2 mr-mg-3 d-blue lh-1">
            {" "}
            <span className="d-none fs-18 fw-bold d-md-inline pl-1">
              {" "}
              2 notifications{" "}
            </span>
          </div>
          <div className="d-blue mr-2 mr-md-3 lh-1">
            <i className="fas fa-circle yellow"></i>
            <span className="fs-18 fw-bold"> 1232</span>
            <span className="d-none fs-18 fw-bold d-md-inline  pl-1">
              Tokens{" "}
            </span>
          </div>
          <div className="d-flex  lav_button_shadow py-2 align-items-center ">
            <div className="fs-18 pl-2 mr-1 lh-1 font-weight-bold">
              Lavivatienda
            </div>
            <img src={flag} className="lh-1" height="20" alt="" />
            <img src={amazon} className="mx-3 lh-1" height="20" alt="" />
            <div className="ml-5">
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={<DropDownMenu />} placement="bottomLeft">
                    <Button>
                      <img className="lh-1  my-auto" src={dropicon} alt="" />
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb-0 d-blue font-weight-bold d-md-none mt-3 d-block">
        {props.title}
      </h5>
    </div>
  );
}
