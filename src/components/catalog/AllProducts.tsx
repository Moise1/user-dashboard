import { useState } from 'react';
import { CloseIcon } from '../../small-components/CloseIcon';
import { ICatalogData } from '../../dummy-data/dummyData';
import '../../sass/all-products.scss';

interface Props {
  children: ICatalogData[];
}

export const AllProducts = ({ children }: Props) => {
  const [modalData, setModalData] = useState<ICatalogData[]>(children);
  const removeProduct = (id: number): void => setModalData(modalData.filter((c) => c.id !== id));

  return (
    <div className="selected-products-modal">
      {modalData.length ? (
        modalData.map((c) => (
          <div className="product-card" key={c.id}>
            <img src={c.img} alt="" className="product-img" />
            <div className="product-info-area">
              <div className="header">
                <p>{c.title}</p>
                <p className="source">by {c.source}</p>
              </div>
              <div className="transaction-details">
                <div>
                  <p className="transaction-type">Sell</p>
                  <p className="transaction-amount sell">
                    <span>&pound;</span>
                    {c.sell}
                  </p>
                </div>
                <div>
                  <p className="transaction-type">Cost</p>
                  <p className="transaction-amount cost">
                    <span>&pound;</span>
                    {c.cost}
                  </p>
                </div>
                <div>
                  <p className="transaction-type">Profit</p>
                  <p className="transaction-amount profit">
                    <span>&pound;</span>
                    {c.profit}
                  </p>
                </div>
              </div>
            </div>
            <CloseIcon className="close-icon" onClick={() => removeProduct(c.id)} />
          </div>
        ))
      ) : (
        <p>No selected products yet.</p>
      )}
    </div>
  );
};
