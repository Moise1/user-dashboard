import React from 'react';
import { Progress } from 'antd';
import coinIcon from '../../assets/tokenCoin.png';
import bellIcon from '../../assets/bellIcon.svg';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { Dropdown, Button, Space } from 'antd';
import DropDownMenu from '../SmallComponents/DropDownMenu';
import Logo from '../../assets//logoHGR.png';
import dropicon from '../../assets/dropicon.svg';
import { t } from 'src/global/transShim';
import './Topbar.css';

interface Props {
  handleSidebarMobile: () => void;
}

export default function Topbar(props: Props) {
  const { handleSidebarMobile } = props;

  return (
    <>
      <div className="TopBar">
        <div className="ml-2 ml-sm-3 d-flex align-items-center">
          <div className="hamburger-mobile d-lg-none" onClick={() => handleSidebarMobile()}>
            <span className="first"></span>
            <span className="second"></span>
            <span className="thrid"></span>
          </div>
          <img className="logoHGR ml-2 ml-md-3" src={Logo} alt="logo" />
        </div>
        <div>
          <p className=" ml-2 mb-0 mt-2 quota-price ff-used d-md-none">45% (12/13)</p>{' '}
        </div>
        <button className="upgrde-btn-topbar d-md-none mt-2">Upgrade</button>
        <div className="  px-0 bg-white rounded mt-2 mt-lg-0">
          <div className="d-flex hgr-progress p-sm-1 TopBarItems">
            <div className="d-flex align-items-center">
              <h4 className="mb-0 quota-head ff-used "> {t('Topbar.Quota')}:</h4>{' '}
              <p className=" ml-1 ml-md-2 quota-price ff-used mb-0">45% (12/13)</p>{' '}
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
            <img className="bell-icoon-topbar" src={bellIcon} alt="" />
            <div className="d-blue lh-1">
              {' '}
              <span className="d-none fs-18 fw-bold d-md-inline ml-3">{t('Topbar.Notifications', { count: 2 })}</span>
            </div>
            <div className="d-blue d-flex align-items-center mx-0  mx-sm-3 lh-1">
              {/* <i className="fas fa-circle yellow"></i> */}
              <img src={coinIcon} alt="coinIcon" />
              <span className="fs-18 fw-bold mx-1">1232</span>
              <span className="d-none fs-18 fw-bold d-md-inline ">Tokens </span>
            </div>
            <Space direction="vertical">
              <div className="ant-space-item d-flex">
                <Dropdown overlay={<DropDownMenu />} placement="bottomLeft" trigger={['click']}>
                  <div className="storeSelector d-flex lav_button_shadow">
                    <div className="fs-18 pl-md-2 mr-1 lh-1 font-weight-bold country-name">Lavivatienda</div>
                    <img src={flag} className="lh-1" height="20" alt="" />
                    <img src={amazon} className="mx-1 mx-md-3 lh-1" height="20" alt="" />
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
