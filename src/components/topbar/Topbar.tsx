import { useState } from 'react';
import { Dropdown, Button, Progress, Badge } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import coinIcon from '../../assets/token.svg';
import downArrow from '../../assets/downArrow.svg';
import flag from '../../assets/flag-round-500.svg';
import bell from '../../assets/bell-icon.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import StoreList from '../small-components/StoreList';
import Logo from '../../assets/logoHGR.png';
import { t } from 'src/utils/transShim';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from './BuyTokens';
import { DeleteAccount } from '../user/DeleteAccount';
import {useAppSelector} from '../../custom-hooks/reduxCustomHooks';
import '../../sass/top-bar.scss';

interface Props extends RouteComponentProps {
  handleSidebarMobile: () => void;
}

export const Topbar = withRouter((props: Props) =>{
  const { handleSidebarMobile, history } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const { quotaUsed, quotaAdded } = useAppSelector((state) => state.user.response_data);
  const handleCheck = () => setChecked(!checked);
  const handleOpenModal = () => setOpen(!open);

  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleCancel = () => setOpenDeleteModal(!openDeleteModal);
  const handleDelete = () => setOpenDeleteModal(!openDeleteModal);

  const routeChange = (route: string) => {
    history.push(route);
  };

  const qoutaPercentage = (partial: number, total:number)=>{
    return Math.round((100  * partial) / total);
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

      <PopupModal 
        open={open} 
        width={800} 
        style={{ top: 20 }} 
        bodyStyle={{ height: 600 }} 
        handleClose={handleOpenModal}
      >
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
      <div className="quota-container-topbar">
        <div className="quota-container">
          <div className="quota">
            <strong className="quota-text">
              <p>{t('Topbar.Quota')}: &nbsp;</p>
            </strong>
            <span className="quota-progress">
              {qoutaPercentage(quotaUsed, quotaAdded)}% 
              ({quotaUsed}/{quotaAdded})
            </span>
          </div>
          <Progress percent={qoutaPercentage(quotaUsed, quotaAdded)} showInfo={false} className="progress-bar" />
          <button type="button" onClick={() => routeChange('/subscriptions')} className="update-btn">
            {t('Topbar.Update')}
          </button>
        </div>
      </div>
      <div className="top-bar-item">
        <div className="tokens-container" role="button" onClick={handleOpenModal}>
          <img src={coinIcon} className="token-icon" alt="coinIcon" />
          <span className="token-number">1232</span>
          <span className="tokens">Tokens </span>
        </div>
      </div>
      <div className="top-bar-item">
        <div onClick={handleDeleteModal} className="notifications-container">
          <Badge count={2} className="notifications">
            <img src={bell} alt="" />
          </Badge>
        </div>
      </div>
      <Dropdown overlay={<StoreList />} placement="bottomLeft" trigger={['click']} className="dropdown">
        <div className="">
          <span className="store-name">Teststore</span>
          <img src={flag} className="flag" height="20" alt="" />
          <img src={amazon} className="company" height="20" alt="" />
          <Button className="btn-arrow-container">
            <img src={downArrow} className="down-arrow-icon" alt="coinIcon" aria-hidden="true" />
          </Button>
        </div>
      </Dropdown>
    </div>
  );
});