import React from 'react';

import { Progress } from 'antd';
//import ring_icon from '../assets/notification.svg';
import coinIcon from '../assets/tokenCoin.png';
import bellIcon from '../assets/bellIcon.svg';
import flag from '../assets/flag-round-500.svg';
import amazon from '../assets/amazon-icon-1.svg';
import { Dropdown, Button, Space } from 'antd';
import DropDownMenu from './SmallComponents/DropDownMenu';
import '../Common.css';
import Logo from '../assets//logoHGR.png';
import dropicon from '../assets/dropicon.svg';
import { t } from 'src/global/transShim';

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

// interface Props {
//   handleMobile : boolean;
//   sethandleMobile: () => void;
// }

export default function Topbar() {
  // const { handleMobile, sethandleMobile } = props;

  return (
    <>
      <div className="TopBar">
        <div className="ml-3 d-flex align-items-center">
          <div className="hamburger-mobile d-lg-none">
            <span className="first"></span>
            <span className="second"></span>
            <span className="thrid"></span>
          </div>
          <img className="logoHGR ml-3" src={Logo} alt="logo" />
        </div>

        <div className="  px-0 bg-white rounded mt-2 mt-lg-0">
          <div className="d-flex hgr-progress p-1 TopBarItems">
            <div className="d-flex align-items-center">
              <h4 className="mb-0 quota-head ff-used "> {t('Topbar.Quota')}:</h4>{' '}
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
                {t('Topbar.Update')}
              </button>
            </div>
            <img src={bellIcon} alt="" />
            <div className="d-blue lh-1">
              {' '}
              <span className="d-none fs-18 fw-bold d-md-inline ml-3">{t('Topbar.Notifications', { count: 2 })}</span>
            </div>
            <div className="d-blue mx-0  mx-sm-3 lh-1">
              {/* <i className="fas fa-circle yellow"></i> */}
              <img src={coinIcon} alt="coinIcon" />
              <span className="fs-18 fw-bold mx-1">1232</span>
              <span className="d-none fs-18 fw-bold d-md-inline ">Tokens </span>
            </div>
            <Space direction="vertical">
              <div className="ant-space-item d-flex">
                <Dropdown overlay={<DropDownMenu />} placement="bottomLeft" trigger={['click']}>
                  <div className="storeSelector d-flex lav_button_shadow">
                    <div className="fs-18 pl-2 mr-1 lh-1 font-weight-bold">Lavivatienda</div>
                    <img src={flag} className="lh-1" height="20" alt="" />
                    <img src={amazon} className="mx-3 lh-1" height="20" alt="" />
                    <Button>
                      <img className="lh-1  my-auto" src={dropicon} alt="" />
                    </Button>
                  </div>
                </Dropdown>
              </div>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}
