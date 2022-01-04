import { useState, useEffect } from 'react';
import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  active?: number;
  index?: number;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const StatusBtn = (props: Props) => {
  const { title, handleClick, active, index } = props;
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
    <button onClick={handleClick}
      className={`${active == index ? 'active-btn' : 'inactive-btn'} status-btn`}
    >
      {title}
    </button>
  );
};
