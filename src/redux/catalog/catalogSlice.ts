import { createSlice } from '@reduxjs/toolkit';
import { getCatalogProducts,getCatalogProductsSearching ,listProducts} from './catalogThunk';

export interface CatalogProduct {
  id: number;
  sourceId: number;
  imageUrl: string;
  sourcePrice: number;
  title: string;
  url: string;
  profit: number;
  channelPrice: number;
  options: number;
  competition: number;
  sold: number;
  priority: number;
  quantityListed: number;
  [key: string]: number | string | boolean | null;
  page: number;
  totalResults: number;
  pageSize: number;
  sessionId: number;
  option: number;
  productId:number;
}

export interface NewCatalogProduct {
  publishNow:Date | undefined;
  sourceId: number;
  title: string;
}

export interface selectedProductDetailData
{
  id: number;
  sourceId: number;
  imageUrl: string;
  sourcePrice: number;
  title: string;
  url: string;
  profit: number;
  channelPrice: number;
  sold: number;
  competition: number;
  options: number;
  priority: number;
  quantityListed: number;
  [key: string]: number | string | boolean | null;
  page: number;
  totalResults: number;
  pageSize: number;
  sessionId: number;
  option: number;
  productId:number;
}

const initialState = {
  catalogProducts: [] as CatalogProduct[],
  loading: false,
  error: ''
};

const searchInitialState = {
  catalogSearchedProducts: [] as CatalogProduct[],
  loading: false,
  error: ''
};

const listProduct = {
  listProductLoading:false,
  error:''
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogProducts.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getCatalogProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.catalogProducts = payload;
    });
    builder.addCase(getCatalogProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const catalogSearchSlice = createSlice({
  name: 'catalogSearch',
  initialState: searchInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogProductsSearching.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getCatalogProductsSearching.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.catalogSearchedProducts = payload;
    });
    builder.addCase(getCatalogProductsSearching.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const listProductSlice = createSlice({
  name: 'catalogSearch',
  initialState: listProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.listProductLoading = true;
      state.error = '';
    });
    builder.addCase(listProducts.fulfilled, (state, { payload }) => {
      state.listProductLoading = false;
      console.log('The payload from catalog list products',payload);
    });
    builder.addCase(listProducts.rejected, (state, { payload }) => {
      state.listProductLoading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: catalogProductsReducer } = catalogSlice;
export const {reducer: catalogSearchProductReducer} = catalogSearchSlice;
export const {reducer: listProductsReducers} = listProductSlice;