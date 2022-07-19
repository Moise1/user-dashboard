import { useState, useEffect, useContext } from 'react';
import { Progress, Badge, Menu, Dropdown } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import coinIcon from '../../assets/token.svg';
import bell from '../../assets/bell-icon.svg';
import { StoreList } from '../../small-components/StoreList';
import Logo from '../../assets/logoHGR.png';
import { t } from 'src/utils/transShim';
import { PopupModal } from '../modals/PopupModal';
import { BuyTokens } from './BuyTokens';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getNotifications } from '../../redux/notifications/notificationsThunk';
import { AppContext } from '../../contexts/AppContext';
import '../../sass/top-bar.scss';
import { Links } from '../../links';
import { getUserToken, getUserQuota } from 'src/redux/user/userThunk';

interface Props extends RouteComponentProps {
  showMobileSider: () => void;
}

export const Topbar = withRouter((props: Props) => {
  const { showMobileSider, history } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const { tokens } = useAppSelector((state) => state.user);
  const { quota } = useAppSelector((state) => state.user);
  const { channels } = useAppSelector((state) => state.channels);

  // const { notifications } = useAppSelector((state) => state.notifications);
  const handleOpenModal = () => setOpen(!open);

  const routeChange = (route: string) => {
    history.push(route);
  };

  const qoutaPercentage = (partial: number, total: number) => {
    return Math.round((100 * partial) / total);
  };

  const { channelId } = useContext(AppContext);
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getUserQuota());
    dispatch(getUserToken());
  }, [getNotifications, channelId, getUserToken, getUserQuota]);

  const notificationsMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <p>
              Your NO API extension is not connected to{' '}
              <strong>
                {channels
                  .map(({ name }: { name: string }) => name)
                  .slice(0, 4)
                  .join(' , ')}
              </strong>
              . &nbsp;
              <a 
                href={`${Links.HGRChromeExtension}`}
                target="_blank" rel="noreferrer"
              >
                Install and connect the extension
              </a> or{' '}
              <a 
                href={`${Links.NoAPIServer}`}
                target="_blank" rel="noreferrer"
              >
                We connect it for you.
              </a>
            </p>
          )
        },
        {
          key: '2',
          label: (
            <div>
              <Link to="/check-alert" className="alternative-link">
                There &apos;s an alert about <strong>NO API Server.</strong> Click here to check it.
              </Link>
            </div>
          )
        }
      ]}
    />
  );

  return (
    <div className="top-bar">
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
              {quota && (
                <>
                  {qoutaPercentage(quota.used, quota.quota)}% ({quota.used}/{quota.quota})
                </>
              )}
            </span>
          </div>
          {quota && (
            <Progress percent={qoutaPercentage(quota.used, quota.quota)} showInfo={false} className="progress-bar" />
          )}
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
      <div className="top-bar-item notifications-container">
        <Dropdown
          arrow
          placement="bottom"
          overlay={notificationsMenu}
          overlayStyle={{
            width: '20vw',
            position: 'fixed'
          }}
        >
          <Badge count={1} className="notifications-badge">
            <img src={bell} alt="" />
          </Badge>
        </Dropdown>
      </div>
      <StoreList />
    </div>
  );
});
