import React, { useState, useEffect } from 'react';
import { Layout, Card, Spin } from 'antd';
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
import { CatalogProduct, selectedProductDetailData } from '../../redux/catalog/catalogSlice';
import '../../sass/catalog.scss';
import { getSources } from 'src/redux/sources/sourcesThunk';

export type ElementEventType =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>
  | React.MouseEvent;

export const Catalog = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const [allProductsModalOpen, setAllProductsModalOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);
  const [className, setClassName] = useState<string>('product-card');
  const [sourcesIds, setSourcesIds] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { Meta } = Card;

  const { catalogProducts, loading } = useAppSelector((state) => state.catalogProducts);
  const { sources } = useAppSelector((state) => state.sources);

  const [allCatalogProducts, setAllCatalogProducts] = useState<CatalogProduct[]>([]);
  const [sessionId] = useState<number>(0);
  const [selectedProductDataDetail, setSelectedProductDataDetail] = useState<selectedProductDetailData>({
    channelPrice: 0,
    competition: 0,
    id: 0,
    imageUrl: '',
    options: 0,
    priority: 0,
    profit: 0,
    quantityListed: 0,
    sold: 0,
    sourceId: 0,
    sourcePrice: 0,
    title: '',
    url: ''
  });

  useEffect(() => {
    dispatch(getCatalogProducts({ sessionId }));
    setAllCatalogProducts(catalogProducts);
    dispatch(getSources());
  }, [getCatalogProducts]);

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleProductModal = (id: number) => {
    setSelectedProductDataDetail(allCatalogProducts?.filter((d) => d.id === id)[0]);
    setModalOpen(!modalOpen);
  };
  const handleSourceModal = () => setSourceModalOpen(!sourceModalOpen);
  const handleAllProductsModal = () => setAllProductsModalOpen(!allProductsModalOpen);
  const handleSelectProduct = (e: ElementEventType): void => {
    const cardElement = e.currentTarget;
    const selectedProductData = allCatalogProducts.filter((d) => d.id === JSON.parse(cardElement.id))[0];
    setProductId(JSON.parse(cardElement.id));
    if (cardElement.classList.contains('selected-product-card')) {
      setProductId(0);
      cardElement.classList.remove('selected-product-card');
      setAllProducts((prevState) => [...prevState].filter((d) => d.id !== JSON.parse(cardElement.id)));
    } else {
      cardElement.classList.add('selected-product-card');
      setAllProducts((prevState) => [...prevState, selectedProductData]);
    }
  };

  const removeSelectedProduct = (e: ElementEventType): void => {
    const cardElement = e.currentTarget;
    const selectedProductData = allCatalogProducts.filter((d) => d.id === JSON.parse(cardElement.id))[0];
    console.log({ selectedProductData });
    setAllProducts((prevState) => [...prevState].filter((d) => d.id !== JSON.parse(cardElement.id)));
  };

  const handleSelectAllProducts = (): void => {
    setClassName(className + ' ' + 'selected-product-card');
    setAllProducts(allCatalogProducts);
  };
  const handleClearAllSelectedProducts = (): void => {
    setClassName('product-card');
    setAllProducts([]);
  };
  const getSourcesData = (ids: number[]) => {
    setSourcesIds(ids);
  };

  return (
    <Layout className="catalog-container">
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="actions-section">
            <div className="view-clear-all">
              <span className="all-selected-products" onClick={handleAllProductsModal}>
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
            <a
              href="https://hustlegotreal.com/en/listing-service/"
              target="_blank"
              className="list-link"
              rel="noreferrer"
            >
              Not sure what to list? We do it for you.
            </a>
            <div className="filters-container">
              <FiltersBtn handleSideDrawer={handleSideDrawer}>{t('filters')}</FiltersBtn>
            </div>
          </div>
          <SearchOptions showSearchInput={false} />
          <CatalogFilters
            visible={drawerOpen}
            onClose={handleSideDrawer}
            openSourceModal={handleSourceModal}
            setAllCatalogProducts={setAllCatalogProducts}
            suppliersCount={sourcesIds}
          />
          <PopupModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            width={900}
            title={
              <div className="modal-title">
                {/* <h1 className="title">{selectedProductDataDetail?.title.length > 20 ? `${selectedProductDataDetail?.title.substring(0, 20)} ...` : selectedProductDataDetail?.title}</h1> */}
                <h5>{selectedProductDataDetail.title}</h5>
                <h1 className="source"> By : {selectedProductDataDetail?.id}</h1>
              </div>
            }
          >
            <ProductDetails
              productId={productId}
              selectedProductDataDetail={selectedProductDataDetail}
              channelPrice={selectedProductDataDetail?.channelPrice}
              imageUrl={selectedProductDataDetail?.imageUrl}
              profit={selectedProductDataDetail?.profit}
              sourcePrice={selectedProductDataDetail?.sourcePrice}
              handleClose={() => setModalOpen(false)}
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
            <CatalogSource handleClose={handleSourceModal} getSourcesData={getSourcesData} sources={sources} />
          </PopupModal>
          <PopupModal
            open={allProductsModalOpen}
            handleClose={handleAllProductsModal}
            width={600}
            style={{ overflowY: 'scroll' }}
            bodyStyle={{ height: 500 }}
            closable={false}
          >
            <AllProducts removeProduct={removeSelectedProduct} className={className}>
              {allProducts}
            </AllProducts>
          </PopupModal>
          <div className="catalog-cards">
            <div className="cards-container-catalog">
              {allCatalogProducts.map((d: CatalogProduct) => (
                <>
                  <Card className={className} onClick={handleSelectProduct} key={d.id} id={JSON.stringify(d.id)}>
                    <Meta
                      description={
                        <>
                          <div className="product-description">
                            <div className="img-container">
                              <img src={d.imageUrl} className="product-img" />
                            </div>
                            <div className="product-info-area">
                              <div className="header">
                                <p className="product-title">
                                  {d?.title.length > 20 ? `${d?.title.substring(0, 70)} ...` : d?.title}
                                </p>
                                <p className="source">
                                  by &nbsp;
                                  {d.sourceId}
                                </p>
                              </div>
                              <div className="transaction-details">
                                <div>
                                  <p className="transaction-type">Sell</p>
                                  <p className="transaction-amount sell">
                                    <span>&pound;</span>
                                    {d.channelPrice}
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
                        </>
                      }
                    />
                  </Card>
                  <div className="search-container">
                    <SearchOutlined
                      onClick={() => {
                        handleProductModal(d.id);
                      }}
                      className="search-child"
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="pagination-addall-container">
              <div className="adall-container">
                {!!allProducts.length && <SuccessBtn>List {allProducts.length} product(s)</SuccessBtn>}
                <ConfirmBtn handleConfirm={handleSelectAllProducts}>{t('selectAll')}</ConfirmBtn>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};
