import React from 'react';
import { AoIconHead, CrossModalIcon } from '../common/Icons';
import { t } from '../../utils/transShim';

interface Props {
  AoDisabledModal: boolean;
  setAoDisabledModal: (value: boolean) => void;
}

const OrderStateModal = (props: Props) => {
  const { AoDisabledModal, setAoDisabledModal } = props;

  return (
    <>
      {/* <Modal
        show={AoDisabledModal}
        onHide={() => setAoDisabledModal(false)}
        size="xl"
        centered
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="p-0 p-lg-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <h2 className="head-part-one mr-2 mr-lg-5">{t('OrderDetails.NoAutoOrdering')}</h2>
                <button className="btn">
                  <span>
                    <AoIconHead />
                  </span>
                  <span className="px-1 px-md-3"> {t('OrderDetails.AODisabled')}</span>
                </button>
              </div>

              <span className="cross-round-iconModal" onClick={() => setAoDisabledModal(false)}>
                <CrossModalIcon />
              </span>
            </div>
            <div className="middle-part-autoordering">
              <p> {t('OrderDetails.AutoOrderingParagraph')}</p>
              <button className="btn"> {t('OrderDetails.HowToEnableAutoOrdering')}</button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default OrderStateModal;