import '../../sass/light-theme/status-bar.scss';
interface StatusBarProps {
  children: JSX.Element[];
  className?: string;
}
export const StatusBar = ({className, children}: StatusBarProps) => {
  return <div className={`status-bar ${className}`}>{children}</div>;
};
