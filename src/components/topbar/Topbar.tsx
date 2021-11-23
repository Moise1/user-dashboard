import coinIcon from '../../assets/tokenCoin.png';
import bellIcon from '../../assets/bellIcon.svg';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { Dropdown, ProgressBar } from 'react-bootstrap';
import StoreList from '../SmallComponents/StoreList';
import Logo from '../../assets//logoHGR.png';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/top-bar.scss';

interface Props {
  handleSidebarMobile: () => void;
}

const Topbar = (props: Props) => {
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
      <div className="topbar-navav">
        <h4 className="quota"> {t('Topbar.Quota')}:</h4> <p className="quota-price">45% (12/13)</p>{' '}
        <ProgressBar now={20} className="progress-bar" />
        <button type="button" className="update-btn">
          {t('Topbar.Update')}
        </button>{' '}
        <img className="bell-icon" src={bellIcon} alt="" />
        <span className="notifications">{t('Topbar.Notifications', { count: 2 })}</span>
        <div className="tokens-container">
          <img src={coinIcon} alt="coinIcon" />
          <span className="token-number">1232</span>
          <span className="tokens">Tokens </span>
        </div>
        <Dropdown className="dropdown">
          <div className="country-name">Lavivatienda</div>
          <img src={flag} className="flag" height="20" alt="" />
          <img src={amazon} className="company" height="20" alt="" />
          <Dropdown.Toggle className="dropdown-toggle" />
          <Dropdown.Menu className="dropdown-menu">
            <StoreList />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
