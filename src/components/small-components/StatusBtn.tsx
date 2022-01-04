import { useState, useEffect } from 'react';
import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  active?: boolean;
}

export const StatusBtn = (props: Props) => {
  const { title, handleClick, active } = props;
  let hasAddedCallback = false;

  const [_dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    if (!hasAddedCallback) {
      window.addEventListener('resize', handleResize);
      hasAddedCallback = true;
    }
  });
  return (
    <button className={`${active  ? 'active-btn' : 'inactive-btn'} active-btn`} onClick={handleClick}>
      {title}
    </button>
  );
};
