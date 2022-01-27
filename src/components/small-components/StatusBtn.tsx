import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  handleSelect: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  active? : boolean;
}


export const StatusBtn = (props: Props) => {
  const { title, handleSelect, className } = props;

  return (
    <button className={`status-btn ${className}`} onClick={handleSelect}>
      {title}
    </button>
  );
};
