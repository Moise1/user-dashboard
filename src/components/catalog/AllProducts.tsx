import { CloseIcon } from '../../small-components/CloseIcon';
import { ElementEventType } from './Catalog';
import '../../sass/all-products.scss';
import { Product } from './Types';
interface Props {
  children: Product[];
  removeProduct: (e: ElementEventType) => void;
  className: string;
  getSourceName:(id: number) => unknown;
}

export const AllProducts = ({ children, removeProduct, className, getSourceName }: Props) => {
  return (
    <div className="selected-products-modal">
      {children.length ? (
        children?.map((c) => (
          <div className="product-card" key={c.id}>
            <img src={c.imageUrl} alt="" className="product-img" />
            <div className="product-info-area">
              <div className="header">
                <p
                  className="title">
                  {c?.title.length > 20 ? `${c?.title.substring(0, 28)} ...` : c?.title}
                </p>
                <p className="source">by {getSourceName(c.sourceId)}</p>
              </div>
              <div className="transaction-details">
                <div>
                  <p className="transaction-type">Sell</p>
                  <p className="transaction-amount sell">
                    <span>&pound;</span>
                    {c.channelPrice}
                  </p>
                </div>
                <div>
                  <p className="transaction-type">Cost</p>
                  <p className="transaction-amount cost">
                    <span>&pound;</span>
                    {c.sourcePrice}
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
