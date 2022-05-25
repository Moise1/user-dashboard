import { CloseIcon } from '../../small-components/CloseIcon';
import { ICatalogData } from '../../dummy-data/dummyData';
import { ProductElementEvent } from './Catalog';
import '../../sass/all-products.scss';

interface Props {
  children: ICatalogData[];
  removeProduct: (e: ProductElementEvent) => void;
  className: string;
}

export const AllProducts = ({ children, removeProduct, className }: Props) => {
  return (
    <div className="selected-products-modal">
      {children.length ? (
        children?.map((c) => (
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
            <CloseIcon className={`close-icon ${className}`} onClick={removeProduct} id={JSON.stringify(c.id)} />
          </div>
        ))
      ) : (
        <p>No selected products yet.</p>
      )}
    </div>
  );
};
