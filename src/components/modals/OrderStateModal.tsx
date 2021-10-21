import React from 'react';
import { Modal } from 'react-bootstrap';
import { AoIconHead, CrossModalIcon, LeftBackArrowIcon } from '../common/Icons';
import { t } from '../../global/transShim';

interface Props {
  AoDisabledModal: boolean;
  setAoDisabledModal: (value: boolean) => void;
}

const OrderStateModal = (props: Props) => {
  const { AoDisabledModal, setAoDisabledModal } = props;

  return (
    <>
      <Modal
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
              <div className="d-flex flex-column flex-sm-row">
                <h2 className="head-part-one mr-2 mr-lg-5">{t('OrderDetails.OrderStateProgress')}</h2>
                <button className="btn ao-disabled-button">
                  <span>
                    <AoIconHead />
                  </span>
                  <span className="px-3"> {t('OrderDetails.AODisabled')}</span>
                </button>
              </div>

              <span className="cursor-pointer cross-round-iconModal" onClick={() => setAoDisabledModal(false)}>
                <CrossModalIcon />
              </span>
            </div>

            <div className="middle-part-autoordering">
              <p> {t('OrderDetails.AutoOrderingParagraph')}</p>

              <button className="btn"> {t('OrderDetails.HowToEnableAutoOrdering')}</button>
            </div>

            <div className="row">
              <div className="col-12 d-flex flex-column flex-lg-row justify-content-between ">
                <span className="order-details-back-text">
                  {t('OrderDetails.OrderDetails')}
                  <span className="rotate-180-arrow">
                    <LeftBackArrowIcon />
                  </span>{' '}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderStateModal;
