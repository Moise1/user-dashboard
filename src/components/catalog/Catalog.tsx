import React, { useState, useEffect } from 'react';
import { Layout, Card, Spin, Divider, Switch, DatePicker, Input, Checkbox } from 'antd';
import { SuccessBtn } from '../../small-components/ActionBtns';
import { FiltersBtn } from '../../small-components/TableActionBtns';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { SearchOptions } from '../../small-components/SearchOptions';
import { PopupModal } from '../modals/PopupModal';
import { ProductDetails } from './ProductDetails';
import { AllProducts } from './AllProducts';
import { CatalogSource } from '../sources/catalog-source';
import { t } from '../../utils/transShim';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getCatalogProducts, listProducts, GetListingStatus } from '../../redux/catalog/catalogThunk';
import { NewCatalogProduct } from '../../redux/catalog/catalogSlice';
import { getSources } from 'src/redux/sources/sourcesThunk';
import type { DatePickerProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SearchOutlined } from '@ant-design/icons';
import '../../sass/catalog.scss';
import moment from 'moment';
import { toastAlert } from '../../utils/toastAlert';
import { CatalogStatus } from '../../small-components/CatalogStatus';
import { Product } from './Types';
import { CatalogFilters } from './catalog-filters';

export type ElementEventType =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>
  | React.MouseEvent;

