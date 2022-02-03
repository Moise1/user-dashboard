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
import { Badge, Avatar } from 'antd';
import { User } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from './BuyTokens';
import { DeleteAccount } from '../users/DeleteAccount';

interface Props {
  handleSidebarMobile: () => void;
}

const Topbar = (props: Props) => {
  const { handleSidebarMobile } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheck = () => setChecked(!checked);
  const handleOpenModal = () => setOpen(!open);

  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleCancel = () => setOpenDeleteModal(!openDeleteModal);
  const handleDelete = () => setOpenDeleteModal(!openDeleteModal);

  const history = useHistory();

  const routeChange = (route: string) => {
    history.push(route);
  };

  return (
    <div className="top-bar">
      <PopupModal open={openDeleteModal}>
        <DeleteAccount
          checked={checked}
          handleCheck={handleCheck}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </PopupModal>

      <PopupModal open={open} width={800} style={{ top: 20 }} bodyStyle={{ height: 600 }} handleClose={handleOpenModal}>
        <BuyTokens />
      </PopupModal>

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
          <button type="button" onClick={() => routeChange('/subscriptions')} className="update-btn">
            {t('Topbar.Update')}
          </button>
        </div>
        <Badge count={2} className="notifications">
          <img src={bell} alt="" />
        </Badge>
        <div className="tokens-container" role="button" onClick={handleOpenModal}>
          <img src={coinIcon} className="token-icon" alt="coinIcon" />
          <span className="token-number">1232</span>
          <span className="tokens">Tokens </span>
        </div>
        <Dropdown overlay={<StoreList />} placement="bottomLeft" trigger={['click']} className="dropdown">
          <div className="">
            <span className="store-name">Teststore</span>
            <img src={flag} className="flag" height="20" alt="" />
            <img src={amazon} className="company" height="20" alt="" />
            <Button>
              <img className="fa fa-caret-down" aria-hidden="true" />
            </Button>
          </div>
        </Dropdown>

        <Avatar size={40} icon={<User onClick={handleDeleteModal} />} />
      </div>
    </div>
  );
};

export default Topbar;
