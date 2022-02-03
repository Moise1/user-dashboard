import {useState} from 'react';
import { catalogData } from '../../dummy-data/dummyData';
import { Search } from 'react-feather';
import { Card } from 'antd';
import '../../sass/light-theme/catalog.scss';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { SearchOptions } from '../small-components/SearchOptions';
import { PopupModal } from '../modals/PopupModal';
import { ProductDetails } from './ProductDetails';
import { CatalogSource } from '../sources/CatalogSource';

const { Meta } = Card;
export const Catalog = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleProdcutModal = () => setModalOpen(!modalOpen);
  const handleSourceModal = () => setSourceModalOpen(!sourceModalOpen);

  const handleSelectProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>{
    setProductId(JSON.parse(e.currentTarget.id));
  };
  const selectedProduct = catalogData.filter(d => d.id === productId)[0];
  return (
    <div className="catalog-container">
      <TableActionBtns 
        showColumns={false}
        handleSideDrawer={handleSideDrawer}

      />
      <SearchOptions 
        visible={drawerOpen} 
        onClose={handleSideDrawer}
        showSearchInput={false}
        openSourceModal={handleSourceModal}
      />
      
      <PopupModal
        open={modalOpen}
        handleClose={handleProdcutModal}
        width={900}
        title={
          <div className="modal-title">
            <h1 className="title">{selectedProduct?.title}</h1>
            <p className="source">{selectedProduct?.source}</p>
          </div>
        }>

        <ProductDetails 
          img={selectedProduct?.img}
          details={selectedProduct?.details}
          profit={selectedProduct?.profit}
          cost={selectedProduct?.cost}
          sell={selectedProduct?.sell}
          handleClose={handleProdcutModal}
        />
      </PopupModal>

      <PopupModal 
        open={sourceModalOpen} 
        handleClose={handleSourceModal}
        width={800}
        title={
          <div className="modal-title">
            <h1 className="title">Select Sources</h1>
            <p className="source">Include or exclude selected sources to refine the catalog</p>
          </div>
        }>
        <CatalogSource handleClose={handleSourceModal}/>
      </PopupModal>

      <div className="cards-container">
        {catalogData.map((d) => (
          <Card key={d.id} className="product-card" onClick={handleSelectProduct} id={`${JSON.stringify(d.id)}`}>
            <img src={d.img} className="product-img" />
            <Meta
              description={
                <div className="product-description">
                  <div className="title-section">
                    <h6 className="product-title">{d.title}</h6>
                    <Search className="view-details" onClick={handleProdcutModal}/>
                  </div>
                  <p className="source">by {d.source}</p>
                  <div className="transaction-details">
                    <div className="transaction-type">
                      <p><strong>Sell</strong></p>
                      <p><strong>Cost</strong></p>
                      <p><strong>Cost</strong></p>
                    </div>
                    <div className="transaction-amount">
                      <p>
                        <strong><span>&pound;</span> {d.sell}</strong>
                      </p>
                      <p>
                        <strong><span>&pound;</span> {d.cost}</strong>
                      </p>
                      <p>
                        <strong> <span>&pound;</span> {d.profit}</strong>
                      </p>
                    </div>

                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
