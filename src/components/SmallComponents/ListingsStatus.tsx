import { useState, useEffect } from 'react';
import ListingsStatusBtn from './ListingsStatusBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/listings-status.scss';

let hasAddedCallback = false;

const ListingsStatus = () => {
  const [active, setActive] = useState(1);

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

  const onChangeTab = (number: number) => {
    setActive(number);
  };

  const windowwidth = window.innerWidth;
  return (
    <div className="listings-status-container">

      <ListingsStatusBtn
        onChangeTab={() => onChangeTab(1)}
        index={1}
        active={active}
        title={`${windowwidth < 900 ? t('ActiveListingsShort') : t('ActiveListings')}`}
      />

      <ListingsStatusBtn
        onChangeTab={() => onChangeTab(2)}
        index={2}
        active={active}
        title={`${windowwidth < 900 ? t('PendingListingsShort') : t('PendingListings')}`}
      />
      <ListingsStatusBtn
        onChangeTab={() => onChangeTab(3)}
        index={3}
        active={active}
        title={`${windowwidth < 900 ? t('TerminatedListingsShort') : t('TerminatedListings')}`}
      />
    </div>
  );
};

export default ListingsStatus;
