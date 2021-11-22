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
import '../../sass/ligth-theme/top-bar.scss';

interface Props {
  handleSidebarMobile: () => void;
}

export default function Topbar(props: Props) {
  const { handleSidebarMobile } = props;

  return (
    <div className="top-bar">
      <div className="burger-menu-container">
        <div className="menu-burger" onClick={() => handleSidebarMobile()}>
          <span className="first"></span>
          <span className="second"></span>
          <span className="thrid"></span>
        </div>
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div className="top-bar-nav">
        <div className="nav-items-container">
          <h4 className="quota"> {t('Topbar.Quota')}:</h4>{' '}
          <p className=" ml-1 ml-md-2 quota-price ff-used mb-0">45% (12/13)</p>{' '}
          <div className="progressBar">
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
  );
}
