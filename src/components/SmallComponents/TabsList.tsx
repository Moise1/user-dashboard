import { useState, useEffect } from 'react';
import TabButton from './TabButton';
import { t } from '../../global/transShim';

let hasAddedCallback = false;
const TabsList = () => {
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
    <div className="px-1">
      <div className="row mx-auto mt-3 mb-2 d-blue align-items-center bg-white br-8 p-3 header-box-shadow">
        <TabButton
          onChangeTab={() => onChangeTab(1)}
          index={1}
          active={active}
          title={`${windowwidth < 900 ? t('ActiveListingsShort') : t('ActiveListings')}`}
        />

        <TabButton
          onChangeTab={() => onChangeTab(2)}
          index={2}
          active={active}
          title={`${windowwidth < 900 ? t('PendingListingsShort') : t('PendingListings')}`}
        />
        <TabButton
          onChangeTab={() => onChangeTab(3)}
          index={3}
          active={active}
          title={`${windowwidth < 900 ? t('TerminatedListingsShort') : t('TerminatedListings')}`}
        />
      </div>
    </div>
  );
};

export default TabsList;
