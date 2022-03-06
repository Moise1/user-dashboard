import { ReactNode, useState } from 'react';
import { Layout, Card, Pagination } from 'antd';
import { Search, ChevronLeft, ChevronRight } from 'react-feather';
import { catalogData, ICatalogData } from '../../dummy-data/dummyData';
import { SuccessBtn } from '../small-components/ActionBtns';
import {FiltersBtn} from '../small-components/TableActionBtns';
import { ConfirmBtn } from '../small-components/ActionBtns';
import { SearchOptions } from '../small-components/SearchOptions';
import { PopupModal } from '../modals/PopupModal';
import { ProductDetails } from './ProductDetails';
import { AllProducts } from './AllProducts';
import { CatalogSource } from '../sources/CatalogSource';
import { t } from '../../utils/transShim';
import { CatalogFilters } from '../small-components/AdvancedSearchDrawers';
import '../../sass/catalog.scss';


type paginationSteps = 'prev' | 'next' | 'page' | 'jump-prev' | 'jump-next' ;

export const Catalog = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const [allProductsModalOpen, setAllProductsModalOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<ICatalogData[]>([]);
  const [className, setClassName] = useState<string>('product-card');

  const { Meta } = Card;

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleProductModal = () => setModalOpen(!modalOpen);
  const handleSourceModal = () => setSourceModalOpen(!sourceModalOpen);
  const handleAllProudctsModal = () => setAllProductsModalOpen(!allProductsModalOpen);

  const handleSelectProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const cardElement = e.currentTarget;
    const selectedProductData = catalogData.filter((d) => d.id === JSON.parse(cardElement.id))[0];
    setProductId(JSON.parse(cardElement.id));
    if (cardElement.classList.contains('selected-product-card')) {
      cardElement.classList.remove('selected-product-card');
      setAllProducts((prevState) => [...prevState].filter((d) => d.id !== JSON.parse(cardElement.id)));
    } else {
      cardElement.classList.add('selected-product-card');
      setAllProducts((prevState) => [...prevState, selectedProductData]);
    }
  };

  const selectedProduct = catalogData.filter((d) => d.id === productId)[0];

  const handleAddAllProducts = (): void => {
    setClassName(className + ' ' + 'selected-product-card');
    setAllProducts(catalogData);
  };

  const handleClearAllSelectedProducts = (): void => {
    setClassName('product-card');
    setAllProducts([]);
  };


  const itemRender = (page: number, type: paginationSteps, originalElement: ReactNode): ReactNode =>{
    if(type === 'prev') return <ChevronLeft/>;
    if(type === 'next') return <ChevronRight/>;
    return originalElement;
  };
  
  return (
    <Layout className="catalog-container">
      <div className="actions-section">
        <div className="view-clear-all">
          <p className="all-selected-products" onClick={handleAllProudctsModal}>
            View all selected products
          </p>
          <div className="clear-list-container">
            <p className="clear-all" onClick={handleClearAllSelectedProducts}>
              Clear all
            </p>
            {!!allProducts.length && (
              <SuccessBtn className="list-btn-mobile">List {allProducts.length} product(s)</SuccessBtn>
            )}
          </div>
        </div>
        <div className="filters-container">
          <FiltersBtn handleSideDrawer={handleSideDrawer}>{t('filters')}</FiltersBtn>
        </div>
      </div>

      <SearchOptions showSearchInput={false}/>
      <CatalogFilters visible={drawerOpen} onClose={handleSideDrawer} openSourceModal={handleSourceModal}/>
      <PopupModal
        open={modalOpen}
        handleClose={handleProductModal}
        width={900}
        title={
          <div className="modal-title">
            <h1 className="title">{selectedProduct?.title}</h1>
            <p className="source">{selectedProduct?.source}</p>
          </div>
        }
      >
        <ProductDetails
          img={selectedProduct?.img}
          details={selectedProduct?.details}
          profit={selectedProduct?.profit}
          cost={selectedProduct?.cost}
          sell={selectedProduct?.sell}
          handleClose={handleProductModal}
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
        }
      >
        <CatalogSource handleClose={handleSourceModal} />
      </PopupModal>

      <PopupModal
        open={allProductsModalOpen}
        handleClose={handleAllProudctsModal}
        width={600}
        style={{ overflowY: 'scroll' }}
        bodyStyle={{ height: 500 }}
        closable={false}
      >
        <AllProducts>{allProducts}</AllProducts>
      </PopupModal>

      <div className="catalog-cards">
        <div className="cards-container-catalog">
          {catalogData.map((d) => (
            <Card key={d.id} className={className} onClick={handleSelectProduct} id={`${JSON.stringify(d.id)}`}>
              <Meta
                description={
                  <div className="product-description">
                    <div className="img-container">
                      <img src={d.img} className="product-img" />
                    </div>
                    <div className="product-info-area">
                      <div className="header">
                        <p className="product-title">{d.title}</p>
                        <p className="source">by {d.source}</p>
                        <Search className="view-details" onClick={handleProductModal} />
                      </div>
                      <div className="transaction-details">
                        <div>
                          <p className="transaction-type">Sell</p>
                          <p className="transaction-amount sell">
                            <span>&pound;</span>
                            {d.sell}
                          </p>
                        </div>
                        <div>
                          <p className="transaction-type">Cost</p>
                          <p className="transaction-amount cost">
                            <span>&pound;</span>
                            {d.cost}
                          </p>
                        </div>
                        <div>
                          <p className="transaction-type">Profit</p>
                          <p className="transaction-amount profit">
                            <span>&pound;</span>
                            {d.profit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
        <div className="pagination-addall-container">
          <div className="pagination-container">
            <Pagination defaultCurrent={1} total={600} responsive itemRender={itemRender}/>
          </div>
          <div className="adall-container">
            {!!allProducts.length && <SuccessBtn>List {allProducts.length} product(s)</SuccessBtn>}
            <ConfirmBtn handleClick={handleAddAllProducts}>{t('addAll')}</ConfirmBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
};
