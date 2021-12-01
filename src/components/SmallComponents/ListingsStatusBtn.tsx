import { useState, useEffect } from 'react';
import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
}

const ListingsStatusBtn = (props: Props) => {
  const { title } = props;
  let hasAddedCallback = false;
  const [active, setActive] = useState(1);
  const [index, setIndex] = useState(1);

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

  const onChangeTab = () => {
    setActive((preveStep) => preveStep + 1);
    setIndex((preveStep) => preveStep + 1);
  };

  return (
    <button onClick={onChangeTab} className={`${active == index ? 'active-btn' : 'inactive-btn'} status-btn`}>
      {title}
    </button>
  );
};

export default ListingsStatusBtn;
