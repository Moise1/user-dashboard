import '../../sass/light-theme/listings-status.scss';

interface StatusBarProps {
  children: JSX.Element[];
}
const StatusBar = (props: StatusBarProps) => {
  return <div className="status-bar">{props.children}</div>;
};

export default StatusBar;
