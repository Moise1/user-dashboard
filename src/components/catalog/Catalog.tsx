import {useState} from 'react';
import { catalogData } from '../../dummy-data/dummyData';
import { Search } from 'react-feather';
import { Card } from 'antd';
import '../../sass/light-theme/catalog.scss';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { SearchOptions } from '../small-components/SearchOptions';
import { PopupModal } from '../modals/PopupModal';
import { ProductDetails } from './ProductDetails';

const { Meta } = Card;
export const Catalog = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleClose = () => setModalOpen(!modalOpen);
  const handleSelectProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>{
    setProductId(JSON.parse(e.currentTarget.id));
  };
  const selectedProduct = catalogData.filter(d => d.id === productId);
  return (
    <div className="catalog-container">
     
      <TableActionBtns 
        showColumns={false}
        handleSideDrawer={handleSideDrawer}
      />
      <SearchOptions visible={drawerOpen} onClose={handleSideDrawer} showSearchInput={false}/>
      <PopupModal
        open={modalOpen}
        handleClose={handleClose} width={900}
        title={
          <div className="modal-title">
            <h1 className="title">{selectedProduct[0]?.title}</h1>
            <p className="source">{selectedProduct[0]?.source}</p>
          </div>
        }>

        <ProductDetails/>
      </PopupModal>
      {catalogData.map((d) => (
        <Card key={d.id} className="product-card" onClick={handleSelectProduct} id={`${JSON.stringify(d.id)}`}>
          <img src={d.img} className="product-img" />
          <Meta
            description={
              <div className="product-description">
                <div className="title-section">
                  <h6 className="product-title">{d.title}</h6>
                  <Search className="view-details" onClick={handleClose}/>
                </div>
                <p className="source">by {d.source}</p>
                <div className="transaction-details">
                  <div className="transaction-type">
                    <p>Sell</p>
                    <p>Cost</p>
                    <p>Profit</p>
                  </div>
                  <div className="transaction-amount">
                    <p>
                      <span>&pound;</span> {d.sell}
                    </p>
                    <p>
                      <span>&pound;</span> {d.cost}
                    </p>
                    <p>
                      <span>&pound;</span> {d.profit}
                    </p>
                  </div>

                </div>
              </div>
            }
          />
        </Card>
      ))}
    </div>
  );
};
