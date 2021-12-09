import coinIcon from '../../assets/tokenCoin.png';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { Dropdown, Button, Progress } from 'antd';
import StoreList from '../SmallComponents/StoreList';
import Logo from '../../assets//logoHGR.png';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/top-bar.scss';
import { Badge } from 'antd';

interface Props {
  handleSidebarMobile: () => void;
}

const Topbar = (props: Props) => {
  const { handleSidebarMobile } = props;

  return (
    <div className="top-bar">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
        <h1 className="logo-text">HGR</h1>
      </div>

      <div className="menu-burger" onClick={() => handleSidebarMobile()}>
        <span className="first"></span>
        <span className="second"></span>
        <span className="thrid"></span>
      </div>
      <div className="burger-menu-container"></div>
      <div className="top-bar-nav">
        <div className="quota-container">
          <div className="quota">
            <strong className="quota-text">
              <p>{t('Topbar.Quota')}: &nbsp;</p>
            </strong>
            <span className="quota-progress">45% (12/13)</span>
          </div>
          <Progress percent={45} showInfo={false} className="progress-bar" />
          <button type="button" className="update-btn">
            {t('Topbar.Update')}
          </button>
        </div>
        <div className="notifications-container">
          <Badge count={2}>
            <i className="fa fa-bell-o" aria-hidden="true" />
            {/* <BellOutlined/> */}
          </Badge>
          {/* <img className="nofications-bell" src={bellIcon} alt="" />
          <span className="notifications">{t('Topbar.Notifications', { count: 2 })}</span> */}
        </div>
        <div className="tokens-container">
          <img src={coinIcon} alt="coinIcon" />
          <span className="token-number">1232</span>
          <span className="tokens">Tokens </span>
        </div>

        <Dropdown overlay={<StoreList />} placement="bottomLeft" trigger={['click']} className="dropdown">
          <div className="">
            <div className="country-name">Lavivatienda</div>
            <img src={flag} className="lh-1" height="20" alt="" />
            <img src={amazon} className="" height="20" alt="" />
            <Button>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </Button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
