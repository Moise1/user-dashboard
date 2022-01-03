import { useState } from 'react';
import coinIcon from '../../assets/tokenCoin.png';
import flag from '../../assets/flag-round-500.svg';
import bell from '../../assets/bell-icon.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { Dropdown, Button, Progress } from 'antd';
import StoreList from '../small-components/StoreList';
import Logo from '../../assets/logoHGR.png';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/top-bar.scss';
import { Badge } from 'antd';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from './BuyTokens';

interface Props {
  handleSidebarMobile: () => void;
}

const Topbar = (props: Props) => {
  const { handleSidebarMobile } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => setOpen(!open);

  return (
    <div className="top-bar">
      <div className="logo-container">
        <a className="logo-link" href="/">
          <img className="logo" src={Logo} alt="logo" />
          <h1 className="logo-text">HGR</h1>
        </a>
      </div>

      <div className="menu-burger" onClick={() => handleSidebarMobile()}>
        <span className="first"></span>
        <span className="second"></span>
        <span className="thrid"></span>
      </div>
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
        <Badge
          count={2}
          className="notifications
        "
        >
          <img src={bell} alt="" />
        </Badge>
        <div className="tokens-container" role="button" onClick={handleOpenModal}>
          <PopupModal open={open} width={800} style={{ top: 20 }} bodyStyle={{ height: 600 }}>
            <BuyTokens />
          </PopupModal>
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