export const Catalog = () => {
  const { Meta } = Card;
  const dispatch = useAppDispatch();
  const { sources } = useAppSelector((state) => state.sources);
  const { catalogProducts, loading } = useAppSelector((state) => state.catalogProducts);
  const { listProductLoading } = useAppSelector((state) => state.listProducts);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);
  const [allProductsModalOpen, setAllProductsModalOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [className, setClassName] = useState<string>('product-card');
  const [sourcesIds, setSourcesIds] = useState<number[]>([]);
  const [frequency, setFrequency] = useState<boolean>(false); //To display the crediential form
  const [allCatalogProducts, setAllCatalogProducts] = useState<Product[]>([]);
  const [sessionId] = useState<number>(0);
  const [selectedProductDataDetail, setSelectedProductDataDetail] = useState<Product>({
    id: 0,
    sourceId: 0,
    imageUrl: '',
    sourcePrice: 0,
    sourceName: '',
    url: '',
    profit: 0,
    title: '',
    channelPrice: 0,
    sold: 0,
    competition: 0,
    options: 0,
    priority: 0,
    quantityListed: 0,
    page: 0,
    totalResults: 0,
    pageSize: 0,
    sessionId: 0,
    option: 0,
    productId: 0,
    hiddenInCart: true,
    beingSend: true,
    batchId: ''
  });

  //States for ListTheProductFunctionaity
  const [products, setProducts] = useState<NewCatalogProduct[]>([]);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [frequencyData, setFrequencyData] = useState<number>();
  const [listProductsModal, setListProductModal] = useState<boolean>(false);
  const [optimizeTitle, setOptimizeTitle] = useState<boolean>(false);
  const [needsReview, setNeedsReview] = useState<boolean>(false);
  const [checkDate, setCheckDate] = useState<boolean>(false);
  //Dates
  let myDate: Date;
  const [newDate, setNewDate] = useState<Date>(new Date());
  const [publishNow, setPublishNow] = useState<Date | undefined>(new Date());

  useEffect(() => {
    dispatch(getCatalogProducts({ sessionId }));
    setAllCatalogProducts(catalogProducts);
    dispatch(getSources());
  }, [getCatalogProducts, setNewDate, setPublishNow]);

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);

  const handleProductModal = (id: number) => {
    setSelectedProductDataDetail(allCatalogProducts?.filter((d) => d.id === id)[0]);
    setModalOpen(!modalOpen);
  };

  const handleSourceModal = () => setSourceModalOpen(!sourceModalOpen);
  const handleAllProductsModal = () => setAllProductsModalOpen(!allProductsModalOpen);
  const [cardElementProductDetail, setCardElementProductDetail] = useState<
    | (EventTarget & HTMLDivElement)
    | (EventTarget & SVGElement)
    | (EventTarget & HTMLSpanElement)
    | (EventTarget & Element)
    | undefined
  >();

  const handleSelectProduct = (e: ElementEventType): void => {
    const cardElement = e.currentTarget;
    setCardElementProductDetail(cardElement);
    const selectedProductData = allCatalogProducts.filter((d) => d.id === JSON.parse(cardElement.id))[0];
    if (cardElement.classList.contains('selected-product-card')) {
      cardElement.classList.remove('selected-product-card');
      setAllProducts((prevState) => [...prevState].filter((d) => d.id !== JSON.parse(cardElement.id)));
    } else {
      cardElement.classList.add('selected-product-card');
      setAllProducts((prevState) => [...prevState, selectedProductData]);
    }
  };

  const removeSelectedProduct = (e: ElementEventType): void => {
    const cardElement = e.currentTarget;
    const CardElementDetail = document.getElementById(cardElement.id);
    cardElement?.classList.remove('selected-product-card');
    setAllProducts((prevState) => [...prevState].filter((d) => d.id !== JSON.parse(cardElement.id)));
    CardElementDetail?.classList.remove('selected-product-card');
  };

  const handleSelectAllProducts = (): void => {
    setClassName(className + ' ' + 'selected-product-card');
    setAllProducts(allCatalogProducts);
  };

  const handleClearAllSelectedProducts = (): void => {
    setClassName('product-card');
    setAllProducts([]);
    for (let i = 0; i < allProducts.length; i++) {
      document.getElementById(JSON.stringify(allProducts[i].id))?.classList.remove('selected-product-card');
    }
  };

  const getSourceName = (id: number) => {
    return sources?.map((x: { id: number; name: string }) => {
      if (x.id === id) return x.name;
    });
  };

  const getSourcesData = (ids: number[]) => {
    setSourcesIds(ids);
  };

  const needReviewsOnChange = (e: CheckboxChangeEvent) => {
    setNeedsReview(e.target.checked);
  };

  const handleSetFrequencyData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequencyData(Number(event.target.value));
    newDate ? setNewDate(newDate) : setNewDate(new Date());
  };

  const dateOnChange: DatePickerProps['onChange'] = (dateString) => {
    setCheckDate(true);
    myDate = moment.utc(dateString).toDate();
    setNewDate(myDate);
    setPublishNow(newDate);
  };

  const listTheProducts = async () => {
    setChangeState(true);
    const rs = await dispatch(listProducts({ products, needsReview, optimizeTitle }));
    setListProductModal(!listProductsModal);
    if (rs.payload.success) {
      toastAlert('Listing started successfully', 'success');
      console.log(rs.payload.batchId);
      const batchId: string = rs.payload.batchId;
      const status = await dispatch(GetListingStatus({ batchIds: [batchId] }));
      console.log(status);
    }
    else {
      toastAlert(rs.payload, 'error');
    }
  };

  useEffect(() => {
    setProducts(
      allProducts.map((e: Product) => {
        const { sourceId, title } = e;
        newDate && setPublishNow(newDate);
        if (!checkDate === true && frequencyData == undefined) setPublishNow(undefined);
        return { sourceId, title, publishNow };
      })
    );

    if (frequencyData && newDate && changeState) {
      setPublishNow(newDate);
      for (let i = 0; i <= allProducts.length; i++) {
        if (allProducts.length > 0) {
          const end = frequencyData * i;
          newDate?.setMinutes(end);
        }
      }
      return;
    }

    if (frequencyData && changeState) {
      setPublishNow(newDate);
      for (let i = 0; i <= allProducts.length; i++) {
        if (allProducts.length > 0) {
          const end = frequencyData * i;
          newDate?.setMinutes(end);
        }
      }
    }
  }, [changeState, allProducts, newDate, publishNow, frequencyData]);

  return (
    <Layout className="catalog-container">
      <SearchOptions showSearchInput={false} />
      <CatalogFilters
        visible={drawerOpen}
        onClose={handleSideDrawer}
        openSourceModal={handleSourceModal}
        setAllCatalogProducts={setAllCatalogProducts}
        suppliersCount={sourcesIds}
        setSourcesIds={setSourcesIds}
      />
      {loading ? (
        <Spin />
      ) : (
        <>
          <a
            href="https://hustlegotreal.com/en/listing-service/"
            target="_blank"
            className="list-link"
            rel="noreferrer"
          >
            Not sure what to list? We do it for you.
          </a>
          <div className="actions-section">
            <div className="view-clear-all">
              <span className="all-selected-products" onClick={handleAllProductsModal}>
                View all selected products
              </span>
              <div className="clear-list-container">
                <span className="clear-all" onClick={handleClearAllSelectedProducts}>
                  Clear all
                </span>
              </div>
            </div>

            <div className="filters-container">
              <FiltersBtn handleSideDrawer={handleSideDrawer}>{t('filters')}</FiltersBtn>
            </div>
          </div>

          <PopupModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            width={900}
            title={
              <div className="modal-title">
                <h5>{selectedProductDataDetail.title}</h5>
                <h1 className="source"> By :{getSourceName(selectedProductDataDetail?.sourceId)}</h1>
              </div>
            }
          >
            <ProductDetails
              selectedProductDataDetail={selectedProductDataDetail}
              channelPrice={selectedProductDataDetail?.channelPrice}
              imageUrl={selectedProductDataDetail?.imageUrl}
              profit={selectedProductDataDetail?.profit}
              sourcePrice={selectedProductDataDetail?.sourcePrice}
              handleClose={() => setModalOpen(false)}
              setAllProducts={setAllProducts}
              cardElementProductDetail={cardElementProductDetail}
              allCatalogProducts={allCatalogProducts}
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
            bodyStyle={{ height: 500, overflow: 'scroll' }}
            closable={false}
          >
            <AllProducts removeProduct={removeSelectedProduct} className={className} getSourceName={getSourceName}>
              {allProducts}
            </AllProducts>
          </PopupModal>
          <PopupModal
            open={listProductsModal}
            handleClose={() => setListProductModal(!listProductsModal)}
            width={600}
            style={{ overflowY: 'scroll' }}
            closable={false}
            footer={null}
          >
            <div className="catalog-list-modal">
              <h1> Listing Settings </h1>
              <Divider />
              {listProductLoading ? (
                <div style={{ minWidth: '100%' }}>
                  <Spin style={{ margin: '30% 50%' }} />
                </div>
              ) : (
                <>
                  <div className="under-sections">
                    <div className="section-option-container">
                      <div className="section-option">
                        <div className="section-title-container">
                          <h2>Optimize the titles of the products?</h2>
                        </div>
                        <div className="section-switch">
                          <Switch onChange={() => setOptimizeTitle(!optimizeTitle)} />
                        </div>
                      </div>
                      <div className="section-explanation">
                        <ul>
                          <li>Rank higher on eBay{"'"}s search results.</li>
                          <li>We analyse sold items by category.</li>
                          <li>Boost your sales.</li>
                          <li>Get your listings in front of more potential buyers.</li>
                          <li>Save time, we do the hard work for you.</li>
                        </ul>
                        <p>Cost: {allProducts.length} token(s) </p>
                      </div>
                    </div>
                    <div className="section-option-container">
                      <div className="section-option">
                        <div className="section-title-container">
                          <h2>Choose the frequency of the listings?</h2>
                        </div>
                        <div className="section-switch">
                          <Switch checked={frequency} onChange={() => setFrequency(!frequency)} />
                        </div>
                      </div>
                      {frequency && (
                        <div className="section-explanation">
                          <div className="frequency-container">
                            <div className="select-date-container">
                              <h3>Select the date</h3>
                              <DatePicker className="date-picker" onChange={dateOnChange} />
                            </div>
                            <Divider className="divider" type="vertical" />
                            <div className="listings-frequency-container">
                              <h3>Listings frequency</h3>
                              <p>The system will automatically list an item every X minutes.</p>
                              <Input
                                className="blue-input"
                                type="number"
                                value={frequencyData}
                                onChange={handleSetFrequencyData}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="checkbox-section">
                      <Checkbox onChange={needReviewsOnChange} />
                      <p>
                        Review listings individually before publishing. Your listings will appear under Pending listings
                        section.
                      </p>
                    </div>
                    <div className="list-button">
                      <SuccessBtn handleConfirm={listTheProducts}>List {allProducts.length} product(s)</SuccessBtn>
                    </div>
                  </div>
                </>
              )}
            </div>
          </PopupModal>
          <div className="catalog-cards">
            <div className="cards-container-catalog">
              {allCatalogProducts.map((d: Product) => (
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
                                  {d?.title.length > 20 ? `${d?.title.substring(0, 50)} ...` : d?.title}
                                </p>
                                <p className="source">
                                  by &nbsp;
                                  {getSourceName(d.sourceId)}
                                </p>
                              </div>
                              <CatalogStatus data={d} />
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
                {!!allProducts.length && (
                  <SuccessBtn handleConfirm={() => setListProductModal(!listProductsModal)}>
                    List {allProducts.length} product(s)
                  </SuccessBtn>
                )}
                <ConfirmBtn handleConfirm={handleSelectAllProducts}>{t('selectAll')}</ConfirmBtn>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};
