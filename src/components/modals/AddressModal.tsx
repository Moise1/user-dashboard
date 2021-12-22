import { Form } from 'react-bootstrap';
// import { CrossModalIcon, IconEdit } from '../common/Icons';
import { t } from '../../global/transShim';

interface Props {
  setAddressModalShow: (value: boolean) => void;
  handleCloseAllModals: () => void;
}

const AddressModal = (props: Props) => {
  const { handleCloseAllModals, setAddressModalShow } = props;
  console.log(handleCloseAllModals, setAddressModalShow);
  return (
    <div className="ship-bill-box p-3">
      <div className="row">
        <div className="col-12">
          <div className="row justify-content-between">
            {/* SHIPPING ADDRESSS  */}
            <div className="col-6 col-lg-5">
              <div className="modal-second-inputs  ">
                <h1 className="shop-address ">{t('OrderDetails.ShippingAddress')}</h1>
                <p className="modal-second-input-heads pt-3"> {t('OrderDetails.StreetAddress')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
                <p className="modal-second-input-heads pt-3"> {t('OrderDetails.City')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
                <p className="modal-second-input-heads pt-3"> {t('OrderDetails.PostalCodeState')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
              </div>
            </div>

            {/* BILLING ADDRESSS  */}
            <div className="col-6 col-lg-6">
              <div className="modal-second-inputs">
                <h1 className="shop-address "> {t('OrderDetails.Billingaddress')}</h1>
                <p className="modal-second-input-heads pt-3">{t('OrderDetails.StreetAddress')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
                <p className="modal-second-input-heads pt-3">{t('OrderDetails.City')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
                <p className="modal-second-input-heads pt-3">{t('OrderDetails.PostalCodeState')}</p>
                <Form.Control className="modal-inputs" type="text" placeholder="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
