import { useState, useEffect, useContext } from 'react';
import { Progress, Badge } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import coinIcon from '../../assets/token.svg';
import bell from '../../assets/bell-icon.svg';
import { StoreList } from '../../small-components/StoreList';
import Logo from '../../assets/logoHGR.png';
import { t } from 'src/utils/transShim';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from './BuyTokens';
import { DeleteAccount } from '../user/DeleteAccount';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getNotifications } from '../../redux/notifications/notificationsThunk';
import { AppContext } from '../../contexts/AppContext';
import '../../sass/top-bar.scss';
import { Links } from '../../links';
import { getUserToken } from 'src/redux/user/userThunk';
import { client } from 'src/redux/client';

interface Props extends RouteComponentProps {
  showMobileSider: () => void;
}

export const Topbar = withRouter((props: Props) => {
  const [quotaused, setQuotaused] = useState<number>(0);
  const [quotatotal, setQuotatotal] = useState<number>(0);
  useEffect(() => {
    (async () => {
      try {
        const quotaRes = await client.get('/Dashboard/GetProductQuotaSummary');
        setQuotaused(quotaRes.data.response_data.used);
        setQuotatotal(quotaRes.data.response_data.quota);
      } catch (error) {
        if (error) console.log('Product quota data failed to load');
      }
    })();
  }, []);

  const { showMobileSider, history } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const { tokens } = useAppSelector((state) => state.user);

  const { notifications } = useAppSelector((state) => state.notifications);
  const handleCheck = () => setChecked(!checked);
  const handleOpenModal = () => setOpen(!open);

  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleCancel = () => setOpenDeleteModal(!openDeleteModal);
  const handleDelete = () => setOpenDeleteModal(!openDeleteModal);

  const routeChange = (route: string) => {
    history.push(route);
  };

  const qoutaPercentage = (partial: number, total: number) => {
    if (quotaused && quotatotal) {
      return Math.round((100 * partial) / total);
    } else {
      return 0;
    }
  };

  const { channelId } = useContext(AppContext);
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getUserToken());
  }, [getNotifications, channelId, getUserToken]);

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
      <div className="menu-burger" onClick={showMobileSider}>
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
              {qoutaPercentage(quotaused, quotatotal)}% ({quotaused}/{quotatotal})
            </span>
          </div>
          <Progress percent={qoutaPercentage(quotaused, quotatotal)} showInfo={false} className="progress-bar" />
          <button type="button" onClick={() => routeChange(Links.Subscriptions)} className="upgrade-btn">
            {t('Topbar.Upgrade')}
          </button>
        </div>
      </div>
      <div className="top-bar-item">
        <div className="tokens-container" onClick={handleOpenModal}>
          <img src={coinIcon} className="token-icon" alt="coinIcon" />
          <span className="token-number">{tokens}</span>
          <span className="tokens">tokens </span>
        </div>
      </div>
      <div className="top-bar-item">
        <div onClick={handleDeleteModal} className="notifications-container">
          <Badge count={notifications?.length} className="notifications">
            <img src={bell} alt="" />
          </Badge>
        </div>
      </div>
      <StoreList />
    </div>
  );
});
