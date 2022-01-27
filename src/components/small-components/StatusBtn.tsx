import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  changeTab: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  active? : boolean;
}


export const StatusBtn = (props: Props) => {
  const { title, changeTab, className } = props;

  return (
    <button className={`status-btn ${className}`} onClick={changeTab}>
      {title}
    </button>
  );
};
