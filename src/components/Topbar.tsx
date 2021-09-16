import { Progress } from "antd";
import React from "react";
import ring_icon from "../assets/notification.svg";
import flag from "../assets/flag-round-500.svg";
import amazon from "../assets/amazon-icon-1.svg";
import { Dropdown, Button, Space } from "antd";
import DropDownMenu from "./SmallComponents/DropDownMenu";
import styles from "./Topbar.module.css";
import Logo from "../assets/channel/list/logo.png";
export default function Tobbar(props: any) {
  return (
    <div
      className={`d-flex mx-auto justify-content-between align-items-center ${styles.Topbar_height}`}
    >
      <h5 className="mb-0 d-blue font-weight-bold d-none d-lg-block">
        <img src={Logo} alt="logo" />
      </h5>
      <div className="  px-0 bg-white rounded mt-2 mt-lg-0">
        <div className="d-flex w-100 hgr-progress align-items-center p-lg-2 p-1 w-100">
          <div className="d-flex align-items-center">
            <h4 className="mb-0">Quota:</h4>{" "}
            <p className="ms-1 mb-0">45% (12/13)</p>{" "}
            <div>
              <Progress
                percent={40}
                showInfo={false}
                strokeWidth={12}
                strokeColor={{
                  "0%": "#262E80",
                  "100%": "#262E80",
                }}
              />
            </div>
          </div>
          <img src={ring_icon} height="20" className="" alt="" />
          <div className="mx-2 mr-mg-3 d-blue lh-1">
            {" "}
            <span className="font-weight-bold">2</span>
            <span className="d-none d-md-inline pl-1">notifications </span>
          </div>
          <div className="d-blue mr-2 mr-md-3 lh-1">
            <i className="fas fa-circle yellow"></i>
            <span className="font-weight-bold"> 12</span>
            <span className="d-none d-md-inline pl-1">Tokens </span>
          </div>
          <div className="d-blue mr-3 lh-1 font-weight-bold">Linked store</div>
          <img src={flag} className="mx-2 lh-1" height="20" alt="" />
          <img src={amazon} className="mx-2 lh-1" height="20" alt="" />
          <div className="ml-auto">
            <Space direction="vertical">
              <Space wrap>
                <Dropdown overlay={<DropDownMenu />} placement="bottomLeft">
                  <Button>
                    <i className="fas fa-ellipsis-v"></i>
                  </Button>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
      </div>
      <h5 className="mb-0 d-blue font-weight-bold d-md-none mt-3 d-block">
        {props.title}
      </h5>
    </div>
  );
}
