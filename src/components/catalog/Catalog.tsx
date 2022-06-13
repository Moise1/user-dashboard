import React, { useState, useEffect } from 'react';
import { Layout, Card } from 'antd';
import { catalogData, ICatalogData } from '../../dummy-data/dummyData';
import { SuccessBtn } from '../../small-components/ActionBtns';
import { FiltersBtn } from '../../small-components/TableActionBtns';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { SearchOptions } from '../../small-components/SearchOptions';
import { PopupModal } from '../modals/PopupModal';
import { ProductDetails } from './ProductDetails';
import { AllProducts } from './AllProducts';
import { CatalogSource } from '../sources/catalog-source';
import { t } from '../../utils/transShim';
import { CatalogFilters } from '../../small-components/AdvancedSearchDrawers';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getCatalogProducts } from '../../redux/catalog/catalogThunk';
import { SearchOutlined } from '@ant-design/icons';
import '../../sass/catalog.scss';
import { CatalogProduct } from '../../redux/catalog/catalogSlice';
export type ElementEventType =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>;

export const Catalog = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const [allProductsModalOpen, setAllProductsModalOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<ICatalogData[]>([]);
  const [className, setClassName] = useState<string>('product-card');
  const dispatch = useAppDispatch();
  const { Meta } = Card;

  const { catalogProducts } = useAppSelector((state) => state.catalogProducts);
  const [allCatalogProducts, setAllCatalogProducts] = useState<CatalogProduct[]>([]);
  const [sessionId] = useState<number>(0);

  useEffect(() => {
    dispatch(getCatalogProducts({ sessionId }));
    setAllCatalogProducts(catalogProducts);
  }, [getCatalogProducts]);

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleProductModal = () => setModalOpen(!modalOpen);
  const handleSourceModal = () => setSourceModalOpen(!sourceModalOpen);
  const handleAllProudctsModal = () => setAllProductsModalOpen(!allProductsModalOpen);

  const handleSelectProduct = (e: ElementEventType): void => {
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

  const handleSelectAllProducts = (): void => {
    setClassName(className + ' ' + 'selected-product-card');
    setAllProducts(catalogData);
  };
  const handleClearAllSelectedProducts = (): void => {
    setClassName('product-card');
    setAllProducts([]);
  };

  return (
    <Layout className="catalog-container">
      <div className="actions-section">
        <div className="view-clear-all">
          <span className="all-selected-products" onClick={handleAllProudctsModal}>
            View all selected products
          </span>
          <div className="clear-list-container">
            <span className="clear-all" onClick={handleClearAllSelectedProducts}>
              Clear all
            </span>
            {!!allProducts.length && (
              <SuccessBtn className="list-btn-mobile">List {allProducts.length} product(s)</SuccessBtn>
            )}
          </div>
        </div>
        <a href="https://hustlegotreal.com/en/listing-service/" target="_blank" className="list-link" rel="noreferrer">
          Not sure what to list?  We do it for you.
        </a>
        <div className="filters-container">
          <FiltersBtn handleSideDrawer={handleSideDrawer}>{t('filters')}</FiltersBtn>
        </div>
      </div>

      <SearchOptions showSearchInput={false} />
      <CatalogFilters visible={drawerOpen} onClose={handleSideDrawer} openSourceModal={handleSourceModal}
        catalogData={allCatalogProducts} setAllProducts={setAllCatalogProducts}
      />
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
        <AllProducts removeProduct={handleSelectProduct} className={className}>
          {allProducts}
        </AllProducts>
      </PopupModal>

      <div className="catalog-cards">
        <div className="cards-container-catalog">
          {allCatalogProducts.map((d: CatalogProduct) => (
            <Card key={d.id} className={className} onClick={handleSelectProduct} id={JSON.stringify(d.id)}>
              <Meta
                description={
                  <div className="product-description">
                    <div className="img-container">
                      <img src={d.imageUrl} className="product-img" />
                    </div>
                    <div className="product-info-area">
                      <div className="header">
                        <p className="product-title">{d.title}</p>
                        <p className="source">by {d.sourceId}</p>
                        <SearchOutlined className="view-details" onClick={handleProductModal} style={{ fontSize: '19px' }} />
                      </div>
                      <div className="transaction-details">
                        <div>
                          <p className="transaction-type">Sell</p>
                          <p className="transaction-amount sell">
                            <span>&pound;</span>
                            {d.sold}
                          </p>
                        </div>
                        <div>
                          <p className="transaction-type">Cost</p>
                          <p className="transaction-amount cost">
                            <span>&pound;</span>
                            {d.sourcePrice}
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
          <div className="adall-container">
            {!!allProducts.length && <SuccessBtn>List {allProducts.length} product(s)</SuccessBtn>}
            <ConfirmBtn handleConfirm={handleSelectAllProducts}>{t('selectAll')}</ConfirmBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
};
