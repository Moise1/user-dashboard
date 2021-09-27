import React from 'react';

import { Progress } from 'antd';
//import ring_icon from '../assets/notification.svg';
import coinIcon from '../assets/tokenCoin.png';
import bellIcon from '../assets/bellIcon.svg';
import flag from '../assets/flag-round-500.svg';
import amazon from '../assets/amazon-icon-1.svg';
import { Dropdown, Button, Space } from 'antd';
import DropDownMenu from './SmallComponents/DropDownMenu';
import styles from './Topbar.module.css';
import '../Common.css';
import Logo from '../assets/channel/list/logo.png';
import dropicon from '../assets/dropicon.svg';

/*
 *import { Progress } from "antd";
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
 * */

//position-stickey top-0 z-100 nav-shadow bg-white d-flex mx-auto justify-content-between ff-used align-items-center
export default function Topbar() {
  return (
    <>
      <div className={`TopBar ${styles.Topbar_height}`}>
        <div className="mx-3">
          <img src={Logo} alt="logo" />
        </div>
        <div className="  px-0 bg-white rounded mt-2 mt-lg-0">
          <div className="d-flex w-100 hgr-progress align-items-center p-lg-2 p-1 w-100">
            <div className="d-flex align-items-center">
              <h4 className="mb-0 quota-head ff-used ">Quota:</h4>{' '}
              <p className=" ml-2 quota-price ff-used mb-0">45% (12/13)</p>{' '}
              <div>
                <Progress
                  percent={50}
                  showInfo={false}
                  strokeWidth={12}
                  strokeColor={{
                    '0%': '#262E80',
                    '100%': '#262E80'
                  }}
                />
              </div>
              <button type="button" className="btn ff-used py-1px Update-btn rounded-pill ">
                Update
              </button>
            </div>
            <img src={bellIcon} height="28" className="ml-5" alt="" />
            <div className="d-blue lh-1">
              {' '}
              <span className="d-none fs-18 fw-bold d-md-inline ml-3"> 2 notifications </span>
            </div>
            <div className="d-blue mx-3 lh-1">
              {/* <i className="fas fa-circle yellow"></i> */}
              <img src={coinIcon} alt="coinIcon" />
              <span className="fs-18 fw-bold mx-1"> 1232</span>
              <span className="d-none fs-18 fw-bold d-md-inline ">Tokens </span>
            </div>
            <div className="d-flex justify-content-between lav_button_shadow py-2 align-items-center w-xxxl-304">
              <div className="fs-18 pl-2 mr-1 lh-1 font-weight-bold">Lavivatienda</div>
              <img src={flag} className="lh-1" height="20" alt="" />
              <img src={amazon} className="mx-3 lh-1" height="20" alt="" />

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
    </>
  );
}
