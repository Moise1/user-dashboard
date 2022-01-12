import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  active?: boolean;
}

export const StatusBtn = (props: Props) => {
  const { title, handleClick, active } = props;

  return (
    <button className={`${active ? 'active-btn' : 'inactive-btn'} active-btn`} onClick={handleClick}>
      {title}
    </button>
  );
};
