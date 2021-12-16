import { ReactNode } from 'react';

interface props {
  title: string | ReactNode;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export const NextBtn = (props: props) => {
  const { title, onClick, disabled } = props;

  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`border-0 bg-trans mx-md-auto ml-auto ${disabled ? ' text-grey btn-disbaled' : 'd-blue'}`}
    >
      <div className="d-flex align-items-center">
        <span className="font-weight-bold">{title}</span>
        <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-md-1"></i>
      </div>
    </button>
  );
};
