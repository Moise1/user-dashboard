import '../../sass/light-theme/listings-status.scss';
interface StatusBarProps {
  children: JSX.Element[];
  className?: string;
}
const StatusBar = (props: StatusBarProps) => {
  return <div className={`status-bar ${props.className}`}>{props.children}</div>;
};

export default StatusBar;
