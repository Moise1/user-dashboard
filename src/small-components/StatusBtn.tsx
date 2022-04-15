import '../sass/listings-status.scss';

interface Props {
  title: string;
  changeTab: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  id?: string;
}

export const StatusBtn = (props: Props) => {
  const { title, changeTab, className, id } = props;

  return (
    <button className={`status-btn ${className}`} onClick={changeTab} id={id}>
      {title}
    </button>
  );
};
